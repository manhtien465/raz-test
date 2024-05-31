const { config } = require('dotenv');
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const CREDENTIALS = process.env.CREDENTIALS === 'true';
const { NODE_ENV, PORT, JWT_SECRET, JWT_EXPIRES_IN, LOG_FORMAT, UPLOAD_MAX_FILE_SIZE, LOG_DIR, ORIGIN } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
module.exports = {
  CREDENTIALS,
  NODE_ENV,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  LOG_FORMAT,
  UPLOAD_MAX_FILE_SIZE,
  LOG_DIR,
  ORIGIN,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
};
