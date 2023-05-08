const request = require('supertest');
const app = require('../src/app.js');

const mysql = require("mysql2/promise");


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


describe('/preorder/customer test', () => {



  beforeAll(async () => {
    // Initialize myData before all test in this describe
    global.connection = await createConnection();
  });

  afterAll(async () => {
    // Teardown code after all test in this describe
    await global.connection.end();
  });

  let preorderId;

  beforeEach(async () => {
    if(expect.getState().currentTestName === "/preorder/customer test HEAD /preorder/complete respond with JSON with 200"){
      const preorderId = "3ExP2YKc0PkKY9BWYQs4"
      const preorderUpdateResult = (await global.connection.query('UPDATE preorder SET preorder_is_picked = 0 WHERE preorder_id = ?', preorderId))[0];
      console.log(preorderUpdateResult)
      
    }
    // Initialize myData before each test
  });

  afterEach(async () => {
    //console.log("name of test:", expect.getState().currentTestName)
    if(expect.getState().currentTestName === "/preorder/customer test POST /preorder respond with JSON with 200"){
      const preorderDeleteResult = (await global.connection.query('DELETE FROM preorder WHERE preorder_id = ?', preorderId))[0];
      
      console.log("this is affect rows", preorderDeleteResult.affectedRows)
      expect(preorderDeleteResult.affectedRows).toBeGreaterThan(0);
    }

   
    // Teardown code after each test
  });


  describe('GET /preorder/customer/:userId', () => {

    test('responds with JSON with 200', async () => {


      const response = await request(app).get('/preorder/customer/00fkXxesFNbzzXFc5T2GGwQZBOx1');
      
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );

      expect(response.body).toMatchObject({
        preorderForm: {
          storeName: expect.any(String),
          products: expect.any(Array),
        },
        message: expect.any(String),
      });
      
      expect(response.body.preorderForm.products[0]).toMatchObject({
        productId: expect.any(String),
        productName: expect.any(String),
        productPrice: expect.any(Number),
        productSpec: expect.any(String),
        productTypeId: expect.any(String),
        productType: expect.any(String),
      });
      
    });

  })

  describe('POST /preorder', () => {

    test('respond with JSON with 200', async () => {


  

      const payload = {
        "userId": "00fkXxesFNbzzXFc5T2GGwQZBOx1",
          "preorderForm": {
              "preorderPickUpTime": "2024-12-31 23:59:59",
              "preorderContact": "0900111000",
              "preorderNote": "test",
              "preorderCreateTime": "2023-5-01 23:59:59",
              "products": [ 
                  {
                      
                      "productId": "4wbx9iDwlxtxwuxWdxfG",
                      "amount": 5
                  },
                  {
                      
                      "productId": "kszyiuE1OGZkBALDlaDx",
                      "amount": 2
                  }
                  
              ]
          }
      };
  
      const response = await request(app).post('/preorder').send(payload)
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
        
      expect(response.body).toHaveProperty('preorderId');
      preorderId = response.body.preorderId
      console.log("this is preorderId",preorderId);

      const preorderQueryResult = (await global.connection.query('SELECT * FROM preorder WHERE preorder_id = ?', preorderId))[0];
      // Check that the result array contains an object that matches the expected object
      
      console.log(preorderQueryResult)
      expect(preorderQueryResult[0]).toEqual({
        preorder_id: expect.any(String),
        user_id: expect.any(String),
        preorder_contact: expect.any(String),
        preorder_create_time: expect.any(Date),
        preorder_is_picked: expect.any(Number),
        preorder_note: expect.any(String),
        preorder_pick_up_time: expect.any(Date),
      });

      const preorderProducts = (await global.connection.query('SELECT * FROM preorder_product WHERE preorder_id = ?', preorderId))[0];

      expect(preorderProducts.length).toBeGreaterThan(0);
      preorderProducts.forEach(preorderProduct => {
        expect(preorderProduct).toMatchObject({
          preorder_id: expect.any(String),
          product_id: expect.any(String),
          amount:expect.any(Number),
        });
      })
      
      
    });

  })

  

});

