const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Name',
        version: '1.0.0',
        description: 'API Documentation',
    },
};
  
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], //replace with the path to your routes
};
  
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;