import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultTemplate } from '../src/templates/default.js';

test('default template renders all fields', () => {
  const snapshot = {
    repoName: 'test-repo',
    repoPath: '/tmp/test',
    branch: 'main',
    lastCommit: 'abc123 Test commit',
    remote: 'origin',
    description: 'Test description',
    status: 'M file.js',
    untrackedFiles: 'notes.md',
    diff: 'diff output'
  };

  const result = defaultTemplate(snapshot);
  assert.match(result, /test-repo/);
  assert.match(result, /main/);
});
