const { sanitizeContext } = require('../src/security/sanitizer');

function runTest() {
  const input = "API_KEY=super_secret_12345";
  const result = sanitizeContext(input);
  if (result.includes("super_secret_12345")) {
    console.error("❌ Test Failed");
    process.exit(1);
  }
  console.log("✅ Sanitizer Test Passed!");
}

runTest();
