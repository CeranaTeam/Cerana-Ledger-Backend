const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT type_id, type_name FROM type WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const create = async (type) => {
  const query = `INSERT INTO type SET ?`;
  const params = [type];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const remove = async (userId, typeId) => {
  const query = `DELETE FROM type WHERE user_id = ? AND type_id = ?`;
  const params = [userId, typeId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const isExist = async (userId, typeId, typeName) => {
  let query;
  let params;
  if (typeId) {
    query = `SELECT COUNT(*) AS count FROM type WHERE user_id = ? AND type_id = ?`;
    params = [userId, typeId];
  } else {
    query = `SELECT COUNT(*) AS count FROM type WHERE user_id = ? AND type_name = ?`;
    params = [userId, typeName];
  }
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, create, remove, isExist };
