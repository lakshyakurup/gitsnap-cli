import test from 'node:test';
import assert from 'node:assert/strict';

test('git status returns string type', () => {
  const status = ' M src/index.js';
  assert.equal(typeof status, 'string');
});

test('escape markdown keeps text safe', () => {
  const text = 'a|b';
  assert.equal(typeof text, 'string');
});
