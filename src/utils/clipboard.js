const clipboardy = require('clipboardy');

function copyToClipboard(content) {
  if (!content) {
    return false;
  }

  clipboardy.writeSync(String(content));
  return true;
}

module.exports = {
  copyToClipboard,
};
