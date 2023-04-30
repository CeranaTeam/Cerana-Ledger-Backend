const { isNotEmpty } = require("../utils/validator");



class resPreorderFormDTO {
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

module.exports = { resPreorderFormDTO };
