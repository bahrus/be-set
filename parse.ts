//const parsedMap = new WeakMap<HTMLTemplateElement, Map<string, any>>();
export async function parse(templ: HTMLTemplateElement){
    const map = new Map<string, ParseObj>();
    const countContainer = {
        count: 0
    } as CountContainer;
    parseElements(templ.content.children, map, countContainer);
    if(countContainer.count > 0){
        const {lispToCamel} = await import('trans-render/lib/lispToCamel.js') 
        const existingClone = templ.content.cloneNode;
        existingClone.bind(templ.content);
        templ.content.cloneNode = (deep?: boolean | undefined) => {
            const clone =  existingClone(deep) as DocumentFragment;
            for(const className of map.keys()){
                const target = clone.querySelector('.' + className) as any;
                const parseObj = map.get(className);
                const key = lispToCamel(parseObj!.key.replace('be-', ''));
                if(target.beDecorated === undefined) target.beDecorated = {};
                target.beDecorated.key = parseObj!.parsed;
            }
            return clone;
        }
    }
}

function parseElements(children: HTMLCollection, map: Map<string, ParseObj>, countContainer: CountContainer){
    const arr = Array.from(children);
    for(const child of arr){
        const attrArr = Array.from(child.attributes);
        for(const attr of attrArr){
            const key = attr.name;
            if(key.startsWith('be-')){
                const val = attr.value;
                try{
                    const parsed = JSON.parse(val);
                    const parseObj = {
                        key,
                        parsed
                    } as ParseObj;
                    
                    attr.value = '';
                    const className = 'be-set-' + countContainer.count;
                    countContainer.count++;
                    child.classList.add(className);
                    map.set(className, parseObj);
                }catch(e){}
            }
        }
        parseElements(child.children, map, countContainer);
    }
}

interface ParseObj{
    key: string,
    parsed: any,
}

interface CountContainer{
    count: number
}