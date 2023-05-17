const request = require('supertest');
const app = require('../src/app.js');
const mysql = require("mysql2/promise");
const MysqlDB = require("./utils/MysqlDB.js");
const FirebaseMock = require("./utils/firebase.mock.js");
const { async } = require('@firebase/util');


  // Set up MySQL connection configuration
  const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  // Define a function to establish a MySQL connection
  async function createConnection() {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  }
describe('/product test', () => {

  beforeAll(async () => {
    // Initialize myData before all test in this describe
    global.connection = await createConnection();
    // firebase IdToken
    global.userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1";
    global.firebaseMock = new FirebaseMock;
    global.idToken = await global.firebaseMock.createIdTokenfromCustomToken("00fkXxesFNbzzXFc5T2GGwQZBOx1");
    
    global.db = new MysqlDB;
    await global.db.connect();
  });

  afterAll(async () => {
    // Teardown code after all test in this describe
    await global.connection.end();
    // use this in future
    await global.db.teardown(global.userId);
    await global.db.init(global.userId);
    await global.db.disconnect();
  });

  let productId;


  beforeEach(async () => {
    // Initialize myData before each test
    await global.db.teardown(global.userId);
    await global.db.init(global.userId);
    if (expect.getState().currentTestName === "/product test PUT /product respond with JSON with 200" ||
      expect.getState().currentTestName === "/product test DELETE /product respond with JSON with 200"){

      const payload = {
        "productName": "test耳機",
        "productType": "test",
        "productPrice": 499,
        "productSpec": "原廠貨"
      };

      const response = await request(app).post('/product').send(payload).set({Authorization: `bearer ${global.idToken}`});
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
      expect(response.body).toHaveProperty('productId');
      productId = response.body.productId;
    }
  });

  afterEach(async () => {
    if (expect.getState().currentTestName === "/product test POST /product respond with JSON with 200"){
      const productDeleteResult = (await global.connection.query('DELETE FROM product WHERE product_name = "test耳機"'))[0];
      expect(productDeleteResult.affectedRows).toBeGreaterThan(0);
      const typeDeleteResult = (await global.connection.query('DELETE FROM type WHERE type_name = "test"'))[0];
      expect(typeDeleteResult.affectedRows).toBeGreaterThan(0);
    }

    // Teardown code after each test
    
  });


  describe('GET /product', () => {

    test('responds with JSON with 200', async () => {


      const response = await request(app).get('/product').set({Authorization: `bearer ${global.idToken}`});
      console.log(response.message);
      
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );

      expect(response.body).toMatchObject({
        productList: expect.any(Array)
      });

      response.body.productList.forEach(product => {
        expect(product).toMatchObject({
          productId: expect.any(String),
          productName: expect.any(String),
          productSpec: expect.any(String),
          productType: expect.any(String),
          productPrice: expect.any(Number),
        });
      });

      
    });

  });


  describe('POST /product', () => {
    test('respond with JSON with 200', async () => {
      const payload = {
        //"userId": "00fkXxesFNbzzXFc5T2GGwQZBOx1",
        "productName": "test耳機",
        "productType": "test",
        "productPrice": 499,
        "productSpec": "原廠貨"
      };

      const response = await request(app).post('/product').send(payload).set({Authorization: `bearer ${global.idToken}`});
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );

      expect(response.body).toHaveProperty('productId');
      productId = response.body.productId;
      
      const productQueryResult = (await global.connection.query('SELECT * FROM product WHERE product_id = ?', productId))[0];
      console.log("productQueryResult");
      console.log(productQueryResult);

      expect(productQueryResult[0]).toEqual({
        product_id: expect.any(String),
        user_id: expect.any(String),
        type_id: expect.any(String),
        product_name: expect.any(String),
        product_price: expect.any(Number),
        product_spec: expect.any(String),
        product_enable: expect.any(Number)
      });

    });
  });
  
  describe("PUT /product", () => {
    test("respond with JSON with 200", async () =>{
      const payload = {
        "productName": "test耳機",
        "productType": "test",
        "productPrice": 599,
        "productSpec": "原廠貨"
      };
      const response = await request(app).put('/product/'+productId).send(payload).set({Authorization: `bearer ${global.idToken}`});
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );

      const productQueryResult = (await global.connection.query('SELECT * FROM product WHERE product_id = ?', productId))[0];
      console.log("productQueryResult");
      console.log(productQueryResult);

      expect(productQueryResult[0]).toEqual({
        product_id: expect.any(String),
        user_id: expect.any(String),
        type_id: expect.any(String),
        product_name: expect.any(String),
        product_price: expect.any(Number),
        product_spec: expect.any(String),
        product_enable: expect.any(Number)
      });
    });
  });

  describe("DELETE /product", () => {
    test("respond with JSON with 200", async () => {
      const response = await request(app).delete('/product/'+productId).set({Authorization: `bearer ${global.idToken}`});
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
    });
  });

});
