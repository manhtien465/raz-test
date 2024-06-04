class BaseRepository {
  async create(data) {
    return await this.repository.create(data);
  }

  async findOneById(id) {
    return this.repository.findByPk(id);
  }

  async findOne(condition) {
    return this.repository.findOne(condition);
  }

  async findAll(options) {
    return await this.repository.find(options);
  }

  async update(entity, condition) {
    return await this.repository.update(entity, condition);
  }

  async count(condition) {
    return await this.repository.count(condition);
  }

  async destroy(condition) {
    return await this.repository.count(condition);
  }
}
module.exports = BaseRepository;
