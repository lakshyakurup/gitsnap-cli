export const ENV = {
  APP_NAME: process.env.APP_NAME || 'gitsnap-cli',
  APP_VERSION: '0.1.0',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEBUG: process.env.DEBUG === 'true'
};
