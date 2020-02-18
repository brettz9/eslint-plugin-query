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
  extends: ['ash-nazg', 'plugin:node/recommended-script'],
  parserOptions: {
    sourceType: 'script'
  },
  rules: {
  }
};
