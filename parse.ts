//const parsedMap = new WeakMap<HTMLTemplateElement, Map<string, any>>();
export function parse(templ: HTMLTemplateElement){
    const map = new Map<string, ParseObj>();
    const countCounter = {
        count: 0
    } as CountContainer;
    //parsedMap.set(templ, map);
    parseElements(templ.content.children, map, count);
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

    }
}

interface ParseObj{
    key: string,
    parsed: any,
}

interface CountContainer{
    count: number
}