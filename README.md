# be-set [WIP]

be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing numerous element's  properties  in a performant way.  

Rather than pass through numerous attributeChangedCallbacks, we can pass values to properties directly, from server rendered content.

be-set also provides the ability to set nested property values.

It also provides a way to specify property values "from a distance".

## Lingo

```html
<my-element be-set='{
    "prop1": 23,
    ".prop2.subProp3.subProp4": 57,
    ".beDecorated.observant": {

    }
}'>
```

