const chalk = require('chalk');
const ora = require('ora');

const logger = {
  info(message) {
    console.log(chalk.cyan(message));
  },
  success(message) {
    console.log(chalk.green.bold(`✔ ${message}`));
  },
  warn(message) {
    console.log(chalk.yellow.bold(`⚠ ${message}`));
  },
  error(message) {
    console.error(chalk.red.bold(`✖ ${message}`));
  },
  spinner(text) {
    return ora({ text, color: 'cyan' }).start();
  },
};

module.exports = {
  logger,
  chalk,
};
