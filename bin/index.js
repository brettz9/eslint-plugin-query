#!/usr/bin/env node
'use strict';

const {join} = require('path');
const {cliBasics} = require('command-line-basics');
const {
  format: eslintFormat, count: eslintCount, fileCount: eslintFileCount
} = require('../lib/programmatic.js');

const optionDefinitions = cliBasics(
  join(__dirname, './optionDefinitions.js')
);

if (!optionDefinitions) { // cliBasics handled
  process.exit();
}

(async () => {
const {
  file, notGlob,
  count, fileCount, defaultFormat,
  query
} = optionDefinitions;

// This format is practical for the CLI but not for programmatic usage
const queries = {};
Object.values(query).forEach((q, i) => {
  [
    'template', 'start', 'end', 'parent', 'format'
  ].forEach((prop) => {
    if (!queries[q]) {
      queries[q] = {};
    }
    if ({}.hasOwnProperty.call(optionDefinitions, prop)) {
      queries[q][prop] = optionDefinitions[prop][i];
    }
  });
});

if (fileCount !== undefined) {
  // eslint-disable-next-line no-console -- Binary
  console.log(await eslintFileCount({
    file, notGlob, defaultFormat, queries
  }));
  return;
}

if (count !== undefined) {
  // eslint-disable-next-line no-console -- Binary
  console.log(await eslintCount({
    file, notGlob, defaultFormat, queries
  }));
  return;
}

// eslint-disable-next-line no-console -- Binary
console.log(await eslintFormat({
  file, notGlob, defaultFormat, queries
}));
})();
