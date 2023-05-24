const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT discount_id, discount_name, discount_value, discount_note FROM discount WHERE user_id = ?`;
  const params = [userId];
  const result = await poolQuery(query, params);
  return result;
};

const create = async (discount) => {
  const query = `INSERT INTO discount SET ?`;
  const params = [discount];
  const result = await poolQuery(query, params);
  return result;
};

const remove = async (userId, discountId) => {
  const query = `DELETE FROM discount WHERE user_id = ? AND discount_id = ?`;
  const params = [userId, discountId];
  const result = await poolQuery(query, params);
  return result;
};

const isExist = async (userId, discountId, discountName) => {
  let query;
  let params;
  if (discountId) {
    query = `SELECT COUNT(*) AS count FROM discount WHERE user_id = ? AND discount_id = ?`;
    params = [userId, discountId];
  } else {
    query = `SELECT COUNT(*) AS count FROM discount WHERE user_id = ? AND discount_name = ?`;
    params = [userId, discountName];
  }
  const result = await poolQuery(query, params);
  return result[0].count > 0;
};

module.exports = { getAll, create, remove, isExist };
