import { getStatus, getBranch, getDiff, getLastCommit } from '../lib/git.js';

export function summaryCommand() {
  const status = getStatus();
  const branch = getBranch();
  const diff = getDiff({ stat: true });
  const lastCommit = getLastCommit();

  console.log(`Branch: ${branch}`);
  console.log(`Last commit: ${lastCommit}`);
  console.log(`Status:\n${status}`);
  console.log(`Diff summary:\n${diff}`);
}
