/**
 * Aggressive but careful secret sanitizer for gitsnap-cli.
 * Never let secrets reach AI prompts.
 */

const SECRET_PATTERNS = [
  // .env style KEY=VALUE (SECRET, KEY, TOKEN, PASSWORD, AUTH, CREDENTIAL, etc.)
  /([A-Z0-9_]*(?:SECRET|KEY|TOKEN|PASSWORD|PASS|AUTH|CREDENTIAL|PRIVATE|API[_-]?KEY)[A-Z0-9_]*\s*[=:]\s*)(['"]?)([^\s'"\\]+)(\2)/gi,

  // Bearer / Authorization headers
  /(bearer\s+)[a-zA-Z0-9\-\._~\+\/]+=*/gi,
  /(authorization\s*[:=]\s*['"]?)(bearer\s+)?[a-zA-Z0-9\-\._~\+\/]+=*/gi,

  // Common API key prefixes
  /\b(sk-[a-zA-Z0-9]{20,})\b/g,                    // OpenAI style
  /\b(sk-ant-[a-zA-Z0-9\-]{20,})\b/g,              // Anthropic
  /\b(xox[baprs]-[a-zA-Z0-9-]{10,})\b/g,           // Slack
  /\b(ghp_[a-zA-Z0-9]{30,})\b/g,                   // GitHub PAT
  /\b(gho_[a-zA-Z0-9]{30,})\b/g,
  /\b(github_pat_[a-zA-Z0-9_]{20,})\b/g,
  /\b(AKIA[0-9A-Z]{16})\b/g,                       // AWS Access Key
  /\b(AIza[0-9A-Za-z\-_]{30,})\b/g,                // Google API

  // JWTs (three base64 segments)
  /\beyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\b/g,

  // Private keys
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g,

  // Connection strings
  /(postgres(?:ql)?:\/\/[^\s'"]+)/gi,
  /(mysql:\/\/[^\s'"]+)/gi,
  /(mongodb(?:\+srv)?:\/\/[^\s'"]+)/gi,
  /(redis:\/\/[^\s'"]+)/gi,

  // Generic high-entropy tokens (conservative)
  /\b([a-zA-Z0-9_\-]{32,})\b/g
];

// Patterns that are too aggressive for the last generic one – we only apply generic on obvious contexts
const SAFE_GENERIC = /\b(?:token|key|secret|password|auth)[_-]?[a-zA-Z0-9]*\s*[=:]\s*['"]?([a-zA-Z0-9_\-]{20,})/gi;

function sanitizeContext(text) {
  if (!text || typeof text !== 'string') return '';

  let s = text;

  // Apply specific high-confidence patterns first
  for (const pattern of SECRET_PATTERNS.slice(0, -1)) {
    s = s.replace(pattern, (match, ...groups) => {
      // Keep the label, redact the value
      if (groups[0] && typeof groups[0] === 'string' && groups[0].includes('=')) {
        return groups[0] + '[REDACTED]';
      }
      return '[REDACTED]';
    });
  }

  // Safer generic for remaining KEY=value style
  s = s.replace(SAFE_GENERIC, (match, value) => match.replace(value, '[REDACTED]'));

  return s;
}

module.exports = { sanitizeContext, SECRET_PATTERNS };
