import { runGit } from '../lib/git.js';

export function commitCommand(args = []) {
  const message = args.join(' ') || 'chore: update repo snapshot';

  const stageResult = runGit(['add', '.']);

  if (!stageResult) {
    console.log('No files to stage.');
    return;
  }

  const commitResult = runGit(['commit', '-m', message]);

  if (commitResult) {
    console.log(commitResult);
  } else {
    console.log('Nothing to commit.');
  }
}
