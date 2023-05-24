const { poolQuery } = require("../utils/mariadb");

const getAll = async (userId) => {
  const query = `SELECT staff_id, staff_name, staff_email, staff_phone_number FROM staff WHERE user_id = ?`;
  const params = [userId];
  const result = await poolQuery(query, params);
  return result;
};

const getById = async (userId, staffId) => {
  const query =
    "SELECT staff_id, staff_name, staff_email, staff_phone_number \
    FROM staff WHERE user_id = ? AND staff_id = ?";
  const params = [userId, staffId];
  const result = await poolQuery(query, params);
  return result;
};

const create = async (staff) => {
  const query = "INSERT INTO staff SET ?";
  const params = [staff];
  const result = await poolQuery(query, params);
  return result;
};

const update = async (staff) => {
  const query = "UPDATE staff SET ? WHERE staff_id = ?";
  const params = [staff, staff.staff_id];
  const result = await poolQuery(query, params);
  return result;
};

const remove = async (userId, staffId) => {
  const query = "DELETE FROM staff WHERE user_id = ? AND staff_id = ?";
  const params = [userId, staffId];
  const result = await poolQuery(query, params);
  return result;
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
  const result = await poolQuery(query, params);
  return result[0].count > 0;
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
  const result = await poolQuery(query, params);
  return result[0].count > 0;
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
