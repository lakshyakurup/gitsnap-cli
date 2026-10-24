const { SECRET_PATTERNS } = require('./rules');

function sanitizeContext(rawText) {
  if (!rawText) return '';
  let sanitized = rawText;
  SECRET_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '$1[REDACTED]');
  });
  return sanitized;
}

module.exports = { sanitizeContext };
