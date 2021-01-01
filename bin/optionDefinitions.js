'use strict';

const pkg = require('../package.json');

// Todo: We really need a comamnd-line-args-TO-typedef-jsdoc generator!
/* eslint-disable jsdoc/require-property -- Use jsdoc-jsonschema? */
/**
* @typedef {PlainObject} ESLintPluginQueryCLIOptions
*/
/* eslint-enable jsdoc/require-property -- Use jsdoc-jsonschema? */

const getChalkTemplateSingleEscape = (s) => {
  return s.replace(/[{}\\]/gu, (ch) => {
    return `\\u${ch.codePointAt().toString(16).padStart(4, '0')}`;
  });
};

const optionDefinitions = [
  {
    name: 'file', type: String, multiple: true, defaultOption: true,
    alias: 'i',
    description: 'Path to the file(s) to lint. Defaults to `.`',
    typeLabel: '{underline file path}'
  },
  {
    name: 'query', type: String, multiple: true,
    alias: 'q',
    description: 'string representing the esquery selector; see ' +
      'https://eslint.org/docs/developer-guide/selectors',
    typeLabel: '{underline selector}'
  },
  {
    name: 'template', type: String, alias: 't', multiple: true,
    description: 'A string in the form of an ES6 template for this query ' +
      '(see es6-template-strings at https://github.com/medikoo/es6-template-strings/' +
      'It will be passed `result`, the selector-identified node represented ' +
      'as a string (i.e., the lines of code pointed to by the selector); ' +
      getChalkTemplateSingleEscape(
        'defaults to: "${result}"; passed `result`. '
      ) +
      'Remember to escape `$` with backslash for CLI use.',
    typeLabel: '{underline template}'
  },
  {
    name: 'start', type: parseInt, multiple: true, alias: 's',
    description: 'Integer at which to begin slicing out of the selected ' +
      'lines of code for this query. May be negative as with `slice`',
    typeLabel: '{underline integer}'
  },
  {
    name: 'end', type: parseInt, multiple: true, alias: 'e',
    description: 'Integer at which to end slicing out of the selected ' +
      'lines of code for this query. May be negative as with `slice`',
    typeLabel: '{underline integer}'
  },
  {
    name: 'parent', type: Boolean, multiple: true, alias: 'p',
    description: 'If `format` is "node", setting this to `true` for a ' +
        'query will also show the `parent` properties on the AST. ' +
        'Defaults to `false`.'
  },
  {
    name: 'format', type: String, multiple: true, alias: 'f',
    description: 'Overrides `defaultFormat` per query (see `defaultFormat`).',
    typeLabel: '{underline "string"|"node"|"json-stringify"}'
  },
  {
    name: 'fileCount', type: Boolean,
    description: 'If set, will count the total number of files where the ' +
      '`selector`\'s were found insead of the default of showing found ' +
      'code excerpts themselves.'
  },
  {
    name: 'count', type: Boolean, alias: 'c',
    description: 'If set, will count the total of the `selector`\'s found ' +
      'rather than the default of showing found code excerpts themselves.'
  },
  {
    name: 'defaultFormat', type: String,
    description: 'If `node` is chosen will be represented as stringified ' +
      'Node AST rather than the string found in source, but please note that ' +
      'there can be performance issues if you do not supply an `end` value ' +
      'with the `"node"` option; defaults to "json-stringify".',
    typeLabel: '{underline "json-stringify"|"string"|"node"}'
  },
  {
    name: 'notGlob', type: Boolean,
    description: 'Indicates the file(s) given are not globs. If set, this ' +
      'option will also treat the first `file` as the determinant for ' +
      'detecting `parser` and `parserOptions` (rather than the dummy ' +
      'file (that can be used for `overrides` matching) of ' +
      '`eslint-plugin-query-dummy.js`).'
  },
  {
    name: 'formatter', type: String,
    description: 'The ESLint formatter to use; see ' +
      'https://eslint.org/docs/user-guide/formatters/ ; ' +
      'defaults to "stylish".',
    typeLabel: '{underline "checkstyle"|"codeframe"|"compact"|"html"|' +
      '"jslint-xml"|"json-with-metadata"|"json"|"junit"|"stylish"|' +
      '"table"|"tap"|"unix"|"visualstudio"}'
  }
];

const cliSections = [
  {
    // Add italics: `{italic textToItalicize}`
    content: pkg.description +
      '\n\n{italic esq -q="FunctionDeclaration > FunctionExpression" ' +
        '[--defaultFormat="node"] [--start=<int>] [--end=<int>]} ' +
        '[-i <files to lint>]'
  },
  {
    optionList: optionDefinitions,
    tableOptions: {
      noWrap: true
    }
  }
];

exports.getChalkTemplateSingleEscape = getChalkTemplateSingleEscape;
exports.definitions = optionDefinitions;
exports.sections = cliSections;
