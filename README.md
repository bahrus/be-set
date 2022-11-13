# be-set [WIP]

~~be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing numerous element's  properties  in a performant way.~~

be-set is a package that currently provides an export function that can enable initializing numerous element's properties in a performant way.

## Background

The template element empowers developers to clone and repeat blocks of HTML in a performant way.  

Constructible stylesheets provides similar performance benefits when applying the same styling to each ShadowDOM realm deriving from the same template / custom element.

## Mission

be-set aims to provide similar performance boosting benefits, but at a smaller scale, focused (but not necessarily limited to) [be-decorated](https://github.com/bahrus/be-decorated) decorating / element behaviors.

Some of the attributes that can be associated with an element behavior can become quite large.  Consider [this example](https://github.com/bahrus/be-calculating#example-1):

```html
<form>
    <input type="range" name="a" value="50">
    +<input type="number" name="b" value="25">
    =<output name="x"></output>
    <script type=module nomodule be-calculating='{
        "args":{
            "a": {
                "observeName": "a",
                "on": "input",
                "vft": "value"
            },
            "b": {
                "observeName": "b",
                "on": "input",
                "vft": "value"
            }
        },
        "transformScope": ["upSearch", "*"],
        "transform":{"*": "value"}
    }'>        
        export const calculator = async ({a, b}) => ({
            value: Number(a) + Number(b)
        });
    </script>
</form>
```

Note: the example above is somewhat contrived - it is showing all the features for something, which is unlikely to be done in practice.  Still, the problem exists.

What if this form repeats 100's of times down the page, and all the settings are identical?  Or maybe only one small value varies? 

be-set helps with that.  It provides two api functions currently:  parse, and clone.

"parse" examines a template, and manipulates the content of the template, parsing and caching the (repeating) attribute values, storing them in a weak map.

"clone" is a drop-in replacement for native template cloning, that sets beDecorated properties to the cached, parsed objects obtained during the parse.