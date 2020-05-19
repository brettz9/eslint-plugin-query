'use strict';

const {promisify} = require('util');
const {join} = require('path');
const {execFile: ef} = require('child_process');

const execFile = promisify(ef);

const binFile = join(__dirname, '../bin/index.js');

describe('Binary', function () {
  this.timeout(20000);

  it('should log help', async function () {
    const {stdout} = await execFile(binFile, ['-h']);
    expect(stdout).to.contain(
      'arbitrary selectors to choose source lines'
    );
    expect(stdout).to.contain('esq -q');
  });

  it('should run queries with default (`.`)', async function () {
    const {stdout} = await execFile(binFile, [
      '-q', 'VariableDeclaration'
    ]);
    expect(stdout).to.contain(
      'error  "const {join}'
    );
  });

  it('should run queries with specific file', async function () {
    const {stdout} = await execFile(binFile, [
      '-q', 'VariableDeclaration',
      '-i', 'tests/lib/fixtures/sample.js'
    ]);
    expect(stdout).to.contain(
      'error  "const val1 = 5;'
    );
  });

  it('should run queries with specific file with `notGlob`', async function () {
    const {stdout} = await execFile(binFile, [
      '-q', 'VariableDeclaration',
      '-i', 'tests/lib/fixtures/sample.js',
      '--notGlob'
    ]);
    expect(stdout).to.contain(
      'error  "const val1 = 5;'
    );
  });

  it('should handle multiple child arguments', async function () {
    const {stdout} = await execFile(binFile, [
      '-q', 'VariableDeclaration',
      '-i', 'tests/lib/fixtures/sample.js',
      '--template', 'Oops: ${result}',
      '--start', '1',
      '--end', '-1'
    ]);
    expect(stdout).to.contain(
      'Oops: const val1 = 5;'
    );
  });

  it('should handle child arguments in node format', async function () {
    const {stdout} = await execFile(binFile, [
      '-q', 'VariableDeclaration',
      '--parent',
      '--end', '1000',
      '--format', 'node',
      '-i', 'tests/lib/fixtures/sample.js'
    ]);
    expect(stdout).to.contain(
      '"type": "VariableDeclaration",'
    );
    expect(stdout).to.contain(
      '"parent": "'
    );
  });

  describe('`count`', function () {
    it('should return a count of matching queries', async function () {
      const {stdout} = await execFile(binFile, [
        '-q', 'VariableDeclaration',
        '--count',
        '.'
      ]);
      expect(stdout).to.match(
        /^\d+\n$/u
      );
    });
  });

  describe('`fileCount`', function () {
    it('should return a count of matching files', async function () {
      const {stdout} = await execFile(binFile, [
        '-q', 'VariableDeclaration',
        '--fileCount',
        '.'
      ]);
      expect(stdout).to.match(
        /^\d+\n$/u
      );
    });
  });
});
