const mariadb = require("mysql2/promise");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const poolQuery = async (query, params) => {
  let conn;
  try {
    if (!params) params = [];
    conn = await pool.getConnection();
    const rows = await conn.query(query, params);
    return rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { poolQuery };
