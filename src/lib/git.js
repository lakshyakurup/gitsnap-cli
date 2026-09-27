import { execSync } from 'node:child_process';

export function runGit(args = []) {
  try {
    return execSync(`git ${args.join(' ')}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'stdout']
    }).trim();
  } catch {
    return '';
  }
}

export function getStatus() {
  return runGit(['status', '--short', '--branch']) || 'No git changes found.';
}

export function getBranch() {
  return runGit(['branch', '--show-current']) || 'main';
}

export function getRemote() {
  return runGit(['remote', '-v']) || 'No remote configured.';
}

export function getDiff({ cached = false, stat = false } = {}) {
  const args = ['diff'];
  if (cached) args.push('--cached');
  if (stat) args.push('--stat');
  return runGit(args) || 'No diff output.';
}

export function getUntrackedFiles() {
  return runGit(['ls-files', '--others', '--exclude-standard']) || 'None';
}

export function getLastCommit() {
  return runGit(['log', '-1', '--oneline']) || 'No commits yet.';
}
