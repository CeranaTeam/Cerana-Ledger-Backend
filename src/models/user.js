const { poolQuery } = require("../utils/mariadb");

const getById = async (userId) => {
  const query = `SELECT * FROM user WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const create = async (user) => {
  const query = `INSERT INTO user SET ?`;
  const params = [user];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const update = async (userId, user) => {
  const query = `UPDATE user SET ? WHERE user_id = ?`;
  const params = [user, userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const isExist = async (userId) => {
  const query = `SELECT COUNT(*) AS count FROM user WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

const getStoreName = async (userId) => {
  const query = `SELECT store_name FROM user WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result[0].store_name;
  } catch (err) {
    throw err;
  }
};

module.exports = { getById, create, update, isExist, getStoreName };
