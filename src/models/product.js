const { poolQuery } = require("../utils/mariadb");

const isExist = async (userId, productId, productName) => {
  let query;
  let params;
  if (productId) {
    query =
        "SELECT COUNT(*) AS count FROM product WHERE user_id = ? AND product_id = ?";
    params = [userId, productId];
  } else {
    query =
        "SELECT COUNT(*) AS count FROM product WHERE user_id = ? AND product_name = ?";
    params = [userId, productName];
  }
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = { isExist };
