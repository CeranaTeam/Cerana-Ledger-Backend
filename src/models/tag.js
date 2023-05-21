const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT tag_id, tag_name FROM tag WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const getTagIdByName = async (tag_name) => {
  const query = `SELECT tag_id FROM tag WHERE tag_name = ?`;
  const params = [tag_name];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const create = async (tag) => {
  const query = `INSERT INTO tag SET ?`;
  const params = [tag];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const remove = async (userId, tagId) => {
  const query = `DELETE FROM tag WHERE user_id = ? AND tag_id = ?`;
  const params = [userId, tagId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const isExist = async (userId, tagId, tagName) => {
  let query;
  let params;
  if (tagId) {
    query = `SELECT COUNT(*) AS count FROM tag WHERE user_id = ? AND tag_id = ?`;
    params = [userId, tagId];
  } else {
    query = `SELECT COUNT(*) AS count FROM tag WHERE user_id = ? AND tag_name = ?`;
    params = [userId, tagName];
  }
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll, getTagIdByName, create, remove, isExist };
