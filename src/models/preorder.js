const { poolQuery, PoolTransaction } = require("../utils/mariadb");


const getAllProducts = async (userId) => {
  const query =  `SELECT p.product_id, p.product_name, p.product_price, p.product_spec, t.type_id, t.type_name
                  FROM (
                    SELECT *
                    FROM product
                    WHERE user_id = ? AND product_enable = 1
                  ) p
                  JOIN type t ON p.type_id = t.type_id;`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createPreorder = async (preorder, products) => {

  const preorderQuery = `INSERT INTO preorder SET ?`;
  const preorderParam = [preorder];

  const preorderProductQuery = "INSERT INTO preorder_product (preorder_id, product_id, amount) VALUES ? ;";
  const preorderProductParam = [products];
  console.log(products);

  const poolTransaction = new PoolTransaction();
  
  try {
    await poolTransaction.beginTransaction();

    const results = [];
    let result;
    
    result = await poolTransaction.query(preorderQuery, preorderParam);
    results.push(result);

    result = await poolTransaction.query(preorderProductQuery, preorderProductParam);
    results.push(result);

    await poolTransaction.commit();
    console.log("add prorder success");
    return result;

  } catch (err) {
    await poolTransaction.rollback();
    console.error("Error creating preorder :", err);
    throw err;
  } finally {
    poolTransaction.releaseTransaction();
  }
};

const getPreorders = async (userId) => {
  const query = `SELECT preorder_id, preorder_contact, preorder_note, preorder_pick_up_time
                         FROM preorder
                         WHERE user_id = ? AND preorder_is_picked = 0`;
  const params = [userId];
  
  const result = await poolQuery(query, params);
  return result;
                        
};

const getPreorderProducts = async (preorderId) => {
  const query = `SELECT p.product_id, product_name, type_name as product_type, product_spec, product_price, amount
                 FROM (
                   SELECT product_id, amount
                   FROM preorder_product
                   WHERE  preorder_id = ?
                 ) pp
                 JOIN product p ON p.product_id = pp.product_id
                 JOIN type t ON t.type_id = p.type_id`;
  const params = [preorderId];
  const result = await poolQuery(query, params);
  return result;
};

const completePreorder = async (preorderId) => {
  const query = `UPDATE preorder
                 SET preorder_is_picked = 1
                 WHERE preorder_id = ?`;
  const params = [preorderId];
  
  const result = await poolQuery(query, params);
  return result;
};

const rejectPreorder = async (preorderId) => {
  const query = `DELETE FROM preorder WHERE preorder_id = ?`;
  const params = [preorderId];
  
  const result = await poolQuery(query, params);
  return result;
};







module.exports = { 
  getAllProducts, 
  createPreorder, 
  getPreorders, 
  getPreorderProducts, 
  completePreorder,
  rejectPreorder
};