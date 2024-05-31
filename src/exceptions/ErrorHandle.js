const { ApiStatus } = require('../constants');

class ErrorHandler {
  static error(message, code, errorCode) {
    return {
      status: ApiStatus.ERROR,
      errorCode: errorCode || '',
      message: message,
      code: code,
    };
  }
}

module.exports = ErrorHandler;
