import { getBranch } from '../lib/git.js';

export function branchCommand() {
  console.log(getBranch());
}
