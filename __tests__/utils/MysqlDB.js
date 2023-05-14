const mysql = require("mysql2/promise");
const dbInitSchema = require("./db-schema/db-init.js")
const dbTeardownSchema = require("./db-schema/db-teardown.js")


// Set up MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
};

class MysqlDB {
  #connection;
  #dbConfig;
  #dbInitSchema;
  #dbTeardownSchema;

  get connection() {
    throw new Error("Access denied");
  }

  set connnection(value) {
    throw new Error("Access denied");
  }
  
  constructor(){
   
    this.#dbConfig = dbConfig;
    this.#dbInitSchema = dbInitSchema;
    this.#dbTeardownSchema = dbTeardownSchema;
  }

  async connect(){
    this.#connection = await mysql.createConnection(this.#dbConfig);
  }

  async disconnect(){
    await this.#connection.end();
  }

  async query(sql, params){
    if (!params) params = [];
    const rows = await this.#connection.query(sql, params);
    return rows[0];
  }
  async init(userId){

    if(userId === undefined){userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1";}
    await this.query(this.#dbInitSchema, Array(11).fill(userId))
  }

  async teardown(userId){
    if(userId === undefined){userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1";}
    await this.query(this.#dbTeardownSchema, [userId]);
  }

  
}

module.exports = MysqlDB



