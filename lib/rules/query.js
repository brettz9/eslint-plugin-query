/**
 * @file Use arbitrary selectors to search for lines of code
 * @author Brett Zamir
 */
'use strict';

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
    const {queries} = context.options[0] || {};
    if (!queries) {
      return {};
    }
    const ruleID = context.id;
    const sourceCode = context.getSourceCode();

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return Object.entries(queries).reduce(
      (obj, [selector, {template, start = 0, end = Infinity}]) => {
        obj[selector] = (node) => {
          const result = sourceCode.getText(node).slice(start, end);
          context.report({
            node,
            // Could use eslint's built-in `messageId`, but would need to
            //  auto-generate and couldn't use JS
            message: template
              ? esTemplate(template, {
                ruleID,
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
