import test from 'node:test';
import assert from 'node:assert/strict';
import { ParserService } from '../src/services/parser.js';

test('parser service handles payload', () => {
  const parser = new ParserService();
  const result = parser.parseDelaySignal({ delay_minutes: 5 });
  assert.equal(result.delay_minutes, 5);
});
