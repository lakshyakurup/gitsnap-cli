const test = require('node:test');
const assert = require('node:assert/strict');
const { sanitizeText } = require('../src/security/sanitizer');

test('sanitizeText redacts bearer tokens', () => {
  const input = 'Authorization: Bearer abcdef123456';
  const output = sanitizeText(input);
  assert.ok(output.includes('[REDACTED]'));
  assert.ok(!output.includes('abcdef123456'));
});

test('sanitizeText redacts dotenv secrets', () => {
  const input = 'API_KEY=supersecretvalue\nTOKEN=abc123';
  const output = sanitizeText(input);
  assert.ok(output.includes('API_KEY=[REDACTED]'));
  assert.ok(output.includes('TOKEN=[REDACTED]'));
});

test('sanitizeText leaves safe text intact', () => {
  const input = 'feature branch update';
  const output = sanitizeText(input);
  assert.equal(output, input);
});
