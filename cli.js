const { getRepoContext } = require('./gitService');
const { formatMarkdown } = require('./markdownFormatter');

function runCLI(args) {
  const includeDiff = args.includes('--diff') || args.includes('-d');
  const noMask = args.includes('--no-secret-mask');
  const rawContext = getRepoContext(includeDiff);
  console.log(formatMarkdown(rawContext, !noMask));
}

module.exports = { runCLI };
