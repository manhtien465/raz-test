const { ErrorMessageKey, ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');
const UserModel = require('../models/users.model');

class UserService {
  async findAllUser() {
    const allUser = await UserModel.findAll();
    return allUser;
  }

  async findUserById(userId) {
    const findUser = await UserModel.findByPk(userId);
    if (!findUser) throw new HttpException(400, ErrorMessage[ErrorMessageKey.USER_NOT_FOUND], ErrorMessageKey.USER_NOT_FOUND);

    return findUser;
  }

  async findUserAndRole(userId) {
    const findUser = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!findUser) throw new HttpException(400, ErrorMessage[ErrorMessageKey.USER_NOT_FOUND], ErrorMessageKey.USER_NOT_FOUND);

    return findUser;
  }
}

module.exports = UserService;
