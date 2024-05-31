const { ErrorMessageKey } = require('../constants/ErrorMessage');
const ErrorHandler = require('../exceptions/ErrorHandle');
const { logger } = require('../utils/logger');

const ErrorMiddleware = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errorCode = error.errorCode || ErrorMessageKey.SOME_THING_WRONG;
    const errorResponse = ErrorHandler.error(message, status, errorCode);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json(errorResponse);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  ErrorMiddleware,
};
