# eslint-plugin-query

Add "rules" made of arbitrary selectors to choose lines of context to be reported

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
      // ...
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
      - `ruleID` - The name of this rule (`query/query`)
      - `result` - The selector-identified node represented as a string (i.e.,
        the lines of code pointed to by the selector)
    - `start` - An integer at which to begin slicing out of the selected lines of code.
      May be negative as with `slice`.
    - `end` - An integer at which to end slicing out of the selected lines of code.
      May be negative as with `slice`.
