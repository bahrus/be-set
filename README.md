# be-set [TODO]

be-set is a Custom Element / native DOM decorator that addresses a number of use cases.

Let's see an example of be-set in action before diving into its use cases.  

For the syntax below:

```html
<my-custom-element defer-hydration be-set='
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

... *be-set* does the following:

1.  Parses the be-set attribute using JSON.Parse.
2.  Does an Object.assign of the instance the attribute is on (my-custom-element in this case),  shallow-merging the parsed object obtained in step 1.
3.  Provides options to work with the defer-hydration attribute, discussed below.

One potential objection to the syntax shown above is that JSON is quite finicky about allowed syntax, giving the developer a potentially frustrating experience.

However, [a VSCode plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) is available which provides syntax coloring and catches most JSON errors.

## Use case I

Setting initial property values in a consistent, well-performing way across all web components, regardless of the libraries they use.

be-set allows multiple initial settings to be done in one "pass", without requiring as many "flops" of processing -- reading individual attributes, parsing them based on the type of property in question etc.

## Use case II

*be-set* builds on the [defer-hydration proposal](https://github.com/webcomponents-cg/community-protocols/blob/defer-hydration/proposals/defer-hydration.md).

Said proposal is seemingly quite conservative, in that it avoids any kind of heavy handed requirements, and leaves the strategy for using the protocol up to each development team.  *be-set* suggests (part of?) such a strategy.


*be-set* can be configured so that if attribute defer-hydration is not found, *be-set* will first add the attribute, before doing the Object.assign, then (configurably) remove it.  If the defer-hydration is found, it is configurable whether be-set will remove it:

