import fs from 'node:fs/promises';
import path from 'node:path';
import { snapshotCommand } from './snapshot.js';

export async function exportCommand(args = []) {
  const outputIndex = args.findIndex((arg) => arg.startsWith('--output='));
  const outputArg = args.findIndex((arg) => arg === '--output' || arg === '-o');

  let outputPath = '';

  if (outputIndex >= 0) {
    outputPath = args[outputIndex].split('=')[1];
  } else if (outputArg >= 0) {
    outputPath = args[outputArg + 1];
  }

  if (!outputPath) {
    console.error('Missing output path. Use --output <file.md>');
    process.exitCode = 1;
    return;
  }

  const snapshotText = snapshotCommand(args, { returnText: true });
  const target = path.resolve(process.cwd(), outputPath);

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, snapshotText, 'utf8');

  console.log(`Saved snapshot to ${target}`);
}
