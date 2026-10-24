const { sanitizeContext } = require('./sanitizer');
const res = sanitizeContext("API_KEY=super_secret_12345");
if (res.includes("super_secret_12345")) {
  console.error("❌ Test Failed");
  process.exit(1);
}
console.log("✅ Sanitizer Test Passed!");
