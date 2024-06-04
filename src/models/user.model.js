const { DataTypes, Model } = require('sequelize');
const { DB } = require('../database');

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    username: {
      unique: true,
      type: DataTypes.STRING(),
      field: 'username',
    },
    password: {
      type: DataTypes.STRING(),
      field: 'password',
    },
    roleId: {
      type: DataTypes.STRING(),
      field: 'role_id',
    },
  },
  {
    timestamps: false,
    tableName: 'user',
    sequelize: DB.sequelize,
  },
);

module.exports = UserModel;
