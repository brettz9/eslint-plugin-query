/**
 * @file Use arbitrary selectors to require that specific
 *        structures are present
 * @author Brett Zamir
 */
'use strict';

const esTemplate = require('es6-template-strings');

// Rule Definition

module.exports = {
  meta: {
    // Could be a problem depending on usage
    type: 'suggestion',
    docs: {
      description: 'Use arbitrary selectors to require that ' +
        'specific structures are present',
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
                  template: {
                    type: 'string'
                  },
                  minimum: {
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
      queries = {}
    } = context.options[0] || {};

    const selectorMap = {};

    return Object.entries(queries).reduce(
      (obj, [selector]) => {
        obj[selector] = (node) => {
          if (!selectorMap[selector]) {
            selectorMap[selector] = 0;
          }
          selectorMap[selector]++;
        };
        return obj;
      }, {
        'Program:exit' () {
          Object.entries(queries).some(([selector, {
            minimum = 1,
            template = 'Syntax is required: ${selector}'
          }]) => {
            const selectorCount = selectorMap[selector] || 0;
            if (selectorCount < minimum) {
              context.report({
                message: esTemplate(template, {selector}),
                loc: {
                  start: {line: 1},
                  end: {line: 1}
                }
              });
              return true;
            }
            return false;
          });
        }
      }
    );
  }
};
