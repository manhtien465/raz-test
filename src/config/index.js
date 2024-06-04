const { config } = require('dotenv');
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const CREDENTIALS = process.env.CREDENTIALS === 'true';
const { NODE_ENV, PORT, JWT_SECRET, JWT_EXPIRES_IN, LOG_FORMAT, UPLOAD_MAX_FILE_SIZE, LOG_DIR, ORIGIN } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const Env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  LOG_FORMAT: process.env.LOG_FORMAT,
  UPLOAD_MAX_FILE_SIZE: process.env.UPLOAD_MAX_FILE_SIZE,
  LOG_DIR: process.env.LOG_DIR,
  ORIGIN: process.env.ORIGIN,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
};
module.exports = {
  Env,
};
