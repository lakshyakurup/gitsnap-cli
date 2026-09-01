#!/usr/bin/env node

const { Command } = require('commander');
const { runSnapshot } = require('./commands/snap');
const { configCommand, readConfig } = require('./commands/config');
const logger = require('./utils/logger');

const program = new Command();

program
  .name('gitsnap')
  .description('Generate a sanitized Git snapshot for AI prompts and optional backend sync.')
  .version('1.0.0');

program
  .option('-d, --diff', 'Include diff output in the generated snapshot')
  .option('-j, --json', 'Output the snapshot in JSON format instead of Markdown')
  .option('-u, --upload', 'Upload the generated snapshot to the configured backend API')
  .option('-m, --secret-mask', 'Mask sensitive values before formatting (enabled by default)')
  .option('--no-secret-mask', 'Disable secret masking')
  .option('--api-url <url>', 'Override the backend API URL used for uploads')
  .option('--repo <path>', 'Target a specific git repository path')
  .action(async (options) => {
    try {
      const config = readConfig();
      const resolvedOptions = {
        ...config,
        ...options,
      };

      const result = await runSnapshot(resolvedOptions);

      if (resolvedOptions.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log(result.markdown || result.output || '');
      }

      if (resolvedOptions.upload && result.uploaded) {
        logger.success('Snapshot uploaded successfully.');
      }
    } catch (error) {
      logger.error(error.message || 'Failed to generate snapshot.');
      process.exitCode = 1;
    }
  });

program
  .command('config')
  .description('Manage local gitsnap configuration')
  .option('--api-url <url>', 'Set the backend API URL')
  .option('--show', 'Display the current config values')
  .option('--reset', 'Reset configuration to defaults')
  .action(async (options) => {
    await configCommand(options);
  });

program.parse(process.argv);
