const test = require('node:test');
const assert = require('node:assert/strict');
const { parseArgs, runCLI, uploadSnapshot } = require('./cli');

test('parses documented flags and defaults', () => {
  assert.deepEqual(parseArgs(['-d', '-j', '-u', '-m', '--api-url', 'http://localhost:5000/api']), {
    includeDiff: true,
    json: true,
    upload: true,
    copy: false,
    secretMask: true,
    apiUrl: 'http://localhost:5000/api',
    commitCount: 3,
    fileCount: 0
  });
  assert.equal(parseArgs([]).apiUrl, 'http://localhost:4000/api');
  assert.equal(parseArgs(['--no-secret-mask']).secretMask, false);
  assert.equal(parseArgs(['--commits', '12', '--files=4']).commitCount, 12);
  assert.equal(parseArgs(['--commits', '12', '--files=4']).fileCount, 4);
  assert.throws(() => parseArgs(['--api-url']), /requires a URL/);
});

test('uses the masked snapshot for JSON output and upload', async () => {
  let uploadedSnapshot;
  const result = await runCLI(['--json', '--upload'], {
    getRepoContext: () => ({ branch: 'main', status: 'API_KEY=hidden-value', diff: '', commitLog: '' }),
    uploadSnapshot: async (snapshot, apiUrl) => {
      uploadedSnapshot = snapshot;
      assert.equal(apiUrl, 'http://localhost:4000/api');
    }
  });

  assert.equal(JSON.parse(result.output).status, 'API_KEY=[REDACTED]');
  assert.deepEqual(uploadedSnapshot, JSON.parse(result.output));
  assert.equal(result.uploaded, true);
});

test('posts uploads to the snapshots endpoint', async () => {
  let request;
  await uploadSnapshot({ branch: 'main' }, 'http://localhost:4000/api/', async (url, options) => {
    request = { url: url.href, ...options };
    return { ok: true };
  });

  assert.equal(request.url, 'http://localhost:4000/api/snapshots');
  assert.equal(request.method, 'POST');
  assert.ok(request.signal);
  assert.deepEqual(JSON.parse(request.body), { branch: 'main' });
  await assert.rejects(
    uploadSnapshot({}, 'file:///tmp/api', async () => ({ ok: true })),
    /HTTP or HTTPS/
  );
});

test('copies the sanitized output when requested', async () => {
  let copiedText;
  const result = await runCLI(['--copy'], {
    getRepoContext: () => ({ branch: 'main', status: 'API_KEY=hidden-value', diff: '', commitLog: '', recentFiles: '' }),
    copyToClipboard: (text) => {
      copiedText = text;
      return true;
    }
  });

  assert.equal(result.copyRequested, true);
  assert.equal(result.copied, true);
  assert.match(copiedText, /API_KEY=\[REDACTED\]/);
});