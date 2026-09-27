import { snapshotCommand } from '../commands/snapshot.js';
import { statusCommand } from '../commands/status.js';
import { diffCommand } from '../commands/diff.js';
import { exportCommand } from '../commands/export.js';
import { commitCommand } from '../commands/commit.js';
import { branchCommand } from '../commands/branch.js';
import { summaryCommand } from '../commands/summary.js';
import { helpCommand } from '../commands/help.js';
import { versionCommand } from '../commands/version.js';

export function runCli(args = []) {
  const [command = 'snapshot', ...rest] = args;

  switch (command) {
    case 'snapshot':
    case 'snap':
      return snapshotCommand(rest);
    case 'status':
      return statusCommand(rest);
    case 'diff':
      return diffCommand(rest);
    case 'export':
      return exportCommand(rest);
    case 'commit':
      return commitCommand(rest);
    case 'branch':
      return branchCommand();
    case 'summary':
      return summaryCommand();
    case 'version':
    case '--version':
      return versionCommand();
    case 'help':
    case '--help':
    case '-h':
      return helpCommand();
    default:
      console.error(`Unknown command: ${command}`);
      helpCommand();
      process.exitCode = 1;
  }
}
