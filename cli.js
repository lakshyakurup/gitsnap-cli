const { getRepoContext } = require('./gitService');
const { formatMarkdown } = require('./markdownFormatter');
const { execSync } = require('child_process');

function copyToClipboard(text) {
  try {
    const platform = process.platform;
    if (platform === 'darwin') {
      execSync('pbcopy', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
    if (platform === 'win32') {
      execSync('clip', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
    // Linux / others – try xclip then xsel
    try {
      execSync('xclip -selection clipboard', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    } catch {
      execSync('xsel --clipboard --input', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
  } catch {
    return false;
  }
}

function getArgValue(args, flags) {
  for (const flag of flags) {
    const idx = args.indexOf(flag);
    if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) {
      return args[idx + 1];
    }
  }
  // also support --commits=10 style
  for (const flag of flags) {
    const found = args.find(a => a.startsWith(flag + '='));
    if (found) return found.split('=')[1];
  }
  return null;
}

function runCLI(args) {
  const includeDiff = args.includes('--diff') || args.includes('-d');
  const noMask = args.includes('--no-secret-mask');
  const copy = args.includes('--copy') || args.includes('-c');
  const jsonMode = args.includes('--json') || args.includes('-j');

  const commitsArg = getArgValue(args, ['--commits', '-n']);
  const commitCount = commitsArg ? parseInt(commitsArg, 10) : 3;

  const rawContext = getRepoContext(includeDiff, commitCount);

  let output;
  if (jsonMode) {
    output = JSON.stringify(rawContext, null, 2);
  } else {
    output = formatMarkdown(rawContext, !noMask);
  }

  console.log(output);

  if (copy) {
    const ok = copyToClipboard(output);
    if (ok) {
      console.error('\n✂️  Copied to clipboard');
    } else {
      console.error('\n⚠️  Could not copy to clipboard (install xclip/xsel on Linux)');
    }
  }
}

module.exports = { runCLI };
