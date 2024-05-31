const { ErrorMessageKey, ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');

function checkPermission(user, permission) {
  const check = user.roleId === permission;
  return check;
}

const AuthMiddleware = permission => (req, res, next) => {
  try {
    const check = checkPermission(req.user, permission);
    if (check) {
      next();
    } else {
      next(new HttpException(400, ErrorMessage[ErrorMessageKey.UNAUTHORIZED], ErrorMessageKey.UNAUTHORIZED));
    }
  } catch (error) {}
};
module.exports = {
  AuthMiddleware,
};
