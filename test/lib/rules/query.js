/**
 * @file Use arbitrary selectors to search for lines of code.
 * @author Brett Zamir
 */

//
// Requirements
//

import {RuleTester} from 'eslint';
import {rules} from '../../../lib/index.js';
import {functionAST, functionASTNoParent} from '../fixtures/ast.js';

const rule = rules.query;

//
// Tests
//

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
              template: 'Oops, too long: `${result}`.'
            }
          }
        }
      ],
      errors: [{
        message: 'Oops, too long: `"function a (b, c) {}"`.',
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          defaultFormat: 'string',
          queries: {
            'FunctionDeclaration[params.length>1]': {
              template: 'Oops, too long: `${result}`.'
            }
          }
        }
      ],
      errors: [{
        message: 'Oops, too long: `function a (b, c) {}`.',
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>1]': {}
          }
        }
      ],
      errors: [{
        message: '"function a (b, c) {}"',
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>1]': {
              start: 10,
              end: -4
            }
          }
        }
      ],
      errors: [{
        message: 'a (b, c)',
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          queries: {
            'FunctionDeclaration[params.length>1]': {
              format: 'node',
              parent: true
            }
          }
        }
      ],
      errors: [{
        message: functionAST,
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          defaultFormat: 'node',
          queries: {
            'FunctionDeclaration[params.length>1]': {
            }
          }
        }
      ],
      errors: [{
        message: functionASTNoParent,
        type: 'FunctionDeclaration'
      }]
    },
    {
      code: 'function a (b, c) {}',
      options: [
        {
          defaultFormat: 'node',
          queries: {
            'FunctionDeclaration[params.length>1]': {
            }
          }
        }
      ],
      errors: [{
        message: functionASTNoParent,
        type: 'FunctionDeclaration'
      }]
    }
  ]
});
