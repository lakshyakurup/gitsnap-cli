const { execSync } = require('child_process');

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
}

/**
 * Gather repository context.
 * @param {boolean} includeDiff - whether to include git diff
 * @param {number} commitCount - how many recent commits to include (default 3)
 */
function getRepoContext(includeDiff = false, commitCount = 3) {
  const n = Math.max(1, Math.min(50, parseInt(commitCount, 10) || 3));

  return {
    branch: runGit('git branch --show-current') || 'HEAD',
    status: runGit('git status --porcelain'),
    diff: includeDiff ? runGit('git diff') : '',
    commitLog: runGit(`git log -n ${n} --pretty=format:"%h - %an: %s"`)
  };
}

module.exports = { getRepoContext };
