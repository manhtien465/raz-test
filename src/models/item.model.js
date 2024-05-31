const { DataTypes, Model } = require('sequelize');
const { DB } = require('../database');

class ItemModel extends Model {}

ItemModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    name: {
      unique: true,
      type: DataTypes.STRING(),
      field: 'name',
    },
    description: {
      type: DataTypes.STRING(),
      field: 'description',
    },
    function: {
      type: DataTypes.STRING(),
      field: 'function',
    },
  },
  {
    timestamps: false,
    tableName: 'item',
    sequelize: DB.sequelize,
  },
);

module.exports = ItemModel;
