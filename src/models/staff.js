const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT staff_id, staff_name, staff_email, staff_phone_number FROM staff WHERE user_id = ?`;
  const params = [userId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const getById = async (userId, staffId) => {
  const query =
    "SELECT staff_id, staff_name, staff_email, staff_phone_number \
    FROM staff WHERE user_id = ? AND staff_id = ?";
  const params = [userId, staffId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const create = async (staff) => {
  const query = "INSERT INTO staff SET ?";
  const params = [staff];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const update = async (staff) => {
  const query = "UPDATE staff SET ? WHERE staff_id = ?";
  const params = [staff, staff.staff_id];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const remove = async (userId, staffId) => {
  const query = "DELETE FROM staff WHERE user_id = ? AND staff_id = ?";
  const params = [userId, staffId];
  try {
    const result = await poolQuery(query, params);
    return result;
  } catch (err) {
    throw err;
  }
};

const isExist = async (userId, staffId, staffName) => {
  let query;
  let params;
  if (staffId) {
    query =
      "SELECT COUNT(*) AS count FROM staff WHERE user_id = ? AND staff_id = ?";
    params = [userId, staffId];
  } else {
    query =
      "SELECT COUNT(*) AS count FROM staff WHERE user_id = ? AND staff_name = ?";
    params = [userId, staffName];
  }
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

const getStaffIdByName = async (userId, staffName) => {
  const query = "SELECT staff_id FROM staff WHERE user_id = ? AND staff_name = ?";
  const params = [userId, staffName];
  const result = await poolQuery(query, params);
  return result[0].staff_id;
};

const isExistName = async (userId, staffId, staffName) => {
  const query =
    "SELECT COUNT(*) AS count FROM staff WHERE user_id = ? AND staff_id != ? AND staff_name = ?";
  const params = [userId, staffId, staffName];
  try {
    const result = await poolQuery(query, params);
    return result[0].count > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll,
  getById,
  getStaffIdByName,
  create,
  update,
  remove,
  isExist,
  isExistName,
};
