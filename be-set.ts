import {XtalDecor, XtalDecorCore} from 'xtal-decor/xtal-decor.js';
import { XtalDecorProps } from 'xtal-decor/types';
import {CE} from 'trans-render/lib/CE.js';

const ce = new CE<XtalDecorCore<Element>>({
    config:{
        tagName: 'be-noticed',
        propDefaults:{
            upgrade: '*',
            ifWantsToBe: 'noticed',
            noParse: true,
            forceVisible: true,
            virtualProps: ['recipientElement'],
        }
    },
    complexPropDefaults:{
        actions:[],
        on:{},
        init: (self: Element, decor: XtalDecorProps<Element>, target) => {
            let params: any = undefined;
            const attr = self.getAttribute('is-' + decor.ifWantsToBe!)!;
            try{
                params = JSON.parse(attr);
            }catch(e){
                console.error({
                    e,
                    attr
                });
                return;
            }
            for(const propKey in params){
                const pram = params[propKey];
                const isPropSet = propKey.endsWith(':onSet');
                const propName = isPropSet ?  propKey.substr(0, propKey.length - 6) : undefined;
                const notifyParams = Array.isArray(pram) ? pram as INotify[] : [pram] as (string | INotify)[];
                for(const notifyParamPre of notifyParams){
                    const notifyParam: INotify = (typeof notifyParamPre === 'string') ? {fn: notifyParamPre} : notifyParamPre;
                    notifyParam.propName = propName;
                    if(notifyParam.doInit){
                        const recipientElement = getRecipientElement(self, notifyParam);
                        if(recipientElement === null){
                            console.warn({msg:'404', notifyParam});
                            continue;
                        }
                        doAction(self, recipientElement, notifyParam);
                    }
                }
                if(propName !== undefined){
                    let proto = target;
                    let prop = Object.getOwnPropertyDescriptor(proto, propName);
                    while (proto && !prop) {
                        proto = Object.getPrototypeOf(proto);
                        prop = Object.getOwnPropertyDescriptor(proto, propName);
                    }
                    if (prop === undefined) {
                        console.error({ self, propName, message: "Can't find property." });
                        continue;
                    }
                    const setter = prop.set!.bind(target);
                    const getter = prop.get!.bind(target);
                    Object.defineProperty(target, propName, {
                        get() {
                            return getter();
                        },
                        set(nv) {
                            setter(nv);
                            const event = {
                                target: this
                            };
                            const pram = params[propName + ":onSet"];
                            const notifyParams = Array.isArray(pram) ? pram as INotify[] : [pram] as INotify[];
                            for(const notifyParamPre of notifyParams){
                                const notifyParam: INotify = (typeof notifyParamPre === 'string') ? {fn: notifyParamPre} : notifyParamPre;
                                const recipientElement = getRecipientElement(self, notifyParam);
                                if(recipientElement === null){
                                    console.warn({msg:'404', notifyParam});
                                    continue;
                                }
                                doAction(self, recipientElement, notifyParam, event as Event);
                            }
                        },
                        enumerable: true,
                        configurable: true,
                    });
                }
                self.addEventListener(propKey, e => {
                    const pram = params[e.type];
                    const notifyParams = Array.isArray(pram) ? pram as INotify[] : [pram] as INotify[];
                    for(const notifyParamPre of notifyParams){
                        const notifyParam: INotify = (typeof notifyParamPre === 'string') ? {fn: notifyParamPre} : notifyParamPre;
                        const recipientElement = getRecipientElement(self, notifyParam);
                        if(recipientElement === null){
                            console.warn({msg:'404', notifyParam});
                            continue;
                        }
                        doAction(self, recipientElement, notifyParam);
                    }
                    
                });
                nudge(self);
                
            }
        },
        finale: (self: Element, target: Element) => {
            
        }
    },
    superclass: XtalDecor,
});