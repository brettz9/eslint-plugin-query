/**
 * @file Use arbitrary selectors to require that specific
 *        structures are present
 * @author Brett Zamir
 */
'use strict';

//
// Requirements
//

const {RuleTester} = require('eslint');
const rules = require('../../../lib/index.js');

const rule = rules.rules['no-missing-syntax'];

//
// Tests
//

const ruleTester = new RuleTester();
ruleTester.run('no-missing-syntax', rule, {
  valid: [
    {
      code: 'function a (b, c) {}'
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length<3]': {
              template: 'Oops, missing a short signature!'
            }
          }
        }
      ]
    }
  ],

  invalid: [

    {
      code: 'function a (b, c, d, e) {} function b (b, c, d, e) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>3]': {
              minimum: 3,
              template: 'Oops, missing at least three long signatures: ' +
                '`${selector}`.'
            }
          }
        }
      ],
      errors: [{
        message: 'Oops, missing at least three long signatures: ' +
          '`FunctionDeclaration[params.length>3]`.',
        type: null
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length<1]': {
            }
          }
        }
      ],
      errors: [{
        message: 'Syntax is required: FunctionDeclaration[params.length<1]',
        type: null
      }]
    }
  ]
});