describe("/preorder/store test", () => {

  beforeAll(async () => {
    // Initialize myData before all test in this describe
    global.connection = await createConnection();
  });

  afterAll(async () => {
    // Teardown code after all test in this describe
    await global.connection.end();
  });

  let preorderId;

  beforeEach(async () => {
    if(expect.getState().currentTestName === "/preorder/store test HEAD /preorder/complete respond with JSON with 200"){
      const preorderId = "3ExP2YKc0PkKY9BWYQs4"
      const preorderUpdateResult = (await global.connection.query('UPDATE preorder SET preorder_is_picked = 0 WHERE preorder_id = ?', preorderId))[0];
      console.log(preorderUpdateResult)
      
    }
    // Initialize myData before each test
  });

  afterEach(async () => {
    //console.log("name of test:", expect.getState().currentTestName)
    console.log(expect.getState().currentTestName)
    if(expect.getState().currentTestName === "/preorder/store test HEAD /preorder/complete respond with JSON with 200"){
      
      const preorderId = "3ExP2YKc0PkKY9BWYQs4"
      
      const preorderUpdateResult = (await global.connection.query('UPDATE preorder SET preorder_is_picked = 0 WHERE preorder_id = ?', preorderId))[0];
      console.log(preorderUpdateResult)
      
    }

    if (expect.getState().currentTestName === "/preorder/store test HEAD /preorder/reject respond with JSON with 200"){
      console.log("hello")
      const preorderDeleteResult = (await global.connection.query('DELETE FROM preorder WHERE preorder_id = ?', "preorder-test-id"))[0];
      
      console.log("this is affect rows", preorderDeleteResult.affectedRows)
      expect(preorderDeleteResult.affectedRows).toEqual(0);
    }
    // Teardown code after each test
  });


  describe("GET /preorder/store", () => {
    test("respond with JSON with 200", async () =>{
      const response = await request(app).get('/preorder/store');
      
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );

      expect(response.body).toMatchObject({
        preorders: expect.any(Array),
        message: expect.any(String),
      });

      console.log(response.body)
      response.body.preorders.forEach(preorder => {
        expect(preorder).toMatchObject({
          "preorderId": expect.any(String),
          "preorderContact": expect.any(String),
          "preorderNote": expect.any(String),
          "preorderPickUpTime": expect.any(String),
          "preorderProducts": expect.any(Array)
        })
        preorder.preorderProducts.forEach(product => {
          expect(product).toMatchObject({
            "amount": expect.any(Number),
            "productId": expect.any(String),
            "productName": expect.any(String),
            "productPrice": expect.any(Number),
            "productSpec": expect.any(String),
            "productType": expect.any(String)
          })
        })
      });

    })
  })

  describe("HEAD /preorder/complete", () => {
    test("respond with JSON with 200", async () => {

      const preorderId = "3ExP2YKc0PkKY9BWYQs4"
      const response = await request(app).head(`/preorder/complete/${preorderId}`);
      expect(response.statusCode).toBe(200);

      const preorderQueryResult = (await global.connection.query(`SELECT preorder_id, preorder_is_picked
                                                                  FROM preorder 
                                                                  WHERE preorder_id = ? `, preorderId))[0];

      
      console.log(preorderQueryResult)
      expect(preorderQueryResult[0]).toEqual({
        preorder_id: preorderId,
        preorder_is_picked: 1
      });


    })
  })

  describe("HEAD /preorder/reject", () => {
    
    const insertTestData = async (preorderId, userId) => {
      const preorderQuery = `INSERT INTO preorder SET ?`;
      
      const preorderData = {
        preorder_id: preorderId,
        user_id: userId,
        preorder_contact: "preorderContact",
        preorder_create_time: "2023-5-01 23:59:59",
        preorder_is_picked: 0,
        preorder_note: "test note",
        preorder_pick_up_time: '2022-07-17 09:48:18',
      };
      const preorderParam = [preorderData];
      await global.connection.query(preorderQuery, preorderParam);
    }
    
    test("respond with JSON with 200", async () => {
      
      const preorderId = "preorder-test-id";
      const userId = '00fkXxesFNbzzXFc5T2GGwQZBOx1';
      
      await insertTestData(preorderId, userId);

      let preorderQueryResult = (await global.connection.query(`SELECT preorder_id
                                                                  FROM preorder 
                                                                  WHERE preorder_id = ? `, preorderId))[0];
                                                        
      console.log(preorderQueryResult)
      expect(preorderQueryResult.length).toEqual(1)


      const response = await request(app).head(`/preorder/reject/${preorderId}`);

      preorderQueryResult = (await global.connection.query(`SELECT preorder_id
                                                                  FROM preorder 
                                                                  WHERE preorder_id = ? `, preorderId))[0];
                                                        
      console.log(preorderQueryResult)
      expect(preorderQueryResult.length).toEqual(0)

    })
  })
})
