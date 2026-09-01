const { execSync } = require('child_process');

class GitService {
  constructor(repoPath = process.cwd()) {
    this.repoPath = repoPath;
  }

  run(command) {
    return execSync(command, {
      cwd: this.repoPath,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  }

  getBranch() {
    try {
      return this.run('git branch --show-current') || 'detached HEAD';
    } catch (error) {
      return 'detached HEAD';
    }
  }

  getStatus() {
    try {
      return this.run('git status --short');
    } catch (error) {
      return 'Unable to fetch git status.';
    }
  }

  getDiff() {
    try {
      return this.run('git diff');
    } catch (error) {
      return 'No diff available.';
    }
  }

  getRecentCommits(limit = 5) {
    try {
      const output = this.run(`git log -${limit} --pretty=format:%h|%an|%s`);
      if (!output) {
        return [];
      }

      return output.split('\n').map((line) => {
        const [hash, author, ...messageParts] = line.split('|');
        return {
          hash,
          author,
          message: messageParts.join('|'),
        };
      });
    } catch (error) {
      return [];
    }
  }
}

module.exports = {
  GitService,
};
