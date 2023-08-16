// Imports
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Http response schemas imports
const response200Schema = require('@src/adapters/schemas/response/responseSchemas/httpResponseSchemas/200Schema');
const response201Schema = require('@src/adapters/schemas/response/responseSchemas/httpResponseSchemas/201Schema');
const response404Schema = require('@src/adapters/schemas/response/responseSchemas/httpResponseSchemas/404Schema');
const response500Schema = require('@src/adapters/schemas/response/responseSchemas/httpResponseSchemas/500Schema');

// Data schemas imports
const userSchema = require('@src/adapters/schemas/users/userSchema');
const usersSchema = require('@src/adapters/schemas/users/usersSchema');

// Swagger data import
const swaggerData = require('./swaggerData.json');

// Set Schemas
swaggerData.components.schemas = {
  ...userSchema,
  ...usersSchema,
};

// Set response schemas
swaggerData.components.responses = {
  ...response200Schema,
  ...response201Schema,
  ...response404Schema,
  ...response500Schema,
};

console.dir(swaggerData, { depth: null });

// Set Swagger config
const swaggerDocs = swaggerJsdoc({
  swaggerDefinition: swaggerData,
  apis: ['./src/frameworks/web/express/routes/**/*.js'],
});

// Exports
module.exports = {
  serve: swaggerUi.serve,
  UISetup: swaggerUi.setup(swaggerDocs),
};
