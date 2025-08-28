# Use arbitrary selectors to search for lines of code (query)

Reports any code found matching an AST expression.

## Comparison to ESLint `no-restricted-syntax` rule

While ESLint has a [similar rule](https://eslint.org/docs/rules/no-restricted-syntax),
this rule differs in that:

1. You can see the actual syntax in the output if you wish (optionally slicing
    this output with start and/or end); this makes it ideal for querying data
    rather than just knowing that some syntax is present in such-and-such a
    file at such-and-such a line number.
2. This plugin name suggests it can be used to *find* items rather than just
    restrict them (though when used in linting, it indeed serves the purpose of
    restriction).
3. You can use arbitrary JavaScript in your template syntax

## Comparison to `esquery` tool

[esquery](https://github.com/estools/esquery) ([demo](https://estools.github.io/esquery/)),
a tool used within ESLint, allows queries by AST selector. Here is why we
make a separate tool:

1. Be able to use from the command line
1. Ability to see the output stringified
1. Apply to linting if desired as well as querying

## Rule Details

This rule aims to allow you to find and display code by AST.

Examples of **incorrect** code for this rule:

For:

```js
/**
 * Over the queried number of arguments.
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
    'query/query': ['error', {
      defaultFormat: 'string',
      queries: {
        'FunctionDeclaration[params.length>1]': {
          template: 'Oops, too long: `${result}`.'
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
    'query/query': ['error', {
      queries: {
        'FunctionDeclaration[params.length>3]': {
          template: 'Oops, too long: ${result}.'
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
        - `template` - A string in the form of an ES6 template (see
            [es6-template-strings](https://github.com/medikoo/es6-template-strings/)).
            If not present, the `result` will be used instead. If present,
            it will be passed the following:
                - `result` - The selector-identified node represented as
                    a string (i.e., the lines of code pointed to by
                    the selector)
        - `start` - An integer at which to begin slicing out of
            the selected lines of code. May be negative as with
            `slice`.
        - `end` - An integer at which to end slicing out of the
            selected lines of code. May be negative as with `slice`.
        - `format` - May override any `defaultFormat` (see below).
        - `parent` - If `format` is "node", setting this to `true`
            will also show the `parent` properties on the AST. Defaults
            to `false`.
- an optional `defaultFormat` string (`"string"` (the default) or `"node"`).
    If `node` is chosen will be represented as stringified Node AST
    rather than the string found in source.

## When Not To Use It

The ESLint rule `no-restricted-syntax` may be sufficient if you don't need to
display the code.
