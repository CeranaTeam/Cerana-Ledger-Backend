const { isNotEmpty, isString } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class TagDTO {
  constructor(userId, tagName) {
    this.userId = userId;
    this.tagId = uuidv4();
    this.tagName = tagName;
  }

  toSQL() {
    return {
      tag_id: this.tagId,
      user_id: this.userId,
      tag_name: this.tagName,
    };
  }

  async validate() {
    if (!isNotEmpty(this.tagId)) throw new HttpError("麻煩提供 tagId", 409);
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.tagName)) throw new HttpError("麻煩提供 tagName", 409);
    if (!isString(this.tagName)) throw new HttpError("tagName 需為字串", 409);
  }
}

module.exports = { TagDTO };
