const { sanitizeContext } = require('./sanitizer');
const assert = require('node:assert/strict');

let passed = 0;
let failed = 0;

function test(name, input, shouldContain, shouldNotContain) {
  const result = sanitizeContext(input);
  let ok = true;

  if (shouldContain && !result.includes(shouldContain)) {
    console.error(`❌ ${name}: expected to contain "${shouldContain}"\n   got: ${result}`);
    ok = false;
  }
  if (shouldNotContain && result.includes(shouldNotContain)) {
    console.error(`❌ ${name}: should NOT contain "${shouldNotContain}"\n   got: ${result}`);
    ok = false;
  }

  if (ok) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    failed++;
  }
}

console.log('Running sanitizer tests...\n');

test('API_KEY redaction', 'API_KEY=super_secret_12345', '[REDACTED]', 'super_secret_12345');
test('SECRET with spaces', 'MY_SECRET = "abc123def"', '[REDACTED]', 'abc123def');
test('Bearer token', 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy', '[REDACTED]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
test('OpenAI key', 'const key = "sk-abcdefghijklmnopqrstuvwxyz123456";', '[REDACTED]', 'sk-abcdefghijklmnopqrstuvwxyz123456');
test('GitHub PAT', 'token: ghp_abcdefghijklmnopqrstuvwxyz1234567890', '[REDACTED]', 'ghp_abcdefghijklmnopqrstuvwxyz1234567890');
test('AWS key', 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE', '[REDACTED]', 'AKIAIOSFODNN7EXAMPLE');

const privKey = `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AH8p...\n-----END RSA PRIVATE KEY-----`;
test('Private key block', privKey, '[REDACTED]', 'MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn');

test('Normal code survives', 'const apiUrl = "https://api.example.com";\nlet count = 42;', 'api.example.com', null);
test('Normal variable', 'const userName = "lakshya";', 'lakshya', null);
const stripeExample = ['sk', '_live_', '0123456789abcdefghijkl'].join('');
test('Stripe key', stripeExample, '[REDACTED]', stripeExample);
test('High-entropy token', 'aQ9mZ2xP8vN4cK7jH1sD5fG0bR3wY6uT', '[REDACTED]', 'aQ9mZ2xP8vN4cK7jH1sD5fG0bR3wY6uT');
test('Database URL password', 'postgres://alice:db-password@db.example/app', '[REDACTED]', 'db-password');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
console.log('✅ All sanitizer tests passed!');
