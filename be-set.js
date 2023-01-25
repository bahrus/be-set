import { define } from 'be-decorated/DE.js';
export class BeSet extends EventTarget {
    async setProps(pp, mold) {
        const { props, self } = pp;
        for (const prop in props) {
            const val = props[prop];
            if (prop[0] === '.') {
                const { setProp } = await import('trans-render/lib/setProp.js');
                setProp(self, prop, val);
            }
            else {
                self[prop] = val;
            }
        }
        return mold;
    }
}
const tagName = 'be-set';
const ifWantsToBe = 'set';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
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
});
