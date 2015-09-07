# deligare
[![Build Status](https://travis-ci.org/michbuett/deligare.svg?branch=master)](https://travis-ci.org/michbuett/deligare)
[![Coverage Status](https://coveralls.io/repos/michbuett/deligare/badge.svg?branch=master&service=github)](https://coveralls.io/github/michbuett/deligare?branch=master)

A most flexible and powerful function parameter delegation utility.

## How does it work?

As easy as this:
```js
var del = require('deligare');
var add = function (a, b) {
    return a + b;
};
var sub = function (a, b) {
    return a - b;
};
var addOne = del(add, [1]);
var subTwo = del(sub, [undefined, 2]);

addOne(5); // -> 6 (equivalent to "add(1, 5)")
subTwo(5); // -> 3 (equivalent to "sub(5, 2)")

```

## How do I get it?

You can use npm install it:

```bash
npm install deligare
```

## So it is a nodejs module. How can use it in a browser based app?

Don't worry. The package provides a bundled (and minified) standalone JS file which can be included, e.g.:
```html
<script src="{path}/dist/deligare.min.js"></script>
```
Alternatively you can use tools like browserify to include it in your project. The lib has no further dependencies and should run fine in any browser environment.
