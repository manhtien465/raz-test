const passport = require('passport');
const passportJWT = require('passport-jwt');
const { JWT_SECRET } = require('../config');
const UserService = require('../services/users.service');
const { ErrorMessageKey, ErrorMessage } = require('../constants/ErrorMessage');
const { HttpException } = require('../exceptions/HttpException');

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

class JwtAuthentication {
  constructor() {
    this.jwtOptions = {
      jwtFromRequest: this.headerExtractor,
      secretOrKey: JWT_SECRET,
    };

    const strategy = new JwtStrategy(this.jwtOptions, async (jwt_payload, next) => {
      const user = await this.getUser(jwt_payload.id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
    passport.use(strategy);
  }

  headerExtractor = function (req) {
    var token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new HttpException(403, ErrorMessage[ErrorMessageKey.UNAUTHORIZED], ErrorMessageKey.UNAUTHORIZED);
    }
    return token;
  };

  async getUser(id) {
    const user = await new UserService().findUserAndRole(id);

    if (!user) {
      throw new HttpException(403, ErrorMessage[ErrorMessageKey.UNAUTHORIZED], ErrorMessageKey.UNAUTHORIZED);
    }
    return user;
  }
}

module.exports = { JwtAuthentication };
