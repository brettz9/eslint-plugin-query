import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      'coverage'
    ]
  },
  ...ashNazg(['sauron', 'node']),
  {
    files: ['docs/**'],
    rules: {
      'import/unambiguous': 'off'
    }
  },
  {
    files: ['README.md/*.js'],
    rules: {
      'import/no-unresolved': ['error', {ignore: ['eslint-plugin-query']}]
    }
  },
  {
    settings: {
      polyfills: [
        'Object.entries'
      ]
    },
    rules: {
      'no-template-curly-in-string': 'off'
    }
  }
];
