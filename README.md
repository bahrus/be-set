# be-set [TODO]

be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing numerous element's  properties / attributes in a performant way.  It can do this in bulk for elements within its (specified) scope, and can share parsed settings across multiple repeating blocks of HTML. 

The template element empowers developers to clone and repeat blocks of HTML in a performant way.  be-set aims to provide similar performance boosting benefits, but at a smaller scale, focused (but not necessarily limited to) [be-decorated](https://github.com/bahrus/be-decorated) decorating / element behaviors.

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

be-set helps with that.  It allows us to reference a JSON configuration on the page, or a JSON module / or JSON fetch url, which gets parsed once.  The developer still needs to decorate the element, but like so:

```html
<form be-set="/config-json">
    <input type="range" name="a" value="50">
    +<input type="number" name="b" value="25">
    =<output name="x"></output>
    <script type=module nomodule be-calculating=get-set>
        export const calculator = async ({a, b}) => ({
                value: Number(a) + Number(b)
            });
    </script>
</form>
```

Isn't that easier on the eye?  It should be easier for the browser as well.  So what be-set does is it creates a "promise" of values that will be pulled, based on css characteristics of the element, when the be-decorated decorator / behavior gets activated.

The path specifies an "upShadowSearch" within the document window.  For example, if the path starts with a a /, it should find the element in question (by id) outside any ShadowDOM. ../../config-json means go up two ShadowDOM levels.  If the value is "config-json" it checks if there's a host property with that name first, if not, searches by id within the ShadowDOM realm.

An option to support JSON Module import will also be supported [TODO]

The configuration looks like so:

```html
<script id=config-json type="application/json">
{
    "script": {
        "beCalculating": {
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
        }
        
    }
}
</script>

```

The be-set attribute can also contain JSON, which can override settings from this shared location on each instance, using deep merge.



 

