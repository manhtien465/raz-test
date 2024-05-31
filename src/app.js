const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } = require('./config');
const { DB } = require('./database');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const passport = require('passport');
const path = require('path');
const { JwtAuthentication } = require('./passport/strategy');
const csurf = require('csurf');
const session = require('express-session');

class App {
  constructor(routes) {
    new JwtAuthentication();
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
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
    this.app.use(morgan(LOG_FORMAT));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: process.env.SECRET_KEY,
        resave: false,
        cookie: {},
        saveUninitialized: false,
      }),
    );

    // this.app.use(csurf());

    this.app.use((req, res, next) => {
      // res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });

    this.app.use(passport.initialize());
  }

  initializeRoutes(routes) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger/swagger.yaml', 'swagger/item.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

module.exports = App;
