# be-set [Untested]

[![NPM version](https://badge.fury.io/js/be-set.png)](http://badge.fury.io/js/be-set)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-set?style=for-the-badge)](https://bundlephobia.com/result?p=be-set)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-set?compression=gzip">

be-set is a Custom Element / native DOM [behavior/enhancement](https://github.com/bahrus/be-enhanced) that focuses on initializing numerous element's  properties in a performant way.  

Rather than pass through numerous attributeChangedCallbacks with type conversions, we can pass values to properties directly, from server rendered content.

be-set also provides the ability to set nested property values.

It also provides a way to set property values "from a distance" via something like [be-having](https://github.com/bahrus/be-having).

## Lingo

```html
<my-element be-set='{
    "prop1": 23,
    ".prop2.subProp3.subProp4": 57,
    ".beDecorated.observant": {

    }
}'>
```

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


