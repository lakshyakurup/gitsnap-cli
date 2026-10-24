const { execSync } = require('child_process');

function runGitCommand(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (err) {
    return '';
  }
}

function getRepoContext(includeDiff = false) {
  const branch = runGitCommand('git branch --show-current') || 'HEAD';
  const status = runGitCommand('git status --porcelain');
  const diff = includeDiff ? runGitCommand('git diff') : '';
  const commitLog = runGitCommand('git log -n 3 --pretty=format:"%h - %an: %s"');

  return { branch, status, diff, commitLog };
}

module.exports = { getRepoContext };
