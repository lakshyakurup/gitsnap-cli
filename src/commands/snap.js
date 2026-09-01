const { GitService } = require('../services/gitService');
const { ProcessService } = require('../services/processService');
const { markdownFormatter } = require('../formatters/markdownFormatter');
const { jsonFormatter } = require('../formatters/jsonFormatter');
const { sanitizeText } = require('../security/sanitizer');
const { copyToClipboard } = require('../utils/clipboard');
const { logger } = require('../utils/logger');
const { uploadSnapshot } = require('../api/client');
const { readConfig } = require('./config');

async function runSnapshot(options = {}) {
  const config = readConfig();
  const resolved = { ...config, ...options };
  const processService = new ProcessService(resolved.repo || process.cwd());

  const repoInfo = processService.getRepositoryContext();
  if (!repoInfo.isRepository) {
    throw new Error('This directory is not a valid git repository.');
  }

  const gitService = new GitService(repoInfo.rootPath || process.cwd());
  const branch = gitService.getBranch();
  const status = gitService.getStatus();
  const diff = resolved.diff !== false ? gitService.getDiff() : '';
  const commitLog = gitService.getRecentCommits(5);

  const payload = {
    repo: repoInfo.rootPath || process.cwd(),
    branch,
    status,
    diff,
    commitLog,
    generatedAt: new Date().toISOString(),
  };

  const markdown = markdownFormatter(payload, { secretMask: resolved.secretMask !== false });
  const json = jsonFormatter(payload, { secretMask: resolved.secretMask !== false });

  const sanitized = resolved.secretMask === false ? payload : {
    ...payload,
    status: sanitizeText(payload.status),
    diff: sanitizeText(payload.diff),
    commitLog: payload.commitLog.map((item) => ({ ...item, message: sanitizeText(item.message) })),
  };

  const output = resolved.json ? json : markdown;

  try {
    copyToClipboard(output);
    logger.success('Git snapshot copied to clipboard.');
  } catch (error) {
    logger.warn('Clipboard copy unavailable in this environment.');
  }

  let uploadResult = null;
  if (resolved.upload) {
    uploadResult = await uploadSnapshot({
      repo: sanitized.repo,
      branch: sanitized.branch,
      status: sanitizeText(sanitized.status),
      diff: sanitizeText(sanitized.diff),
      commitLog: sanitized.commitLog,
      generatedAt: sanitized.generatedAt,
    }, {
      apiUrl: resolved.apiUrl || config.apiUrl || 'http://localhost:4000/api',
    });
  }

  return {
    branch,
    status: sanitized.status,
    diff: sanitized.diff,
    markdown,
    json,
    repo: sanitized.repo,
    output,
    uploaded: Boolean(uploadResult),
    uploadResult,
  };
}

module.exports = {
  runSnapshot,
};
