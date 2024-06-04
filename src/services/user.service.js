const { ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');
const UserRepository = require('../repository/user.repository');

class UserService {
  async findAllUser() {
    const allUser = await new UserRepository().findAll();
    return allUser;
  }

  async findUserById(userId) {
    const findUser = await new UserRepository().findByPk(userId);
    if (!findUser) throw new HttpException(400, ErrorMessage.USER_NOT_FOUND);

    return findUser;
  }

  async findUserAndRole(userId) {
    const findUser = await new UserRepository().findOne({
      where: {
        id: userId,
      },
    });
    if (!findUser) throw new HttpException(400, ErrorMessage.USER_NOT_FOUND);

    return findUser;
  }
}

module.exports = UserService;
