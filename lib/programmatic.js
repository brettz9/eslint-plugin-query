import {ESLint} from 'eslint';

import query from './rules/query.js';
import noMissingSyntax from './rules/no-missing-syntax.js';

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
* @typedef {object} QueryInfo
* @property {string} template
* @property {Integer} start
* @property {Integer} end
* @property {boolean} parent
* @property {"string"|"node"} format
*/

/**
* @typedef {object} ESLintPluginQueryOptions
* @property {string[]} file
* @property {boolean} notGlob
* @property {"string"|"node"} defaultFormat
* @property {Object<string,QueryInfo>} queries Map of selectors to query
* info object
* @property {Formatter} formatter
*/

/**
* @typedef {object} ESLintPluginLintInfo
* @property {ESLint} eslint
* @property {LintResult[]} results
*/

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {ESLintPluginLintInfo}
*/
export const lint = async function ({
  file: f, notGlob, queries, defaultFormat = 'json-stringify'
}) {
  const file = f && f.length ? f : ['.'];

  const eslintBase = new ESLint();

  let config;
  try {
    config = await eslintBase.calculateConfigForFile(
      notGlob ? file[0] : 'eslint-plugin-query-dummy.js'
    );
  } catch (err) {
  }

  const baseConfig = {
    rules: {
      'query/query': ['error', {
        queries, defaultFormat
      }]
    }
  };

  /* istanbul ignore else */
  if (config) {
    [
      'parser', 'parserOptions',
      'languageOptions'
      // Might parsers use `settings` too?
    ].forEach((prop) => {
      if (config[prop]) {
        baseConfig[prop] = config[prop];
      }
    });
  }

  // eslint --plugin query --rule 'query/query: [2, {queries:
  //   {"FunctionDeclaration[params.length>4]": {end:100}}}]' .
  const eslint = new ESLint({
    globInputPaths: !notGlob,
    allowInlineConfig: false,
    plugins: {
      query: {
        rules: {
          'no-missing-syntax': noMissingSyntax,
          query
        }
      }
    },
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
export const format = async function (opts) {
  const {eslint, results} = await lint(opts);
  const formatter = await eslint.loadFormatter(opts.formatter || 'stylish');
  return formatter.format(results);
};

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {Integer}
 */
export const fileCount = async function (opts) {
  const {results} = await lint(opts);
  return results.length;
};

/**
 * @param {ESLintPluginQueryOptions} opts
 * @returns {Integer}
 */
export const count = async function (opts) {
  const {results} = await lint(opts);

  let ct = 0;
  results.forEach(({messages}) => {
    ct += messages.length;
  });
  return ct;
};
