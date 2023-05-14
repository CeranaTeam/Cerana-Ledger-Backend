const request = require('supertest');
const app = require('../src/app.js');
const FirebaseMock = require("./utils/firebase.mock.js")

describe('The fist hello world test', () => {
    
  
  beforeAll(async () => {
      // Initialize myData before all test in this describe
    global.userId = "00fkXxesFNbzzXFc5T2GGwQZBOx1";
    global.firebaseMock = new FirebaseMock;
    global.idToken = await global.firebaseMock.createIdTokenfromCustomToken("00fkXxesFNbzzXFc5T2GGwQZBOx1");
    
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
  
  
  describe('GET /hello', () => {

    test('responds with JSON with 200', async () => {

      const user = 'Mark'
      const response = await request(app).get('/hello').set({Authorization: `bearer ${global.idToken}`}).query({ user: user });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ message: `this is the test of ${user}` });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
    });

  })
 
});
  