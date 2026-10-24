const SECRET_PATTERNS = [
  /([A-Z0-9_]*(?:SECRET|KEY|TOKEN|PASSWORD|AUTH)[A-Z0-9_]*\s*=\s*)([^\s]+)/gi,
  /(bearer\s+)[a-zA-Z0-9\-\._~\+\/]+=*/gi,
  /-----BEGIN (?:RSA|OPENSSH|PRIVATE) KEY-----[\s\S]*?-----END \1-----/g
];

function sanitizeContext(text) {
  if (!text) return '';
  let s = text;
  SECRET_PATTERNS.forEach(p => s = s.replace(p, '$1[REDACTED]'));
  return s;
}

module.exports = { sanitizeContext };
