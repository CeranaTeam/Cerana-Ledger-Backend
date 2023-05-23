const { plainToClass } = require("class-transformer");
const orderModel = require("../models/order");
const discountModel = require("../models/discount");
const tagModel = require("../models/tag");
const productModel = require("../models/product");
const staffModel = require("../models/staff");
const { OrderDTO, Order_discountDTO, Order_productDTO, Order_tagDTO } = require("../dto/order");
const { TagDTO } = require("../dto/tag");

const getOrderList = async (req, res) => {
  const { userId } = req.middleware;
  try {
    const rows = await orderModel.getAll(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到任何訂單" });
      return;
    }
    const orders = [];
    for (const row of rows) {
      const productlist = [];
      const products = await orderModel.getOrderproduct(row.order_id);
      for (const product of products) {
        productlist.push({
          productId: product.product_id,
          productPrice: product.product_price,
          productName: product.product_name,
          amount: product.op_amount,
        });
      }
      const taglist = [];
      const tags = await orderModel.getOrdertag(row.order_id);
      for (const tag of tags) {
        taglist.push(tag.tag_name);
      }
      const discountlist = [];
      const discounts = await orderModel.getOrderdiscount(row.order_id);
      for (const discount of discounts) {
        discountlist.push({
          discountId: discount.discount_id,
          discountName: discount.discount_name,
          discountValue: discount.discount_value,
          discountNote: discount.discount_note
        });
      }
      const order = {
        orderId: row.order_id,
        productList: productlist,
        tagList: taglist,
        timestamp: row.order_create_time,
        staffName: row.staff_name,
        discountList: discountlist,
        totalPrice: row.order_total_price,
        orderNote: row.order_note,
      };
      orders.push(order);
    }
    res.status(200).json({ orderList: orders });
  } catch (err) {
    console.error("\n********** Get Order List Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }    
};
const createOrder = async (req,res) => {
  const { userId } = req.middleware;
  const { productList, tagList, staffName, discountList, orderNote} = req.body;
  try {
    const staffIsExist = await staffModel.isExist(userId, null, staffName);
    if(!staffIsExist){
      res.status(409).json({ message: "員工不存在" });
      return;
    }
    const staffId = await staffModel.getStaffIdByName(userId, staffName);

    let totalPrice = 0; 
    for (const product of productList) {   
      const productIsExist = await productModel.isExistById(product.productId, userId);
      if (!productIsExist) {
        res.status(409).json({ message: "訂單中商品不存在" });
        return;
      }
      else{
        totalPrice += product.productPrice*product.amount;
      }
    }
    console.log(totalPrice);

    let orderDiscount = 0;
    for (const discount of discountList) {
      const discountIsExist = await discountModel.isExist(userId,discount.discountId,discount.discountName);
      if (!discountIsExist) {
        res.status(409).json({ message: "訂單中折扣不存在" });
        return;
      }
      else{
        orderDiscount += discount.discountValue;
      }
    }

    for (const tag of tagList) {
      const tagIsExist = await tagModel.isExist(userId,null,tag);
      //create new tag
      if(!tagIsExist) {
        const newtag = {
          userId: userId,
          tagName: tag,
        };
        const tagDTO = plainToClass(TagDTO, newtag);
        await tagDTO.validate();
        const tagSQL = tagDTO.toSQL();
        const result = await tagModel.create(tagSQL);
        if (result.affectedRows === 1) {
          res.status(200).json({ message: "成功新增標籤" });
        } else {
          res.status(409).json({ message: "新增標籤失敗" });
        }
      }
    }
    //create order
    const order = {
      userId: userId,
      timestamp: new Date(),
      staffId: staffId,
      totalPrice: totalPrice,
      orderNote: orderNote,
      orderDiscount: orderDiscount
    };
    const orderDTO = plainToClass(OrderDTO, order);
    await orderDTO.validate();
    const orderSQL = await orderDTO.toSQL();
    const result = await orderModel.create(orderSQL);
    console.log(result);
    const orderId = result.orderId;
    if (result.result.affectedRows === 0){
      res.status(409).json({ message: "新增訂單失敗" });
    }
    //create order_product
    for (const product of productList) {   
      const order_product={
        orderId: orderId,
        productId: product.productId,
        amount: product.amount
      };
      const orderproductDTO = plainToClass(Order_productDTO, order_product);
      const orderproductSQL = await orderproductDTO.toSQL();
      await orderModel.createOrderproduct(orderproductSQL);
    }
    //create order_dicount
    for (const discount of discountList) {
      const order_discount={
        orderId: orderId,
        discountId: discount.discountId,
      };
      const orderdiscountDTO = plainToClass(Order_discountDTO, order_discount);
      const orderdiscountSQL = await orderdiscountDTO.toSQL();
      await orderModel.createOrderdiscount(orderdiscountSQL);
    }
    //create order_tag
    for (const tag of tagList) {
      const tagId = await tagModel.getTagIdByName(tag);
      const order_tag={
        orderId: orderId,
        tagId: tagId[0].tag_id,
      };
      const ordertagDTO = plainToClass(Order_tagDTO, order_tag);
      const ordertagSQL = await ordertagDTO.toSQL();
      await orderModel.createOrdertag(ordertagSQL);
    }
    if (result.result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增訂單", orderId: orderId });
    } else {
      res.status(409).json({ message: "新增訂單失敗" });
    }
  } catch (err) {
    console.error("\n********** Create order Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
    
};

const deleteOrder = async (req, res) => {
  const { userId } = req.middleware;
  const orderId = req.params.orderId;
  console.log(orderId);
  try {
    const orderIsExist = await orderModel.isExist(userId, orderId);
    if (!orderIsExist) {
      res.status(409).json({ message: "訂單紀錄不存在" });
      return;
    }
    const result = await orderModel.remove(userId, orderId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除訂單紀錄", affectedRows:1 });
    } else {
      res.status(409).json({ message: "刪除訂單紀錄失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Order Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getOrderList, createOrder, deleteOrder };