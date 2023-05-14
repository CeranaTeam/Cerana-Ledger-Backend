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
    console.log(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

class PoolTransaction {
  
  #conn;

  get conn() {
    throw new Error("Access denied");
  }

  set conn(value) {
    throw new Error("Access denied");
  }


  async beginTransaction(){
    this.#conn = await pool.getConnection();
    await this.#conn.beginTransaction();
  }
  
  async query(query, params){

    if (!params) params = [];
    const rows = await this.#conn.query(query, params);
    return rows[0];
  }

  async commit(){
    await this.#conn.commit();
  }

  async rollback(){
    await this.#conn.rollback();
  }

  releaseTransaction(){
    this.#conn.release();
  }
}


module.exports = { poolQuery, PoolTransaction};
