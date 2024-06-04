const { ApiStatus } = require('../constants');
const { getKeyByValue } = require('../utils');

class HttpException extends Error {
  status;
  message;

  constructor(status, message, errorCode) {
    super(message);
    this.code = status;
    this.status = ApiStatus.ERROR;
    this.message = message;
    this.errorCode = errorCode || getKeyByValue(message);
  }
}

module.exports = {
  HttpException,
};
