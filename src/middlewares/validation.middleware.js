const { validationResult } = require('express-validator');
const ErrorHandler = require('../exceptions/ErrorHandle');
const { ErrorMessageKey } = require('../constants/ErrorMessage');

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = errors.array()[0];
    const errorResponse = ErrorHandler.error(`Field: ${error.path} - ${error.msg}`, 400, ErrorMessageKey.VALIDATION_ERROR);

    return res.status(400).json(errorResponse);
  }
  return next();
};

module.exports = { validateInput };
