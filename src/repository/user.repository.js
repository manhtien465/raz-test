const UserModel = require('../models/user.model');
const BaseRepository = require('./base');

class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.repository = UserModel;
  }
}
module.exports = UserRepository;
