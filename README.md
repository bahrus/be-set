# be-set [TODO]

be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing said element's properties / attributes.

## Basic Use  

With the syntax below:

```html
<my-custom-element be-set='
{
    "myStringProp": "supercalifragilisticexpialidocious",
    "myNumProp": 6.022140857E1023,
    "myBool": false,
    "myObjectProp": {
        "mySubObj":{}
    }
}
'>
</my-custom-element>
```

... *be-set* does the following:

1.  Parses the be-set attribute using JSON.Parse.
2.  Does an Object.assign of the instance the attribute is on (my-custom-element in this case), shallow-merging the parsed object obtained in step 1.

One potential objection to the syntax shown above is that JSON is quite finicky about allowed syntax, giving the developer a potentially frustrating experience.

However, [a VSCode plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) is available that provides syntax coloring and catches most JSON errors.  Because the extension is purely JSON-based, it is compatible with the web versions of VS Code.

## Why?

*be-set* allows us to set the initial property values in a consistent, well-performing way across all web components, regardless of the libraries they use.

Following this approach allows multiple initial settings to be done in one "pass", without requiring as many "flops" of processing -- reading individual attributes, parsing them based on the type of property in question, etc.

## Advanced Use

In the example above, the JSON attribute is a key/value object.

be-set provides more advanced capabilities if the JSON attribute is an array:

```html
<my-custom-element be-set='[
{
    "defer-hydration": true,
    "disabled": true
},
{
    "myStringProp": "supercalifragilisticexpialidocious",
    "myNumProp": 6.022140857E1023,
    "myBool": false,
    "myObjectProp": {
        "mySubObj":{}
    }
},
{
    "defer-hydration": false
}
]'>
```

The way be-set treats arrays is as follows:

1.  The items with even index are treated as attribute settings.
2.  Items with odd index are treated as before -- A single Object.assign
3.  Between each step, a yield of the thread is injected.


The use of the defer-hydration attribute in the example above alludes to the [defer-hydration proposal](https://github.com/webcomponents-cg/community-protocols/blob/defer-hydration/proposals/defer-hydration.md).  So this example suggests an approach that builds on that proposed protocol.

Another significant reason for providing specific support for setting attributes is this -- xtal-decor derived element decorators rely heavily on attributes to initialize (and even [update](https://github.com/bahrus/xtal-decor#approach-ii-setting-properties-via-the-controlling-attribute)) the behavior / decoration.

