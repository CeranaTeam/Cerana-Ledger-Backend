const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT order_id, staff_name, order_discount, order_note, order_create_time, order_total_price FROM \`order\` JOIN staff ON order.staff_id = staff.staff_id WHERE order.user_id = ?`;
  const params = [userId];
  try{
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const create = async (order) => {
  const query = `INSERT INTO \`order\` SET ?`;
  const params = [order];
  const orderId = order.order_id;
  try{
    const result = await poolQuery(query, params);
    return {result, orderId};
  } catch(err){
    console.log(err);
    throw err;
  }
};

const remove = async (userId, orderId) => {
  const query = `DELETE FROM  \`order\` WHERE user_id = ? AND order_id = ?`;
  const params = [userId, orderId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const isExist = async (userId, orderId) => {
  let query;
  let params;
  query = `SELECT COUNT(*) AS count FROM  \`order\` WHERE user_id = ? AND order_id = ?`;
  params = [userId, orderId];
  try{
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const getOrdertag = async (orderId) => {
  const query = `SELECT tag_name FROM order_tag JOIN tag ON order_tag.tag_id = tag.tag_id WHERE order_id = ?`;
  const params = [orderId];
  try{
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const createOrdertag = async (tag) => {
  const query = `INSERT INTO order_tag SET ?`;
  const params = [tag];
  try{
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const getOrderproduct = async (orderId) => {
  const query = `SELECT order_product.product_id, product_price, product_name, op_amount FROM order_product JOIN product ON order_product.product_id = product.product_id WHERE order_id = ?`;
  const params = [orderId];
  try{
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const createOrderproduct = async (product) => {
  const query = `INSERT INTO order_product SET ?`;
  const params = [product];
  try{
    const result = await poolQuery(query, params);
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }
};

const getOrderdiscount = async (orderId) => {
  const query = `SELECT order_discount.discount_id, discount_name, discount_value, discount_note FROM order_discount JOIN discount ON order_discount.discount_id = discount.discount_id WHERE order_id = ?`;
  const params = [orderId];
  try{
    const result = await poolQuery(query, params);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
};

const createOrderdiscount = async (discount) => {
  const query = `INSERT INTO order_discount SET ?`;
  const params = [discount];
  try{
    const result = await poolQuery(query, params);
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
};

module.exports = { getAll, create, remove, isExist, getOrdertag, createOrdertag, getOrderproduct, createOrderproduct, getOrderdiscount, createOrderdiscount  };
