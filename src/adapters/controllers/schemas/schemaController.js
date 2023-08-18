// Imports
const Validator = require('swagger-model-validator');
const getSwaggerData = require('@src/frameworks/UI/swagger/getSwaggerData');
const { convertToType } = require('@src/utils/functions/convertStringToType');

const swaggerData = getSwaggerData();
const validator = new Validator(swaggerData);

// Extract Schema example from
function getSchemaExampleFromFileds(schema) {
  return Object.fromEntries(
    Object.entries(schema[Object.keys(schema)[0]].properties).map(
      ([key, value]) => [key, convertToType(value.example, value.type)]
    )
  );
}

function getSchemaExampleFromExamples(schema) {
  return Object.fromEntries(
    Object.entries(schema[Object.keys(schema)[0]].properties).map(
      ([key, value]) => [
        key,
        convertToType(schema[Object.keys(schema)[0]].example[key], value.type),
      ]
    )
  );
}

function validateSchema(name, schema) {
  const errors = validator.validate(
    schema,
    swaggerData.components.schemas[name],
    true
  );
  return { valid: errors.valid, errors: errors.errors };
}

module.exports = {
  getSchemaExampleFromFileds,
  getSchemaExampleFromExamples,
  validateSchema,
};
