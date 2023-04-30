const { poolQuery } = require("../utils/mariadb");


const getAllProducts = async (userId) => {
  const query =  `SELECT p.product_id, p.product_name, p.product_price, p.product_spec, t.type_name
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

module.exports = { getAllProducts };