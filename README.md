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

be-set helps with that.  It allows us to reference a JSON configuration on the page, or a JSON module / or JSON fetch url, which gets parsed once.  The developer still needs to decorate the element, but like so:

```html
<template be-set>
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
</template>
```

What be-set does is:

1.  Puts all the JSON attributes into a cached lookup.
2.  Parses all the JSON attributes first before placing in the cache
3.  Provides a template instantiation plugin that can pass the values directly to the properties before adding to the live dom tree.
