const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const { Env } = require('./config');
const { DB } = require('./database');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const passport = require('passport');
const path = require('path');
const { JwtAuthentication } = require('./passport/strategy');

class App {
  constructor(routes) {
    new JwtAuthentication();
    this.app = express();
    this.env = Env.NODE_ENV || 'development';
    this.port = Env.PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  getServer() {
    return this.app;
  }

  async connectToDatabase() {
    await DB.sequelize.sync({ force: false });
  }
  async connectToRedis() {
    await DB.sequelize.sync({ force: false });
  }

  initializeMiddlewares() {
    this.app.use(express.static(path.join(__dirname, '../media')));
    this.app.use(cors({ origin: Env.ORIGIN, credentials: Env.CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(passport.initialize());
  }

  initializeRoutes(routes) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

module.exports = App;
