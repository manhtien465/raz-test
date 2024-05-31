const { Router } = require('express');
const { loginValidation } = require('../validation/login.validation');
const AuthController = require('../controllers/auth.controller');
const { validateInput } = require('../middlewares/validation.middleware');

class AuthRoute {
  constructor() {
    this.router = Router();
    this.auth = new AuthController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/login', loginValidation, validateInput, this.auth.logIn);
  }
}

module.exports = AuthRoute;
