const { SENSITIVE_RULES } = require('./rules');

function sanitizeText(value = '') {
  if (value === null || value === undefined) {
    return '';
  }

  let sanitized = String(value);

  for (const rule of SENSITIVE_RULES) {
    sanitized = sanitized.replace(rule.regex, rule.replacement);
  }

  return sanitized;
}

module.exports = {
  sanitizeText,
};
