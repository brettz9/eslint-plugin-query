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
  extends: ['ash-nazg/sauron-node', 'plugin:node/recommended-script'],
  parserOptions: {
    sourceType: 'script'
  },
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
