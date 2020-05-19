'use strict';

const {join} = require('path');
const {ESLint} = require('eslint');

/**
* @external LintResult
* @see https://eslint.org/docs/developer-guide/nodejs-api#%E2%97%86-lintresult-type
*/

/**
* @external ESLint
* @see https://eslint.org/docs/developer-guide/nodejs-api
*/

/**
* @external Formatter
* @see https://eslint.org/docs/user-guide/formatters/
*/

/**
* @typedef {PlainObject} QueryInfo
* @property {string} template
* @property {Integer} start
* @property {Integer} end
* @property {boolean} parent
* @property {"string"|"node"} format
*/

/**
* @typedef {PlainObject} ESLintPluginQueryOptions
* @property {string[]} file
* @property {boolean} notGlob
* @property {"string"|"node"} defaultFormat
* @property {PlainObject<string,QueryInfo>} queries Map of selectors to query
* info object
* @property {external:Formatter} formatter
*/

/**
* @typedef {PlainObject} ESLintPluginLintInfo
* @property {external:ESLint} eslint
* @property {external:LintResult[]} results
*/

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {ESLintPluginLintInfo}
*/
const lint = exports.lint = async function ({
  file: f, notGlob, queries, defaultFormat = 'json-stringify'
}) {
  const file = f && f.length ? f : ['.'];

  const eslintBase = new ESLint({
    useEslintrc: true
  });

  const config = await eslintBase.calculateConfigForFile(
    notGlob ? file[0] : 'eslint-plugin-query-dummy.js'
  );
  const baseConfig = {
    rules: {
      query: ['error', {
        queries, defaultFormat
      }]
    }
  };
  [
    'parser', 'parserOptions'
    // Might parsers use `settings` too?
  ].forEach((prop) => {
    if (config[prop]) {
      baseConfig[prop] = config[prop];
    }
  });

  // eslint --plugin query --rule 'query/query: [2, {queries:
  //   {"FunctionDeclaration[params.length>4]": {end:100}}}]' .
  const eslint = new ESLint({
    globInputPaths: !notGlob,
    useEslintrc: false,
    allowInlineConfig: false,
    rulePaths: [
      join(__dirname, 'rules')
    ],
    // Todo: Allow changing warning level?
    baseConfig
  });

  return {
    eslint,
    results: await eslint.lintFiles(file)
  };
};

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {string}
 */
exports.format = async function (opts) {
  const {eslint, results} = await lint(opts);
  const formatter = await eslint.loadFormatter(opts.formatter || 'stylish');
  return formatter.format(results);
};

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {Integer}
 */
exports.fileCount = async function (opts) {
  const {results} = await lint(opts);
  return results.length;
};

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {Integer}
 */
exports.count = async function (opts) {
  const {results} = await lint(opts);

  let count = 0;
  results.forEach(({messages}) => {
    count += messages.length;
  });
  return count;
};
