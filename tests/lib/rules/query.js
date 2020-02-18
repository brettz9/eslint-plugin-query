/**
 * @file Use arbitrary selectors to search for lines of code
 * @author Brett Zamir
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/query');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('query', rule, {
  valid: [
    {
      code: 'function a (b, c) {}'
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>3]': {
              // eslint-disable-next-line no-template-curly-in-string
              template: 'Oops, too long: ${result}.'
            }
          }
        }
      ]
    }
  ],

  invalid: [
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>1]': {
              // eslint-disable-next-line no-template-curly-in-string
              template: 'Oops, too long: `${result}`.'
            }
          }
        }
      ],
      errors: [{
        message: 'Oops, too long: `function a (b, c) {}`.',
        type: 'FunctionDeclaration'
      }]
    }
  ]
});
