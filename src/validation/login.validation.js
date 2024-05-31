const { body } = require('express-validator');

const loginValidation = [
  // Validate username
  body('username').isString().notEmpty(),
  // Validate password
  body('password').isString().notEmpty().isLength({ min: 8, max: 32 }),
];
module.exports = {
  loginValidation,
};
