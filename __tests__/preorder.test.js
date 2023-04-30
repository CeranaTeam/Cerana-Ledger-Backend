const request = require('supertest');
const app = require('../src/app.js');


describe('/preorder/customer test', () => {


  beforeAll(() => {
    // Initialize myData before all test in this describe
  });

  afterAll(() => {
    // Teardown code after all test in this describe
  });

  beforeEach(() => {
    // Initialize myData before each test
  });

  afterEach(() => {
    // Teardown code after each test
  });


  describe('GET /preorder/customer/:userId', () => {

    test('responds with JSON with 200', async () => {


      const response = (await request(app).get('/preorder/customer/00fkXxesFNbzzXFc5T2GGwQZBOx1'));
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
        productType: expect.any(String),
      });
      // expect(response.body).toEqual(
      //   expect.objectContaining({
      //     "preorderForm": expect.objectContaining({
      //       "storeName": expect.any(String),
      //       "products": expect.arrayContaining([
      //         expect.objectContaining({
      //           "productId": expect.any(String),
      //           "productName": expect.any(String),
      //           "productPrice": expect.any(Number),
      //           "productSpec": expect.any(String),
      //           "productType": expect.any(String)
      //         })
      //       ])
      //     }),
      //     "message": expect.any(String)
      //   })
      // );
    });

  })

});
