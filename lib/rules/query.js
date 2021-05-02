/**
 * @file Use arbitrary selectors to search for lines of code
 * @author Brett Zamir
 */
'use strict';

const stringify = require('fast-safe-stringify');
const esTemplate = require('es6-template-strings');

// Rule Definition

module.exports = {
  meta: {
    // Could be a problem depending on usage
    type: 'suggestion',
    docs: {
      description: 'Use arbitrary selectors to search for lines of code',
      // category: 'Fill me in',
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
            enum: ['string', 'node', 'json-stringify']
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
                    enum: ['json-stringify', 'string', 'node']
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
      queries = {},
      defaultFormat = 'json-stringify'
    } = context.options[0] || {};

    const sourceCode = context.getSourceCode();

    return Object.entries(queries).reduce(
      (obj, [selector, {
        template, start = 0,
        end = Number.POSITIVE_INFINITY, format = defaultFormat,
        parent
      }]) => {
        obj[selector] = (node) => {
          let text;
          switch (format) {
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
          case 'json-stringify':
            text = JSON.stringify(sourceCode.getText(node));
            break;
          case 'string': default:
            text = sourceCode.getText(node);
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
