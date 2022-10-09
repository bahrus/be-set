# be-set [TODO]

be-set is a Custom Element / native DOM [behavior/decorator](https://github.com/bahrus/xtal-decor) that focuses on initializing said element's  properties / attributes in a performant way.

The template element empowers developers to clone and repeat blocks of HTML in a performant way.  be-set aims to provide similar performance boosting benefits, but at a smaller scale, focused (but not necessarily limited to) [be-decorated](https://github.com/bahrus/be-decorated) decorating / element behaviors.

Some of the attributes that can be associated with an element can become quite large.  Consider [this example](https://github.com/bahrus/be-calculating#example-1):

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

Note, that the example above is somewhat contrived - it is showing all the features for something, which is unlikely to be done in practice.  Still, the problem exists.

What if this form repeats 100's of times down the page, and all the settings are identical?  Or maybe only one small value varies? 

be-set helps with that.  It allows us to reference a JSON module / or JSON fetch url, which gets parsed once.  The developer still needs to decorate the element, but like so:

```html
<form>
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

 

