import { getDiff } from '../lib/git.js';

export function diffCommand(args = []) {
  const statOnly = args.includes('--stat');
  console.log(getDiff({ stat: statOnly }));
}
