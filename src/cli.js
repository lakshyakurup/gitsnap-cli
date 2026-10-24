const { getRepoContext } = require('./services/gitService');
const { formatMarkdown } = require('./formatters/markdownFormatter');

function runCLI(args) {
  const includeDiff = args.includes('--diff') || args.includes('-d');
  const noMask = args.includes('--no-secret-mask');

  const rawContext = getRepoContext(includeDiff);
  const markdownOutput = formatMarkdown(rawContext, !noMask);

  console.log(markdownOutput);
}

module.exports = { runCLI };
