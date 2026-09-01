const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProcessService {
  constructor(repoPath = process.cwd()) {
    this.repoPath = repoPath;
  }

  isGitInstalled() {
    try {
      execSync('git --version', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  getRepositoryContext() {
    const targetPath = path.resolve(this.repoPath);

    if (!fs.existsSync(targetPath)) {
      return { isRepository: false, rootPath: null, error: 'Target path does not exist.' };
    }

    if (!this.isGitInstalled()) {
      return { isRepository: false, rootPath: targetPath, error: 'Git is not installed or not on PATH.' };
    }

    try {
      const rootPath = execSync(`git -C "${targetPath}" rev-parse --show-toplevel`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();

      return {
        isRepository: Boolean(rootPath),
        rootPath,
        error: null,
      };
    } catch (error) {
      return {
        isRepository: false,
        rootPath: targetPath,
        error: error.message,
      };
    }
  }
}

module.exports = {
  ProcessService,
};
