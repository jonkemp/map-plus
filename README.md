# map-plus [![Build Status](https://travis-ci.com/jonkemp/map-plus.svg?branch=master)](https://travis-ci.com/jonkemp/map-plus)

> Produces a new array of values by mapping each value in list through a transformation function (iteratee).

 The iteratee is passed three arguments: the `value`, then the index (or `key`) of the iteration, and finally a reference to the entire `list`. 

Inspired by `_.map`. 😄


## Install

Install with [npm](https://npmjs.org/package/map-plus)

```
$ npm install map-plus
```

Or [unpkg](https://unpkg.com/map-plus/)

```
<script src="https://unpkg.com/map-plus@1.0.0/umd/index.js" />
```

Check out the unit tests on [CodePen](https://codepen.io/jonkemp/full/bGdjJVw).

## Usage

```js
const map = require('map-plus');

map([1, 2, 3], num => num * 3);
//=> [3, 6, 9]

map({one: 1, two: 2, three: 3}, (num, key) => num * 3);
//=> [3, 6, 9]
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/map-plus)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/map-plus) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## API

### map(list, iteratee, [context])

#### list

Type: `array` or `object`  
Default: `none`

The collection of elements to iterate over.

#### iteratee

Type: `function` or `string`  
Default: `none`

Function to apply. Or property name to pass.

## License

MIT
