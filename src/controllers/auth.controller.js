const { ApiStatus } = require('../constants');
const AuthService = require('../services/auth.service');

class AuthController {
  async logIn(req, res, next) {
    try {
      const userData = req.body;
      const result = await new AuthService().login(userData);
      res.status(200).json({ data: result, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthController;
