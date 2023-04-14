const { isNotEmpty, isString, isInt } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class DiscountDTO {
  constructor(userId, discountName, discountValue, discountNote) {
    this.userId = userId;
    this.discountId = uuidv4();
    this.discountName = discountName;
    this.discountValue = discountValue;
    this.discountNote = discountNote;
  }

  toSQL() {
    return {
      discount_id: this.discountId,
      user_id: this.userId,
      discount_name: this.discountName,
      discount_value: this.discountValue,
      discount_note: this.discountNote,
    };
  }

  async validate() {
    if (!isNotEmpty(this.discountId))
      throw new HttpError("麻煩提供 discountId", 409);
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.discountName))
      throw new HttpError("麻煩提供 discountName", 409);
    if (!isString(this.discountName))
      throw new HttpError("discountName 需為字串", 409);
    if (!isNotEmpty(this.discountValue))
      throw new HttpError("麻煩提供 discountValue", 409);
    if (!isInt(this.discountValue))
      throw new HttpError("discountValue 需為整數", 409);
  }
}

module.exports = { DiscountDTO };
