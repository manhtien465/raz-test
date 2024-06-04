const Sequelize = require('sequelize');

const { Env, NODE_ENV, DB_HOST, DB_PORT } = require('../config');

const sequelize = new Sequelize.Sequelize(Env.DB_DATABASE, Env.DB_USER, Env.DB_PASSWORD, {
  dialect: 'mariadb',
  host: DB_HOST,
  port: +DB_PORT,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  sync: {
    alter: false,
  },
  logQueryParameters: NODE_ENV === 'development',
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
module.exports = {
  DB,
};
