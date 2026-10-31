const { sanitizeContext } = require('./sanitizer');

function formatMarkdown({ branch, status, diff, commitLog, recentFiles }, shouldMask = true) {
  let md = `## Git Context Snapshot\n**Branch:** ${branch}\n\n`;

  if (status) {
    md += `### Status\n\`\`\`\n${shouldMask ? sanitizeContext(status) : status}\n\`\`\`\n\n`;
  }

  if (recentFiles) {
    md += `### Recent Files\n\`\`\`\n${shouldMask ? sanitizeContext(recentFiles) : recentFiles}\n\`\`\`\n\n`;
  }

  if (diff) {
    md += `### Diff\n\`\`\`diff\n${shouldMask ? sanitizeContext(diff) : diff}\n\`\`\`\n\n`;
  }

  if (commitLog) {
    md += `### Commits\n\`\`\`\n${shouldMask ? sanitizeContext(commitLog) : commitLog}\n\`\`\`\n`;
  }

  return md;
}

module.exports = { formatMarkdown };
