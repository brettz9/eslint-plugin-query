# Use arbitrary selectors to search for lines of code (query)

Expects the presence of code matched by an AST expression and reports if not found.

## Rule Details

This rule aims to enforce the presence of particular code.

Examples of **incorrect** code for this rule:

For:

```js
/**
 * Safely under the queried number of arguments.
 * @param {string} b
 * @param {string} c
 */
export function a (b, c) {
  return b + c;
}
```

```js
export default {
  // ...
  rules: {
    'query/no-missing-syntax': ['error', {
      queries: {
        'FunctionDeclaration[params.length<1]': {
        }
      }
    }]
  }
};
```

Examples of **correct** code for this rule:

For:

```js
/**
 * Safely under the queried number of arguments.
 * @param {string} b
 * @param {string} c
 */
export function a (b, c) {
  return b + c;
}
```

```js
export default {
  // ...
  rules: {
    'query/no-missing-syntax': ['error', {
      queries: {
        'FunctionDeclaration[params.length<3]': {
          template: 'Oops, missing a short signature!'
        }
      }
    }]
  }
};
```

### Options

Requires a single options object, with:
- a `queries` object:
    - Its key should be a string representing the
        [selector](https://eslint.org/docs/developer-guide/selectors).
    - Its value should be an object with the following optional properties:
        - `minimum` - Minimum requires instances. Defaults to 1.
        - `template` - A string in the form of an ES6 template (see
            [es6-template-strings](https://github.com/medikoo/es6-template-strings/)).
            It will be passed the following:
                - `selector` - The AST selector.
            Defaults to `Syntax is required: ${selector}`.


## When Not To Use It

If you do not need to enforce the presence of particular code, there is no need for
using this rule.
