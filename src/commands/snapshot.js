import {
  getStatus,
  getBranch,
  getRemote,
  getDiff,
  getLastCommit,
  getUntrackedFiles
} from '../lib/git.js';

import { getRepoContext } from '../lib/context.js';
import { defaultTemplate } from '../templates/default.js';
import { aiTemplate } from '../templates/ai.js';
import { jsonTemplate } from '../templates/json.js';
import { compactTemplate } from '../templates/compact.js';

export function snapshotCommand(args = [], options = {}) {
  const includeDiff = !args.includes('--no-diff');
  const includeContext = !args.includes('--no-context');
  const useAiTemplate = args.includes('--ai');
  const useJson = args.includes('--json');
  const useCompact = args.includes('--compact');

  const context = getRepoContext();

  const snapshot = {
    repoName: context.repoName,
    repoPath: context.repoPath,
    description: context.description,
    branch: getBranch(),
    remote: getRemote(),
    lastCommit: getLastCommit(),
    status: getStatus(),
    untrackedFiles: getUntrackedFiles(),
    diff: includeContext && includeDiff ? getDiff({ stat: false }) : ''
  };

  const text = useJson
    ? jsonTemplate(snapshot)
    : useCompact
      ? compactTemplate(snapshot)
      : useAiTemplate
        ? aiTemplate(snapshot)
        : defaultTemplate(snapshot);

  if (options.returnText) {
    return text;
  }

  console.log(text);
  return text;
}
