const os = require('os');
const path = require('path');

module.exports = {
  configDir: path.join(os.homedir(), '.gitsnap-cli'),
  configFile: path.join(os.homedir(), '.gitsnap-cli', 'config.json'),
  storageFile: path.join(os.homedir(), '.gitsnap-cli', 'snapshots.json'),
  defaultApiBaseUrl: 'http://localhost:4000/api',
  defaultSecretMask: true,
};
