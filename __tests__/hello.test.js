const request = require('supertest');
const app = require('../src/app.js');


describe('The fist hello world test', () => {
    
    
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
    
    
    describe('GET /hello', () => {

        test('responds with JSON with 200', async () => {

            const user = 'Mark'
            const response = await request(app).get('/hello').query({ user: user });;
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({ message: `this is the test of ${user}` });
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('application/json')
            );
        });

    })
 
});
  