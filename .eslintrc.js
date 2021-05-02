'use strict';

module.exports = {
  env: {
    node: true
  },
  settings: {
    polyfills: [
      'Object.entries'
    ]
  },
  extends: ['ash-nazg/sauron-node-script-overrides'],
  parserOptions: {
    sourceType: 'script'
  },
  overrides: [{
    files: 'tests/**',
    env: {
      mocha: true
    },
    globals: {
      expect: true
    }
  }],
  rules: {
    // Add back after overrides from Node plugin
    'no-process-exit': 0,
    'import/no-commonjs': 0,

    // Browser only
    'compat/compat': 0,

    'node/exports-style': 0,
    'no-template-curly-in-string': 0
  }
};
