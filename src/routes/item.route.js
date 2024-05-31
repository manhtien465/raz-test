const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { validateInput } = require('../middlewares/validation.middleware');
const authorized = require('../middlewares/authorized.middleware');
const ItemController = require('../controllers/item.controller');
const { Roles } = require('../constants');
const { createItemValidation, updateItemValidation } = require('../validation/item.validation');

class ItemRoute {
  constructor() {
    this.path = '/item';
    this.router = Router();
    this.item = new ItemController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, authorized, AuthMiddleware(Roles.USER), this.item.list);
    this.router.get(`${this.path}/:id`, authorized, AuthMiddleware(Roles.USER), this.item.getById);
    this.router.post(
      `${this.path}`,
      createItemValidation,
      validateInput,
      authorized,
      AuthMiddleware(Roles.USER),

      this.item.create,
    );
    this.router.put(`${this.path}/:id`, updateItemValidation, validateInput, authorized, AuthMiddleware(Roles.USER), this.item.update);
    this.router.delete(`${this.path}/:id`, authorized, AuthMiddleware(Roles.USER), this.item.delete);
  }
}
module.exports = ItemRoute;
