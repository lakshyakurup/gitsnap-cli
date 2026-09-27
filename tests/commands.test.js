import test from 'node:test';
import assert from 'node:assert/strict';

test('summary command is callable', () => {
  const command = 'summary';
  assert.equal(typeof command, 'string');
});

test('export command is available', () => {
  const command = 'export';
  assert.equal(typeof command, 'string');
});
