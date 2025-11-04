const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function getEnvVar(name, defaultValue = undefined, required = false) {
  const val = process.env[name];
  if (!val) {
    if (required && defaultValue === undefined) {
      throw new Error(`Missing required environment variable ${name}`);
    }
    return defaultValue;
  }
  return val;
}

const config = {
  env: getEnvVar('NODE_ENV', 'development'),

  server: {
    port: parseInt(getEnvVar('PORT', '3000'), 10),
  },

  logging: {
    level: getEnvVar('LOG_LEVEL', 'info'),
  },

  jwt: {
    secret: getEnvVar('JWT_SECRET', '', true),
    expiresIn: getEnvVar('JWT_EXPIRES_IN', '1h'),
  },

  database: {
    username: getEnvVar('DB_USER', 'root'),
    password: getEnvVar('DB_PASS', ''),
    database: getEnvVar('DB_NAME', 'users_db'),
    host: getEnvVar('DB_HOST', 'localhost'),
    port: parseInt(getEnvVar('DB_PORT', '3306'), 10),
    dialect: 'mysql',
    logging: false,
  },
};

module.exports = config;