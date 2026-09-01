const { sanitizeText } = require('../security/sanitizer');

function jsonFormatter(payload = {}, options = {}) {
  const { secretMask = true } = options;
  const normalized = {
    repo: payload.repo || null,
    branch: payload.branch || 'detached HEAD',
    generatedAt: payload.generatedAt || new Date().toISOString(),
    status: payload.status || '',
    diff: payload.diff || '',
    commitLog: Array.isArray(payload.commitLog) ? payload.commitLog : [],
  };

  if (secretMask) {
    normalized.status = sanitizeText(normalized.status);
    normalized.diff = sanitizeText(normalized.diff);
    normalized.commitLog = normalized.commitLog.map((entry) => ({
      ...entry,
      message: sanitizeText(entry.message || ''),
    }));
  }

  return JSON.stringify(normalized, null, 2);
}

module.exports = {
  jsonFormatter,
};
