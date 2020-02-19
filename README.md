[![npm](https://img.shields.io/npm/v/eslint-plugin-query.svg)](https://www.npmjs.com/package/eslint-plugin-query)
[![Dependencies](https://img.shields.io/david/brettz9/eslint-plugin-query.svg)](https://david-dm.org/brettz9/eslint-plugin-query)
[![devDependencies](https://img.shields.io/david/dev/brettz9/eslint-plugin-query.svg)](https://david-dm.org/brettz9/eslint-plugin-query?type=dev)

[![Tests badge](https://raw.githubusercontent.com/brettz9/eslint-plugin-query/master/badges/tests-badge.svg?sanitize=true)](badges/tests-badge.svg)
[![Coverage badge](https://raw.githubusercontent.com/brettz9/eslint-plugin-query/master/badges/coverage-badge.svg?sanitize=true)](badges/coverage-badge.svg)

[![Known Vulnerabilities](https://snyk.io/test/github/brettz9/eslint-plugin-query/badge.svg)](https://snyk.io/test/github/brettz9/eslint-plugin-query)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/brettz9/eslint-plugin-query.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/eslint-plugin-query/alerts)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/brettz9/eslint-plugin-query.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/eslint-plugin-query/context:javascript)

[![License](https://img.shields.io/npm/l/eslint-plugin-query.svg)](LICENSE-MIT)

[![issuehunt-to-marktext](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/r/brettz9/eslint-plugin-query)

# eslint-plugin-query

Add "rules" made of arbitrary selectors to choose source lines to be reported

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-query`:

```
$ npm install eslint-plugin-query --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-query` globally.

## Usage

Add `query` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "query"
    ]
}
```


Then configure the rules you want to use under the rules section.

```js
'use strict';

module.exports = {
  rules: {
    'query/query': [2, {
      queries: {
        'FunctionDeclaration[params.length>4]': {
          // All optional
          // Defaults to just `${result}`
          template: 'Oops, too long: `${result}`.',
          // Default: 0 (also accepts negative)
          start: 0,
          // Default Infinity (also accepts negative)
          end: 100
        }
      }
    }]
  }
};
```

## Supported Rules

- `query/query` - Requires a single options object, with a `queries` object:
  - Its key should be a string representing the
  [selector](https://eslint.org/docs/developer-guide/selectors).
  - Its value should be an object with the following optional properties:
    - `template` - A string in the form of an ES6 template (see [es6-template-strings](https://github.com/medikoo/es6-template-strings/)). If not present, the
      `result` will be used instead. If present, it will be passed the following:
      - `result` - The selector-identified node represented as a string (i.e.,
        the lines of code pointed to by the selector)
    - `start` - An integer at which to begin slicing out of the selected lines of code.
      May be negative as with `slice`.
    - `end` - An integer at which to end slicing out of the selected lines of code.
      May be negative as with `slice`.

## To-dos

1. Could give `fixable` option (to remove all identified nodes)
1. Could make CLI to perform one-off searches easier than using `$(npm bin)/eslint --plugin query --rule 'query/query: [2, {queries: {"FunctionDeclaration[params.length>4]": {}}}]' .`
1. Add an option to match (additionally) by regex.
1. Get an AST parser for jsdoc comment blocks, e.g., to search for `@todo` comments
