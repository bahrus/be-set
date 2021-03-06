# be-set [TODO]

be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing said element's properties / attributes.

## Basic Use  

With the syntax below:

```html
<my-custom-element be-set='
{
    "deepMerge": true,
    "props":{    
        "myStringProp": "supercalifragilisticexpialidocious",
        "myNumProp": 6.022140857E23,
        "myBool": false,
        "myObjectProp": {
            "mySubObj":{}
        },
        
    },
    "scriptRef": "my-script",
    "complexProps":{
        "myFunctionCallback": "callback"
    }

}'>
</my-custom-element>
<script nomodule id=my-script be-exportable>
    export function callback(e){
        console.log(e);
    }
</script>
```

... *be-set* does the following:

1.  Parses the be-set attribute using JSON.Parse.
2.  Does a deep merge of the parsed object obtained in step 1, into  the instance the attribute is on (my-custom-element in this case).
3.  Provides a cascade level of property settings, similar to CSS.

One potential objection to the syntax shown above is that JSON is quite finicky about allowed syntax, giving the developer a potentially frustrating experience.

However, [a VSCode plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) is available that provides syntax coloring and catches most JSON errors.  Because the extension is purely JSON-based, it is compatible with the web versions of VS Code.

## Why?

*be-set* allows us to set the initial property values in a consistent, well-performing way across all web components, regardless of the libraries they use.

Following this approach allows multiple initial settings to be done in one "pass", without requiring as many "flops" of processing -- reading individual attributes, parsing them based on the type of property in question, etc.

## Adding Non-JSON serializable settings

The [nomodule](https://github.com/bahrus/nomodule) provides a way of exposing JS entities to the DOM world.



 [defer-hydration proposal](https://github.com/webcomponents-cg/community-protocols/blob/defer-hydration/proposals/defer-hydration.md).  So this example suggests an approach that builds on that proposed protocol.



