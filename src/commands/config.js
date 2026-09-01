const fs = require('fs');
const path = require('path');
const { configDir, configFile, defaultApiBaseUrl, defaultSecretMask } = require('../config');

function ensureConfigDir() {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
}

function defaultConfig() {
  return {
    apiUrl: defaultApiBaseUrl,
    secretMask: defaultSecretMask,
  };
}

function readConfig() {
  try {
    ensureConfigDir();
    if (!fs.existsSync(configFile)) {
      return defaultConfig();
    }

    const raw = fs.readFileSync(configFile, 'utf8');
    const parsed = JSON.parse(raw);
    return { ...defaultConfig(), ...parsed };
  } catch (error) {
    return defaultConfig();
  }
}

function saveConfig(config) {
  ensureConfigDir();
  const nextConfig = { ...defaultConfig(), ...readConfig(), ...config };
  fs.writeFileSync(configFile, JSON.stringify(nextConfig, null, 2));
  return nextConfig;
}

async function configCommand(options = {}) {
  if (options.reset) {
    saveConfig(defaultConfig());
    console.log('Configuration reset to defaults.');
    return;
  }

  if (options.apiUrl) {
    saveConfig({ apiUrl: options.apiUrl, secretMask: options.secretMask !== false });
    console.log(`API URL set to ${options.apiUrl}`);
    return;
  }

  if (options.show) {
    console.log(JSON.stringify(readConfig(), null, 2));
    return;
  }

  console.log('Use --api-url <url> to configure the backend endpoint.');
}

module.exports = {
  configCommand,
  readConfig,
  saveConfig,
  defaultConfig,
};
