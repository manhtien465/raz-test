const { sign } = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../config');
const { HttpException } = require('../exceptions/HttpException');
const ms = require('ms');
const { ErrorMessage } = require('../constants/ErrorMessage');
const UserRepository = require('../repository/user.repository');

const createToken = user => {
  const dataStoredInToken = {
    id: user.id,
    username: user.username,
    roleId: user.roleId,
  };
  const expiresIn = Date.now() + ms(JWT_EXPIRES_IN);

  const token = sign(dataStoredInToken, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { expiresIn, token: token };
};

class AuthService {
  async login(userData) {
    const findUser = await new UserRepository().findOne({ where: { username: userData.username } });

    if (!findUser) throw new HttpException(401, ErrorMessage.INCORRECT_LOGIN);
    const isPasswordMatching = userData.password === findUser.password;
    if (!isPasswordMatching) throw new HttpException(401, ErrorMessage.INCORRECT_LOGIN);

    const { token, expiresIn } = await createToken(findUser);
    return {
      user: findUser,
      accessToken: token,
      tokenExpires: expiresIn,
    };
  }
}

module.exports = AuthService;
