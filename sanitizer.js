/**
 * Aggressive but careful secret sanitizer for gitsnap-cli.
 * Never let secrets reach AI prompts.
 */

const SECRET_PATTERNS = [
  /([A-Z0-9_]*(?:SECRET|KEY|TOKEN|PASSWORD|PASS|AUTH|CREDENTIAL|PRIVATE|API[_-]?KEY)[A-Z0-9_]*\s*[=:]\s*)(['"]?)([^\s'"\\]+)(\2)/gi,
  /(bearer\s+)[a-zA-Z0-9\-\._~\+\/]+=*/gi,
  /(authorization\s*[:=]\s*['"]?)(bearer\s+)?[a-zA-Z0-9\-\._~\+\/]+=*/gi,
  /\b(sk-[a-zA-Z0-9]{20,})\b/g,
  /\b(sk-ant-[a-zA-Z0-9\-]{20,})\b/g,
  /\b(xox[baprs]-[a-zA-Z0-9-]{10,})\b/g,
  /\b(ghp_[a-zA-Z0-9]{30,})\b/g,
  /\b(gho_[a-zA-Z0-9]{30,})\b/g,
  /\b(github_pat_[a-zA-Z0-9_]{20,})\b/g,
  /\b(AKIA[0-9A-Z]{16})\b/g,
  /\b(AIza[0-9A-Za-z\-_]{30,})\b/g,
  /\beyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\b/g,
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g,
  /(postgres(?:ql)?:\/\/[^\s'"]+)/gi,
  /(mysql:\/\/[^\s'"]+)/gi,
  /(mongodb(?:\+srv)?:\/\/[^\s'"]+)/gi,
  /(redis:\/\/[^\s'"]+)/gi
];

const SAFE_GENERIC = /\b(?:token|key|secret|password|auth)[_-]?[a-zA-Z0-9]*\s*[=:]\s*['"]?([a-zA-Z0-9_\-]{20,})/gi;

function sanitizeContext(text) {
  if (!text || typeof text !== 'string') return '';

  let s = text;

  for (const pattern of SECRET_PATTERNS) {
    s = s.replace(pattern, (match, ...groups) => {
      if (groups[0] && typeof groups[0] === 'string' && (groups[0].includes('=') || groups[0].includes(':'))) {
        return groups[0] + '[REDACTED]';
      }
      return '[REDACTED]';
    });
  }

  s = s.replace(SAFE_GENERIC, (match, value) => match.replace(value, '[REDACTED]'));

  return s;
}

module.exports = { sanitizeContext, SECRET_PATTERNS };
