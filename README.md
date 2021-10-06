# be-set [TODO]

be-set is a Custom Element DOM decorator that builds on the [defer-hydration proposal](https://github.com/webcomponents-cg/community-protocols/blob/defer-hydration/proposals/defer-hydration.md).

The proposal is seemingly quite conservative, in that it avoids any kind of heavy handed requirements, and leaves the strategy for using the protocol up to each development team.

be-set allows multiple initial settings to be done in one "pass", without requiring as many "flops" of processing -- reading individual attributes, parsing them based on the type of property in question etc.

be-set provides a way of doing a single Object.assign on the custom element, where the properties are already converted to the appropriate type based on what the property needs.

## Syntax:

```html
<my-custom-element defer-hydrate be-set='
{
    "myStringProp": "supercalifragilisticexpialidocious",
    "myNumProp": 6.022140857E1023,
    "myBool": false,
    "myObjectProp": {
        "mySubObj":{}
    }
}
'>
...
<be-set></be-set>
```

If attribute defer-hydrate is not found, be-set will first add the attribute, before doing the Object.assign, then remove it.  If the defer-hydrate is found, it is configurable whether be-set will remove it:

```html
<my-custom-element defer-hydrate be-set='
{
    "myStringProp": "supercalifragilisticexpialidocious",
    "myNumProp": 6.022140857E1023,
    "myBool": false,
    "myObjectProp": {
        "mySubObj":{}
    }
}
'>
...
<be-set leave-defer-hydrate></be-set>
```