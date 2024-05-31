const passport = require('passport');
const { ErrorMessage, ErrorMessageKey } = require('../constants/ErrorMessage');
const ErrorHandler = require('../exceptions/ErrorHandle');

function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false }, async (error, token) => {
    if (error || !token) {
      const errorResponse = ErrorHandler.error(ErrorMessage[ErrorMessageKey.UNAUTHORIZED], 403, ErrorMessageKey.UNAUTHORIZED);
      return response.status(403).json(errorResponse);
    }
    request.user = token;
    return next();
  })(request, response, next);
}
module.exports = authorized;
