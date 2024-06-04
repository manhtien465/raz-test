const { config } = require('dotenv');
const { Env } = require('.');
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const SequelizeCli = {
  username: Env.DB_USER,
  password: Env.DB_PASSWORD,
  database: Env.DB_DATABASE,
  port: Env.DB_PORT,
  host: Env.DB_HOST,
  dialect: 'mariadb',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorageTableName: 'sequelize_seeds',
};
module.exports = {
  SequelizeCli,
};
