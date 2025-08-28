#!/usr/bin/env node

import {cliBasics} from 'command-line-basics';
import {
  format as eslintFormat, count as eslintCount, fileCount as eslintFileCount
} from '../lib/programmatic.js';

const optionDefinitions = await cliBasics(
  import.meta.dirname + '/optionDefinitions.js',
  {
    packageJsonPath: import.meta.dirname + '/../package.json'
  }
);

if (!optionDefinitions) { // cliBasics handled
  process.exit();
}

// eslint-disable-next-line unicorn/prefer-top-level-await -- Has returns
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
