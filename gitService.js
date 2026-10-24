const { execSync } = require('child_process');

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
}

function getRepoContext(includeDiff) {
  return {
    branch: runGit('git branch --show-current') || 'HEAD',
    status: runGit('git status --porcelain'),
    diff: includeDiff ? runGit('git diff') : '',
    commitLog: runGit('git log -n 3 --pretty=format:"%h - %an: %s"')
  };
}

module.exports = { getRepoContext };
