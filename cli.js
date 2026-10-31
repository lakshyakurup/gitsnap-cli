const { getRepoContext } = require('./gitService');
const { formatMarkdown } = require('./markdownFormatter');
const { execSync } = require('child_process');
const { sanitizeContext } = require('./sanitizer');

const DEFAULT_API_URL = 'http://localhost:4000/api';

function copyToClipboard(text) {
  try {
    const platform = process.platform;
    if (platform === 'darwin') {
      execSync('pbcopy', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
    if (platform === 'win32') {
      execSync('clip', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
    try {
      execSync('xclip -selection clipboard', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    } catch {
      execSync('xsel --clipboard --input', { input: text, stdio: ['pipe', 'ignore', 'ignore'] });
      return true;
    }
  } catch {
    return false;
  }
}

function parseCount(value, flag, minimum) {
  if (!/^\d+$/.test(value)) throw new Error(`${flag} requires a whole number.`);
  const count = Number(value);
  if (count < minimum || count > 50) {
    throw new Error(`${flag} must be between ${minimum} and 50.`);
  }
  return count;
}

function parseArgs(args) {
  const options = {
    includeDiff: false,
    json: false,
    upload: false,
    copy: false,
    secretMask: true,
    apiUrl: DEFAULT_API_URL,
    commitCount: 3,
    fileCount: 0
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--diff' || argument === '-d') options.includeDiff = true;
    else if (argument === '--json' || argument === '-j') options.json = true;
    else if (argument === '--upload' || argument === '-u') options.upload = true;
    else if (argument === '--copy' || argument === '-c') options.copy = true;
    else if (argument === '--secret-mask' || argument === '-m') options.secretMask = true;
    else if (argument === '--no-secret-mask') options.secretMask = false;
    else if (argument === '--api-url' || argument.startsWith('--api-url=')) {
      const value = argument === '--api-url' ? args[++index] : argument.slice('--api-url='.length);
      if (!value || value.startsWith('-')) throw new Error('--api-url requires a URL.');
      options.apiUrl = value;
    } else if (argument === '--commits' || argument === '-n' || argument.startsWith('--commits=')) {
      const value = argument === '--commits' || argument === '-n'
        ? args[++index]
        : argument.slice('--commits='.length);
      if (!value || value.startsWith('-')) throw new Error('--commits requires a number.');
      options.commitCount = parseCount(value, '--commits', 1);
    } else if (argument === '--files' || argument === '-f' || argument.startsWith('--files=')) {
      const value = argument === '--files' || argument === '-f'
        ? args[++index]
        : argument.slice('--files='.length);
      if (value === undefined || value.startsWith('-')) throw new Error('--files requires a number.');
      options.fileCount = parseCount(value, '--files', 0);
    }
  }

  return options;
}

function prepareSnapshot(context, shouldMask) {
  if (!shouldMask) return context;
  return Object.fromEntries(Object.entries(context).map(([key, value]) => [
    key,
    typeof value === 'string' ? sanitizeContext(value) : value
  ]));
}

async function uploadSnapshot(snapshot, apiUrl, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('Backend upload requires Node.js 18 or newer.');
  }

  let endpoint;
  try {
    endpoint = new URL(apiUrl);
  } catch {
    throw new Error('Invalid API URL.');
  }
  if (!['http:', 'https:'].includes(endpoint.protocol) || endpoint.search || endpoint.hash) {
    throw new Error('API URL must use HTTP or HTTPS and cannot include a query or fragment.');
  }
  endpoint.pathname = `${endpoint.pathname.replace(/\/+$/, '')}/snapshots`;

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapshot),
      signal: AbortSignal.timeout(5000)
    });
  } catch (error) {
    throw new Error(`Backend upload failed: ${error.message}`);
  }
  if (!response.ok) {
    throw new Error(`Backend upload failed: ${response.status} ${response.statusText}`.trim());
  }
}

async function runCLI(args, dependencies = {}) {
  const options = parseArgs(args);
  const getContext = dependencies.getRepoContext || getRepoContext;
  const rawContext = getContext(options.includeDiff, options.commitCount, options.fileCount);
  const snapshot = prepareSnapshot(rawContext, options.secretMask);
  const output = options.json
    ? JSON.stringify(snapshot, null, 2)
    : formatMarkdown(snapshot, false);

  if (options.upload) {
    const upload = dependencies.uploadSnapshot || uploadSnapshot;
    await upload(snapshot, options.apiUrl);
  }

  const copy = dependencies.copyToClipboard || copyToClipboard;
  const copied = options.copy ? copy(output) : false;

  return { output, uploaded: options.upload, copied, copyRequested: options.copy };
}

module.exports = { parseArgs, prepareSnapshot, runCLI, uploadSnapshot };

