class PageMetaDto {
  constructor({ itemCount }) {
    this.skip = +pageOptionsDto.skip || 0;
    this.limit = +pageOptionsDto.limit || 20;
    this.count = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
  }
}

module.exports = PageMetaDto;
