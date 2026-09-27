import { getStatus } from '../lib/git.js';

export function statusCommand() {
  console.log(getStatus());
}
