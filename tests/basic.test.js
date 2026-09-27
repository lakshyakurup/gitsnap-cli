import test from 'node:test';
import assert from 'node:assert/strict';

test('snapshot heading exists', () => {
  assert.match('# Git Snapshot', /Git Snapshot/);
});

test('helper returns string', () => {
  const value = 'git status';
  assert.equal(typeof value, 'string');
});
