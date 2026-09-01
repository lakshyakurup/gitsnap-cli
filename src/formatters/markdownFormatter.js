const { sanitizeText } = require('../security/sanitizer');

function markdownFormatter(payload = {}, options = {}) {
  const { secretMask = true } = options;
  const branch = payload.branch || 'detached HEAD';
  const statusOutput = payload.status || 'No tracked changes.';
  const diffOutput = payload.diff || 'No diff available.';

  const finalStatus = secretMask ? sanitizeText(statusOutput) : statusOutput;
  const finalDiff = secretMask ? sanitizeText(diffOutput) : diffOutput;

  return [
    '## Git Context Snapshot',
    `**Branch:** ${branch}`,
    '',
    '### Git Status',
    finalStatus || 'No tracked changes.',
    '',
    '### Git Diff',
    '```diff',
    finalDiff || 'No diff available.',
    '```',
    '',
  ].join('\n');
}

module.exports = {
  markdownFormatter,
};
