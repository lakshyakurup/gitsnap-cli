const SENSITIVE_RULES = [
  {
    name: 'http-auth-credentials',
    regex: /(https?:\/\/)([^:@\s/]+):([^@\s/]+)@/gi,
    replacement: '$1[REDACTED]:[REDACTED]@',
  },
  {
    name: 'bearer-token',
    regex: /(Authorization\s*:\s*)(Bearer\s+)?[A-Za-z0-9._~+\-/]+=*/gi,
    replacement: '$1[REDACTED]',
  },
  {
    name: 'jwt',
    regex: /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g,
    replacement: '[JWT_REDACTED]',
  },
  {
    name: 'private-key',
    regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g,
    replacement: '-----BEGIN PRIVATE KEY-----\n[REDACTED]\n-----END PRIVATE KEY-----',
  },
  {
    name: 'generic-token',
    regex: /(token|api[_-]?key|access[_-]?key|secret|private[_-]?key|client[_-]?secret|auth[_-]?token)\s*[:=]\s*["']?([A-Za-z0-9._~+\-/=]{8,})["']?/gi,
    replacement: '$1=[REDACTED]',
  },
  {
    name: 'dotenv-variable',
    regex: /(^|\n)(?:export\s+)?([A-Z0-9_]+(?:TOKEN|SECRET|PASSWORD|API_KEY|ACCESS_KEY|PRIVATE_KEY|CLIENT_SECRET)[A-Z0-9_]*)\s*=\s*.*$/gim,
    replacement: '$1$2=[REDACTED]',
  },
  {
    name: 'key-value-pair',
    regex: /((?:API|ACCESS|SECRET|PRIVATE|CLIENT|GITHUB|GITLAB|BITBUCKET|TOKEN|PASSWORD|KEY)[A-Z0-9_]*)\s*[:=]\s*(['"]?)([^\s'"`]+)\2/gi,
    replacement: '$1=[REDACTED]',
  },
  {
    name: 'url-query-secret',
    regex: /([?&](?:token|api_key|key|secret|password|access_token)=[^&\s]+)/gi,
    replacement: '$1[REDACTED]',
  },
];

module.exports = {
  SENSITIVE_RULES,
};
