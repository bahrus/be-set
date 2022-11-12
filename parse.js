//const parsedMap = new WeakMap<HTMLTemplateElement, Map<string, any>>();
export function parse(templ) {
    const map = new Map();
    const countCounter = {
        count: 0
    };
    //parsedMap.set(templ, map);
    parseElements(templ.content.children, map, count);
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
    }
}
