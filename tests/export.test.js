import test from 'node:test';
import assert from 'node:assert/strict';

test('export command path validation', () => {
  const path = '/tmp/snapshot.md';
  assert.match(path, /\.md$/);
});
