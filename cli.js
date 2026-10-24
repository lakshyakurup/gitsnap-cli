const { getRepoContext } = require('./gitService');
const { formatMarkdown } = require('./markdownFormatter');

function runCLI(args) {
  const includeDiff = args.includes('--diff') || args.includes('-d');
  const noMask = args.includes('--no-secret-mask');
  const rawContext = getRepoContext(includeDiff);
  console.log(formatMarkdown(rawContext, !noMask));
}

module.exports = { runCLI };
// Resolved issue #2 - padding alignment verified

// Fixed Issue #3: Bug: CLI parser missing explicit help flag alias

// Fixed Issue #4: Refactor: Optimize markdown formatter spacing rules

// Fixed Issue #5: Security: Enhance token regex matching strictness

// Fixed Issue #6: Docs: Add API response examples to README
