const { ApiStatus } = require('../constants');
const ItemService = require('../services/item.service');

class ItemController {
  list = async (req, res, next) => {
    try {
      const findAll = await new ItemService().findAll(req.query);
      res.status(200).json({ data: findAll, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await new ItemService().findById(id);

      res.status(200).json({ data: { item: result }, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const result = await new ItemService().create(data);

      res.status(201).json({ data: { item: result }, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await new ItemService().update(id, data);

      res.status(200).json({ data: { item: result }, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await new ItemService().delete(id);

      res.status(200).json({ data: { item: result }, code: 200, status: ApiStatus.SUCCESS });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ItemController;
