const { sanitizeContext } = require('./sanitizer');

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

// Basic .env style
test('API_KEY redaction', 'API_KEY=super_secret_12345', '[REDACTED]', 'super_secret_12345');
test('SECRET with spaces', 'MY_SECRET = "abc123def"', '[REDACTED]', 'abc123def');
test('Bearer token', 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy', '[REDACTED]', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

// Provider keys
test('OpenAI key', 'const key = "sk-abcdefghijklmnopqrstuvwxyz123456";', '[REDACTED]', 'sk-abcdefghijklmnopqrstuvwxyz123456');
test('GitHub PAT', 'token: ghp_abcdefghijklmnopqrstuvwxyz1234567890', '[REDACTED]', 'ghp_abcdefghijklmnopqrstuvwxyz1234567890');
test('AWS key', 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE', '[REDACTED]', 'AKIAIOSFODNN7EXAMPLE');

// Private key block
const privKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AH8p...
-----END RSA PRIVATE KEY-----`;
test('Private key block', privKey, '[REDACTED]', 'MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn');

// Should NOT over-redact normal code
test('Normal code survives', 'const apiUrl = "https://api.example.com";\nlet count = 42;', 'api.example.com', null);
test('Normal variable', 'const userName = "lakshya";', 'lakshya', null);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
console.log('✅ All sanitizer tests passed!');
