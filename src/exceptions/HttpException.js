class HttpException extends Error {
  status;
  message;

  constructor(status, message, errorCode) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
  }
}

module.exports = {
  HttpException,
};
