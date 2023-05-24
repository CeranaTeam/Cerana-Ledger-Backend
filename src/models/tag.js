const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT tag_id, tag_name FROM tag WHERE user_id = ?`;
  const params = [userId];
  const result = await poolQuery(query, params);
  return result;
};

const getTagIdByName = async (tag_name) => {
  const query = `SELECT tag_id FROM tag WHERE tag_name = ?`;
  const params = [tag_name];
  const result = await poolQuery(query, params);
  return result;
};

const create = async (tag) => {
  const query = `INSERT INTO tag SET ?`;
  const params = [tag];
  const result = await poolQuery(query, params);
  return result;
};

const remove = async (userId, tagId) => {
  const query = `DELETE FROM tag WHERE user_id = ? AND tag_id = ?`;
  const params = [userId, tagId];
  const result = await poolQuery(query, params);
  return result;
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
  const result = await poolQuery(query, params);
  return result[0].count > 0;
};

module.exports = { getAll, getTagIdByName, create, remove, isExist };
