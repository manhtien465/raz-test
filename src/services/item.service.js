const { HttpException } = require('../exceptions/HttpException');
const { Op } = require('sequelize');
const { ErrorMessage } = require('../constants/ErrorMessage');
const ItemRepository = require('../repository/item.repository');

class ItemService {
  async findAll(query) {
    const options = {};
    if (query.keyword) {
      options.name = { [Op.like]: `%${query.keyword}%` };
    }
    const itemCount = await new ItemRepository().count({ where: options });
    const result = await new ItemRepository().findAll({
      where: options,
      offset: ((+query.page || 1) - 1) * (+query.limit || 20),
      limit: +query.limit || 20,
    });
    return { items: result, itemCount };
  }

  async findById(id) {
    const find = await new ItemRepository().findOne({ where: { id: id } });
    if (!find) throw new HttpException(400, ErrorMessage.ITEM_NOT_FOUND);

    return find;
  }

  async create(body) {
    return new ItemRepository().create({
      ...body,
    });
  }

  async update(id, data) {
    const find = await new ItemRepository().findOne({ where: { id: id } });
    if (!find) throw new HttpException(400, ErrorMessage.ITEM_NOT_FOUND);

    await new ItemRepository().update({ ...data }, { where: { id: id } });

    const updateItem = await new ItemRepository().findByPk(id);
    return updateItem;
  }

  async delete(id) {
    const finded = await new ItemRepository().findOne({ where: { id: id } });
    if (!finded) throw new HttpException(400, ErrorMessage.ITEM_NOT_FOUND);

    await new ItemRepository().destroy({ where: { id: id } });

    return finded;
  }
}
module.exports = ItemService;
