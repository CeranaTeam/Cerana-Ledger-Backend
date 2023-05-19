const { isNotEmpty, isString, isInt } = require("../utils/validator");
const { createType } = require("../models/product");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class ProductDTO {
  constructor(userId, productType, productName, productPrice, productSpec) {
    this.productId = uuidv4();
    this.userId = userId;
    this.productType = productType;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productSpec = productSpec;
    this.productEnable = 1;
  }

  async toSQL() {
    const typeId = await createType(this.productType, this.userId);
    const result = {
      product_id: this.productId,
      user_id: this.userId,
      type_id: typeId,
      product_name: this.productName,
      product_price: this.productPrice,
      product_spec: this.productSpec,
      product_enable: this.productEnable
    };
    return result;
  }

  async validate() {
    if (!isNotEmpty(this.productId))
      throw new HttpError("麻煩提供 productId", 409);
    if (!isNotEmpty(this.userId))
      throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.productType))
      throw new HttpError("麻煩提供 productType", 409);
    if (!isString(this.productType))
      throw new HttpError("productType 需為字串", 409);
    if (!isNotEmpty(this.productName))
      throw new HttpError("麻煩提供 productName", 409);
    if (!isString(this.productName))
      throw new HttpError("productName 需為字串", 409);
    if (!isNotEmpty(this.productPrice))
      throw new HttpError("麻煩提供 productPrice", 409);
    if (!isInt(this.productPrice))
      throw new HttpError("productPrice 需為整數", 409);
    if (!isNotEmpty(this.productSpec))
      throw new HttpError("麻煩提供 productSpec", 409);
    if (!isString(this.productSpec))
      throw new HttpError("productSpec 需為字串", 409);
    if (!isNotEmpty(this.productEnable))
      throw new HttpError("麻煩提供 productEnable", 409);
    if (!isInt(this.productEnable))
      throw new HttpError("productEnable 需為整數", 409);
  }
}

module.exports = { ProductDTO };
