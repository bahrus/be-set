//const parsedMap = new WeakMap<HTMLTemplateElement, Map<string, any>>();
export async function parse(templ) {
    const map = new Map();
    const countContainer = {
        count: 0
    };
    parseElements(templ.content.children, map, countContainer);
    if (countContainer.count > 0) {
        const { lispToCamel } = await import('trans-render/lib/lispToCamel.js');
        const existingClone = templ.content.cloneNode;
        existingClone.bind(templ.content);
        templ.content.cloneNode = (deep) => {
            const clone = existingClone(deep);
            for (const className of map.keys()) {
                const target = clone.querySelector('.' + className);
                const parseObj = map.get(className);
                const key = lispToCamel(parseObj.key.replace('be-', ''));
                if (target.beDecorated === undefined)
                    target.beDecorated = {};
                target.beDecorated.key = parseObj.parsed;
            }
            return clone;
        };
    }
}
function parseElements(children, map, countContainer) {
    const arr = Array.from(children);
    for (const child of arr) {
        const attrArr = Array.from(child.attributes);
        for (const attr of attrArr) {
            const key = attr.name;
            if (key.startsWith('be-')) {
                const val = attr.value;
                try {
                    const parsed = JSON.parse(val);
                    const parseObj = {
                        key,
                        parsed
                    };
                    attr.value = '';
                    const className = 'be-set-' + countContainer.count;
                    countContainer.count++;
                    child.classList.add(className);
                    map.set(className, parseObj);
                }
                catch (e) { }
            }
        }
        parseElements(child.children, map, countContainer);
    }
}
