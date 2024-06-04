const { validationResult } = require('express-validator');
const { ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = errors.array()[0];
    next(new HttpException(400, `Field: ${error.path} - ${error.msg}`, getKeyByValue(ErrorMessage.VALIDATION_ERROR)));
  }
  return next();
};

module.exports = { validateInput };
