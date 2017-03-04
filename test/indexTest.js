const babel = require('babel-core')
const assert = require('assert')

let preactPlugin
let transform

try {
  preactPlugin = require('../lib-cov/index').default // eslint-disable-line import/no-unresolved
} catch (error) {
  preactPlugin = require('../src/index').default
}

describe('babel-plugin-preact', () => {
  beforeEach(() => {
    transform = code => babel.transform(code, {
      plugins: ['syntax-jsx', preactPlugin]
    }).code
  })

  it('should return transpiled code with required Preact h function', () => {
    const transformed = transform('export default class Component {render() {return <div />}}');

    assert.equal(transformed, 'import { h } from "preact";\nexport default class Component {\n  render() {\n    return <div />;\n  }\n}');
  });

  it('should return not transpiled code', () => {
    const transformed = transform('console.log("hello world")');

    assert.equal(transformed, 'console.log("hello world");');
  });

  it('should check that plugin does not import Preact twice', () => {
    const transformed = transform('class Component{render(){return <div/>}} class Component2{render(){return <div />}}')

    assert.equal(transformed,
      'import { h } from "preact";\nclass Component {\n  render() {\n    return <div />;\n  }\n}' +
      'class Component2 {\n  render() {\n    return <div />;\n  }\n}')
  })
})
