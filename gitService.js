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
 * @param {number} fileCount - how many recent files to list (0 = disabled)
 */
function getRepoContext(includeDiff = false, commitCount = 3, fileCount = 0) {
  const nCommits = Math.max(1, Math.min(50, parseInt(commitCount, 10) || 3));
  const nFiles = Math.max(0, Math.min(50, parseInt(fileCount, 10) || 0));

  let recentFiles = '';
  if (nFiles > 0) {
    // Get unique files changed in the last N commits, limited to nFiles
    const raw = runGit(`git log -n ${Math.max(nCommits, nFiles)} --name-only --pretty=format:`);
    const files = [...new Set(raw.split('\n').map(f => f.trim()).filter(Boolean))];
    recentFiles = files.slice(0, nFiles).join('\n');
  }

  return {
    branch: runGit('git branch --show-current') || 'HEAD',
    status: runGit('git status --porcelain'),
    diff: includeDiff ? runGit('git diff') : '',
    commitLog: runGit(`git log -n ${nCommits} --pretty=format:"%h - %an: %s"`),
    recentFiles
  };
}

module.exports = { getRepoContext };
