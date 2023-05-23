const request = require('supertest');
const app = require('../src/app.js');

const mysql = require("mysql2/promise");
const MysqlDB = require("./utils/MysqlDB.js");
const FirebaseMock = require("./utils/firebase.mock.js")

let postorderId;
let deleteorderId;
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

describe('/order test', () => {

    beforeAll(async () => {
        // Initialize myData before all test in this describe
        global.connection = await createConnection();
    
        global.userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1";
        global.firebaseMock = new FirebaseMock;
        global.idToken = await global.firebaseMock.createIdTokenfromCustomToken("00fkXxesFNbzzXFc5T2GGwQZBOx1");
        
        global.db = new MysqlDB;
        await global.db.connect();
        
      });
        
      afterAll(async () => {
        // Teardown code after all test in this describe
        await global.connection.end();

        await global.db.teardown(global.userId);
        await global.db.init(global.userId);
        await global.db.disconnect();
      });
    

    beforeEach(async() => {
        await global.db.teardown();
        await global.db.init(global.userId);

        if(expect.getState().currentTestName === "/order test DELETE /order/:orderId responds with JSON with 200"){
            deleteorderId = "3ExP2YKc0PkKY9BWYQs4"
            const staffId = "k7LaWj79lc7kj8Wt6Fx5"
            const userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1"
            const query = `
            INSERT INTO \`order\` (order_id, user_id, staff_id, order_discount, order_note, order_create_time, order_total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [deleteorderId, userId, staffId, 0, 'orderNote', '2022-07-17 09:48:18', 1];                  
            const orderUpdateResult = await global.connection.query(query, values);
            console.log(orderUpdateResult)}
    });
    
    afterEach(async () => {
        //console.log("name of test:", expect.getState().currentTestName)
        if(expect.getState().currentTestName === "/order test POST /order respond with JSON with 200"){
          const orderDeleteresult = (await global.connection.query('DELETE FROM `order` WHERE order_id = ?', postorderId))[0];          
          //console.log("this is affect rows", orderDeleteresult.affectedRows)
          expect(orderDeleteresult.affectedRows).toBeGreaterThan(0);
        }
        // Teardown code after each test
        await global.db.teardown(global.userId);
      });
    
    
    describe('GET /order', () => {

        test('responds with JSON with 200', async () => {

            const response = await request(app).get('/order');
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json')
            );
                    expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
            expect.stringContaining('application/json')
            );

        expect(response.body).toMatchObject({
            orderList: [{
              orderId: expect.any(String),
              productList: expect.any(Array),
              tagList: expect.any(Array),
              staffName: expect.any(String),
              discountList: expect.any(Array),
              totalPrice: expect.any(Number),
              orderNote: expect.any(String)
            }],
          });

        expect(response.body.orderList[0].productList).toContainEqual({
            amount: expect.any(Number),
            productId: expect.any(String),
            productName: expect.any(String),
            productPrice: expect.any(Number),
        });
        
        expect(response.body.orderList[0].discountList).toContainEqual({
            discountId: expect.any(String),
            discountName: expect.any(String),
            discountValue: expect.any(Number),
            discountNote: expect.any(String)
        });
        });

    })
    
    describe('POST /order', () => {

        test('respond with JSON with 200', async () => {
    
            const payload = {
                "orderId": "",
                "productList": [
                    {
                        "productId": "M7NCyLbo7bLK8PxqZJp8",
                        "productPrice": 249,
                        "productName": "米糠皂",
                        "amount": 1
                    },
                    {
                        "productId": "4wbx9iDwlxtxwuxWdxfG",
                        "productPrice": 229,
                        "productName": "米糠皂",
                        "amount": 3
                    }
                ],
                "tagList": [
                    "草莓杯杯"
                ],
                "timestamp": "",
                "staffName": "魏可晴",
                "discountList": [
                    {
                        "discountId": "7cIST5sJmrwhfmtHbhHm",
                        "discountName": "追蹤九折",
                        "discountValue": 20,
                        "discountNote": "none"
                    }
                ],
                "totalPrice": 0,
                "orderNote": "test"
            }
      
            const response = await request(app).post('/order').send(payload)
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json')
            );
            expect(response.body).toHaveProperty('orderId');
            postorderId = response.body.orderId
            console.log("this is orderId",postorderId);
        
        });
    
      })
    describe('DELETE /order/:orderId', () => {

        test('responds with JSON with 200', async () => {
            console.log(`/order/${deleteorderId}`);
            const response = await request(app).delete(`/order/${deleteorderId}`);
            expect(response.affectedRows).toBe(1);;
            console.log("this is affect rows", response.affectedRows)
            const deleteOrder = (await global.connection.query('SELECT * FROM `order` WHERE order_id = ?', deleteorderId))[0];
            expect(deleteOrder.length).toEqual(0);
        });

    })
});
  
