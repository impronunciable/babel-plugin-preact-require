export default function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement (path, { file }) {
        file.set('hasJSX', true)
      },

      Program: {
        enter (path, { file }) {
          file.set('hasJSX', false)
        },

        exit ({ node, scope }, { file }) {
          if (!(file.get('hasJSX') && !scope.hasBinding('h'))) {
            return
          }

          const preactImportDeclaration = t.importDeclaration([
            t.importSpecifier(t.identifier('h'), t.identifier('h'))
          ], t.stringLiteral('preact'))

          node.body.unshift(preactImportDeclaration)
        }
      }
    }
  }
}
