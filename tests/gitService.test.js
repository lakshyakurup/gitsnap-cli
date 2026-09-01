const test = require('node:test');
const assert = require('node:assert/strict');
const { GitService } = require('../src/services/gitService');

test('GitService.getBranch returns a string value', () => {
  const service = new GitService(process.cwd());
  const branch = service.getBranch();
  assert.equal(typeof branch, 'string');
  assert.ok(branch.length > 0);
});

test('GitService.getRecentCommits returns an array', () => {
  const service = new GitService(process.cwd());
  const commits = service.getRecentCommits(3);
  assert.ok(Array.isArray(commits));
});
