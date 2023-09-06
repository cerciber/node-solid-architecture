/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// Imports
const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');

// Load schemas from folder
function loadSchemasFromFolder(folderPath) {
  // Create object to store schemas
  const schemas = {};

  // Get absolute path from alias
  const absoluteCurrentPathParts = __dirname.split('\\src');
  const srcPath = absoluteCurrentPathParts
    .slice(0, absoluteCurrentPathParts.length - 1)
    .join('\\src');
  const aliasPathCorrection = folderPath
    .replace(/@/, '\\')
    .replace(/\//g, '\\');
  const absolutePath = srcPath + aliasPathCorrection;

  // Read files
  const files = fs.readdirSync(absolutePath);

  // Add schemas to object
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const schema = require(`${folderPath}/${file}`);
      const schemaName = Object.keys(schema)[0];
      schemas[schemaName] = schema[schemaName];
    }
  });

  // Return schemas object
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
  swaggerData.components.schemas = dataSchemas;

  // Set response schemas
  swaggerData.components.responses = responseSchemas;

  // Set Swagger config
  const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: swaggerData,
    apis: ['./src/frameworks/web/express/routes/**/*.js'],
  });
  return swaggerDocs;
}

// Exports
module.exports = getSwaggerData;
