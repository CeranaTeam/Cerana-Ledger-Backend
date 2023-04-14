const { isNotEmpty, isString } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class TypeDTO {
  constructor(userId, typeName) {
    this.userId = userId;
    this.typeId = uuidv4();
    this.typeName = typeName;
  }

  toSQL() {
    return {
      type_id: this.typeId,
      user_id: this.userId,
      type_name: this.typeName,
    };
  }

  async validate() {
    if (!isNotEmpty(this.typeId)) throw new HttpError("麻煩提供 typeId", 409);
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.typeName))
      throw new HttpError("麻煩提供 typeName", 409);
    if (!isString(this.typeName)) throw new HttpError("typeName 需為字串", 409);
  }
}

module.exports = { TypeDTO };
