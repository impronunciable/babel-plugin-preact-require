# babel-plugin-preact-require

Babel plugin that adds Preact's `h` declaration if file contains JSX tags.

This plugin is only about stateless components that doesn't extends `Component`.
If you want to use any other Preact functions then you should import their by yourself.

This code was forked from [babel-plugin-react-require](https://github.com/vslinko/babel-plugin-react-require)
so all credit should go to [@vslinko](https://twitter.com/vslinko)

## Example

Your `component.js` that contains this code:

```js
export default function Component() {
  return (
    <div />
  )
}
```

will be transpiled into something like this:

```js
import { h } from 'preact'

export default function Component() {
  /* this part will be transpiled by babel itself as usual */
  return (
    h('div')
  )
}
```

## Usage

* Install `babel-plugin-preact-require`.

```
npm install babel-plugin-preact-require --save-dev
```

* Add `preact-require` into `.babelrc`. This plugin should be defined before `transform-es2015-modules-commonjs` plugin because it's using ES2015 modules syntax to import preact's `h` into scope.

```json
{
  "plugins": [
    "preact-require"
  ]
}
```
