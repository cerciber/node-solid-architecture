/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Load schemas from folder
function loadSchemasFromFolder(folderPath) {
  const schemas = {};
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const schema = require(path.join(folderPath, file));
      const schemaName = Object.keys(schema)[0];
      schemas[schemaName] = schema[schemaName];
    }
  });

  return schemas;
}

// Get Swagger Data
function getSwaggerData() {
  // Load schemas
  const dataSchemas = loadSchemasFromFolder('@src/adapters/schemas');

  // Load response schemas
  const responseSchemas = loadSchemasFromFolder(
    '@src/adapters/schemas/response/responseSchemas/httpResponseSchemas'
  );

  // Swagger data import
  const swaggerData = require('./swaggerData.json');

  // Set Schemas
  swaggerData.components.schemas = {
    ...dataSchemas,
  };

  // Set response schemas
  swaggerData.components.responses = {
    ...responseSchemas,
  };

  // Set Swagger config
  const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: swaggerData,
    apis: ['./src/frameworks/web/express/routes/**/*.js'],
  });
  return swaggerDocs;
}

// Exports
module.exports = getSwaggerData;
