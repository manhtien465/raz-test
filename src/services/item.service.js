const { HttpException } = require('../exceptions/HttpException');
const { Op } = require('sequelize');
const { ErrorMessage, ErrorMessageKey } = require('../constants/ErrorMessage');
const ItemModel = require('../models/item.model');

class ItemService {
  async findAll(query) {
    const options = {};
    if (query.keyword) {
      options.name = { [Op.like]: `%${query.keyword}%` };
    }
    const itemCount = await ItemModel.count({ where: options });
    const result = await ItemModel.findAll({
      where: options,
      offset: ((+query.page || 1) - 1) * (+query.limit || 20),
      limit: +query.limit || 20,
    });
    return { items: result, itemCount };
  }

  async findById(id) {
    const find = await ItemModel.findOne({ where: { id: id } });
    if (!find) throw new HttpException(400, ErrorMessage[ErrorMessageKey.ITEM_NOT_FOUND], ErrorMessageKey.ITEM_NOT_FOUND);

    return find;
  }

  async create(body) {
    const createData = await ItemModel.create({
      ...body,
    });
    return createData;
  }

  async update(id, data) {
    const find = await ItemModel.findOne({ where: { id: id } });
    if (!find) throw new HttpException(400, ErrorMessage[ErrorMessageKey.EMPLOYEE_KPI_NOT_FOUND], ErrorMessageKey.EMPLOYEE_KPI_NOT_FOUND);

    await ItemModel.update({ ...data }, { where: { id: id } });

    const updateItem = await EmpKpiModel.findByPk(id);
    return updateItem;
  }

  async delete(id) {
    const finded = await ItemModel.findOne({ where: { id: id } });
    if (!finded) throw new HttpException(400, ErrorMessage[ErrorMessageKey.EMPLOYEE_KPI_NOT_FOUND], ErrorMessageKey.EMPLOYEE_KPI_NOT_FOUND);

    await ItemModel.destroy({ where: { id: id } });

    return finded;
  }
}
module.exports = ItemService;
