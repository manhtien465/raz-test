const { body } = require('express-validator');

const createItemValidation = [
  body('name').isString().notEmpty(),

  body('description').isString().optional().isLength({ min: 1, max: 500 }),

  body('function').isString().optional().isLength({ min: 1, max: 500 }),
];
const updateItemValidation = [
  body('name').isString().optional().notEmpty(),

  body('description').isString().optional().isLength({ min: 1, max: 500 }),

  body('function').isString().optional().isLength({ min: 1, max: 500 }),
];
module.exports = {
  createItemValidation,
  updateItemValidation,
};
