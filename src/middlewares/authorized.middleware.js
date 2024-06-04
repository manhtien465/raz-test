const passport = require('passport');
const { ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');

function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false }, async (error, token) => {
    if (error || !token) {
      return response.status(403).json(new HttpException(403, ErrorMessage.UNAUTHORIZED, errorCode));
    }
    request.user = token;
    return next();
  })(request, response, next);
}
module.exports = authorized;
