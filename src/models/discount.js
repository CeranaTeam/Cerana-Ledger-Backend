const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT discount_id, discount_name, discount_value, discount_note FROM discount WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const create = async (discount) => {
  const query = `INSERT INTO discount SET ?`;
  const params = [discount];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const remove = async (userId, discountId) => {
  const query = `DELETE FROM discount WHERE user_id = ? AND discount_id = ?`;
  const params = [userId, discountId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    console.log(err);
  }
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
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, create, remove, isExist };
