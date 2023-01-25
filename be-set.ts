import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Actions, PP, PPP, Proxy} from './types';
import { register } from 'be-hive/register.js';

export class BeSet extends EventTarget implements Actions{
    async setProps(pp: PP, mold: Partial<PP>){
        const {props, self} = pp;
        for(const prop in props){
            const val = props[prop];
            if(prop[0] === '.'){
                const {setProp} = await import('trans-render/lib/setProp.js');
                setProp(self, prop, val);
            }else{
                (<any>self)[prop] = val;
            }
        }
        return mold;
    }
}

const tagName = 'be-set';
const ifWantsToBe = 'set';
const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            forceVisible: ['template', 'script', 'style'],
            upgrade,
            virtualProps: ['props'],
            primaryProp: 'props',
            primaryPropReq: true,
        },
        actions: {
            setProps: {
                ifAllOf: ['props'],
                returnObjMold: {
                    resolved: true,
                }
            }
        }
    }
})