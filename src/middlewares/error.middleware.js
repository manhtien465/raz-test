const { ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');
const { getKeyByValue } = require('../utils');

const ErrorMiddleware = (error, req, res, next) => {
  try {
    const status = error.code || 500;
    const message = error.message || ErrorMessage.SOME_THING_WRONG;
    const errorCode = error.errorCode || getKeyByValue(ErrorMessage.SOME_THING_WRONG);
    res.status(status).json(new HttpException(status, message, errorCode));
  } catch (error) {
    next(error);
  }
};
module.exports = {
  ErrorMiddleware,
};
