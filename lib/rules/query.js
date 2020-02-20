/**
 * @file Use arbitrary selectors to search for lines of code
 * @author Brett Zamir
 */
'use strict';

const stringify = require('fast-safe-stringify');
const esTemplate = require('es6-template-strings');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Use arbitrary selectors to search for lines of code',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null, // or 'code' or 'whitespace'
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          defaultFormat: {
            type: 'string',
            enum: ['string', 'node']
          },
          queries: {
            type: 'object',
            patternProperties: {
              '.*': {
                type: 'object',
                additionalProperties: false,
                properties: {
                  parent: {
                    type: 'boolean'
                  },
                  template: {
                    type: 'string'
                  },
                  format: {
                    type: 'string',
                    enum: ['string', 'node']
                  },
                  start: {
                    type: 'integer'
                  },
                  end: {
                    type: 'integer'
                  }
                }
              }
            }
          }
        }
      }
    ]
  },

  create (context) {
    // variables should be defined here
    const {
      queries, defaultFormat = 'string'
    } = context.options[0] || {};
    if (!queries) {
      return {};
    }
    const sourceCode = context.getSourceCode();

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.entries(queries).reduce(
      (obj, [selector, {
        template, start = 0, end = Infinity, format = defaultFormat,
        parent
      }]) => {
        obj[selector] = (node) => {
          let text;
          switch (format) {
          case 'string':
            text = sourceCode.getText(node);
            break;
          case 'node':
            // Todo: Make stringifier length configurable
            text = stringify(
              node,
              parent
                ? null
                : (key, val) => {
                  return key === 'parent' ? undefined : val;
                },
              2
            );
            break;
          }
          const result = text.slice(start, end);
          context.report({
            node,
            // Could use eslint's built-in `messageId`, but would need to
            //  auto-generate and couldn't use JS
            message: template
              ? esTemplate(template, {
                result
              })
              : result
          });
        };
        return obj;
      }, {}
    );
  }
};
