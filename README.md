# be-set [TODO]

[![NPM version](https://badge.fury.io/js/be-set.png)](http://badge.fury.io/js/be-set)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-set?style=for-the-badge)](https://bundlephobia.com/result?p=be-set)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-set?compression=gzip">

be-set is a Custom Element / native DOM [behavior/enhancement](https://github.com/bahrus/be-enhanced) that focuses on initializing numerous element's  properties in a performant way.  

Rather than pass through numerous attributeChangedCallbacks with type conversions, we can pass values to properties directly, from server rendered content.

be-set also provides the ability to set nested property values and attach be-enhanced enhancements.


The JSON contained inside the script element utilizes [DTR syntax](https://github.com/bahrus/trans-render#declarative-trans-render-syntax-via-json-serializable-rhs-expressions-with-libdtrjs).

## Example 1

```html
<html>
    <head>
        <script id=my-settings type=application/json>
            {
                "input": {
                    "readOnly": true
                }
            }
        </script>
    </head>
<body>
    ...
    <div>
        <input>
    </div>
    ...
    <template be-set="from #my-settings"></template>
</body>
```

...

What this does:  Searches for script element by id, looks at the type.  If the type contains "json", applies be-parsed enhancement to parse the json inside.  Then it applies the DTR transform, targeting the parent element of the template element.

## Example 2

```html
<html>
    <head>
        <script id=my-settings be-parsed type=application/json>
            {
                "input": {
                    "readOnly": "isHappy"
                }
            }
        </script>
    </head>
<body>
    ...
        <mood-stone is-happy>
            #shadow
            <div be-set="from #my-settings with model coming from host.">
                <input>
            </div>
            <be-hive></be-hive>
        </mood-stone>
</body>
</html>
```

What this does:

1.  Searches first for script element outside any Shadow DOM (i.e. document.querySelector) for element with id my-settings.
2.  If no such element is found, searches for element within the Shadow DOM realm with that id.  This allows the web component to provide its own defaults, which can be overridden (dependency injected) by global settings.

## Example 3



## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-set/be-set.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-set';
</script>
```


