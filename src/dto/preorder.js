const { isNotEmpty } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");


class ResPreorderFormDTO {
  constructor(storeName, products) {
    this.storeName = storeName;
    this.products = products;
  }

  toLowerCamelCase() {
    for(let i = 0; i < this.products.length; i++) {
      this.products[i].productId = this.products[i].product_id;
      this.products[i].productName = this.products[i].product_name;
      this.products[i].productPrice = this.products[i].product_price;
      this.products[i].productSpec = this.products[i].product_spec;
      this.products[i].productTypeId = this.products[i].type_id;
      this.products[i].productType = this.products[i].type_name;
      delete this.products[i].product_id;
      delete this.products[i].product_name;
      delete this.products[i].product_price;
      delete this.products[i].product_spec;
      delete this.products[i].type_name;
    }
    return {
      storeName: this.storeName,
      products: this.products
    };
  }

  async validate() {
    if (!isNotEmpty(this.products)) throw new Error("products is empty");
  }
}

class ReqPreorderDTO {
  constructor(userId, preorderForm) {
    this.preorderId = uuidv4();
    this.userId = userId;
    this.preorderContact = preorderForm.preorderContact;
    this.preorderCreateTime = preorderForm.preorderCreateTime;
    this.preorderIsPicked = 0;
    this.preorderNote = preorderForm.preorderNote;
    this.preorderPickUpTime = preorderForm.preorderPickUpTime;
    
    this.products = preorderForm.products;
  }

  toSQL(){
    let result = {};

    result.preorder = {
      preorder_id: this.preorderId,
      user_id: this.userId,
      preorder_contact: this.preorderContact,
      preorder_create_time: this.preorderCreateTime,
      preorder_is_picked: this.preorderIsPicked,
      preorder_note: this.preorderNote,
      preorder_pick_up_time: this.preorderPickUpTime,
    };

    result.products = this.products.map(product => [this.preorderId, product.productId, product.amount]);

    return result;
  }

  async validate() {
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.products)) throw new HttpError("no products", 409);
  }
}

module.exports = { ResPreorderFormDTO, ReqPreorderDTO};
