# map-plus ![Build Status](https://github.com/jonkemp/map-plus/actions/workflows/main.yml/badge.svg?branch=master)

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
<script src="https://unpkg.com/map-plus@1.0.4/umd/index.js" />
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

## Dependency maintenance

Review Dependabot alerts and update PRs weekly. Prioritize high and critical alerts as they arrive. For alerts without a fix PR, check which direct dependency brings in the affected package, then upgrade, remove, or replace that dependency. Record a follow-up for any alert that remains open.

Use Node.js 22.12 or newer for development. Run `npm ci`, `npm run lint`, `npm test`, and `npm audit` when updating dependencies. After merging a security fix, confirm that GitHub closes the corresponding alerts.

The Mocha overrides keep `glob` and `minimatch` on patched releases. Recheck them on Mocha upgrades and remove them when Mocha resolves patched versions on its own.

## License

MIT
