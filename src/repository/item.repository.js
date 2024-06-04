const ItemModel = require('../models/item.model');
const BaseRepository = require('./base');

class ItemRepository extends BaseRepository {
  constructor() {
    super();
    this.repository = ItemModel;
  }
}
module.exports = ItemRepository;
