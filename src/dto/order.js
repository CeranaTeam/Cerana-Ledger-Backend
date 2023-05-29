const { isNotEmpty } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class OrderDTO{
  constructor(userId, timestamp, staffId, totalPrice, orderNote, orderDiscount) {
    this.userId = userId;
    this.orderId = uuidv4();
    this.timestamp = timestamp;
    this.staffId = staffId;
    this.totalPrice = totalPrice;
    this.orderNote = orderNote;
    this.orderDiscount = orderDiscount;
  }
    
  toSQL() {
    return {
      order_id: this.orderId,
      user_id: this.userId,
      staff_id: this.staffId,
      order_discount: this.orderDiscount,
      order_note: this.orderNote,
      order_create_time: this.timestamp,
      order_total_price: this.totalPrice,
    };
  }
    
  async validate() {
    if (!isNotEmpty(this.orderId))
      throw new HttpError("麻煩提供 orderId", 409);
    if (!isNotEmpty(this.userId)) 
      throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.totalPrice))
      throw new HttpError("麻煩提供 totalPrice", 409);
  }
}

class Order_tagDTO {
  constructor(ordeId, tagId) {
    this.orderId = ordeId;
    this.tagId = tagId;
  }

  toSQL() {
    return {
      order_id: this.orderId,
      tag_id: this.tagId
    };
  }

}

class Order_productDTO {
  constructor(ordeId, productId, amount) {
    this.orderId = ordeId,
    this.productId = productId,
    this.amount = amount;
  }

  toSQL() {
    return {
      order_id: this.orderId,
      product_id: this.productId,
      op_amount: this.amount
    };
  }
}

class Order_discountDTO {
  constructor(ordeId, discountId) {
    this.orderId = ordeId;
    this.discountId = discountId;
  }

  toSQL() {
    return {
      order_id: this.orderId,
      discount_id: this.discountId
    };
  }

}
module.exports = { OrderDTO, Order_tagDTO, Order_productDTO, Order_discountDTO };