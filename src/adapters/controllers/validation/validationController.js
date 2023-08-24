// Imports
const Validator = require('swagger-model-validator');
const getSwaggerData = require('@src/frameworks/UI/swagger/getSwaggerData');

const swaggerData = getSwaggerData();
const validator = new Validator(swaggerData);

function validateSchema(name, schema) {
  const result = validator.validate(
    schema,
    swaggerData.components.schemas[name],
    true
  );
  return {
    valid: result.valid,
    errors:
      result.errors?.map((error) => ({
        message: error.message,
        stack: error.stack,
      })) || [],
  };
}

function validateResponse(code, schema) {
  const result = validator.validate(
    schema,
    swaggerData.components.responses[code],
    true
  );
  return {
    valid: result.valid,
    errors:
      result.errors?.map((error) => ({
        message: error.message,
        stack: error.stack,
      })) || [],
  };
}

function validateType(type, value) {
  try {
    if (String(typeof value) !== type) {
      throw new Error(
        `Expected a value of type ${type}, but received a value of type ${typeof value}`
      );
    }
    return {
      valid: true,
      errors: [],
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }
}

function validateEmptyObject(value) {
  try {
    if (!(typeof value === 'object' && Object.keys(value).length === 0)) {
      throw new Error(
        `Expected a empty object, but received a ${JSON.stringify(value)}`
      );
    }
    return {
      valid: true,
      errors: [],
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }
}

function validateOne(validationName, params) {
  let responseValidation;
  switch (validationName) {
    case 'validateSchema':
      responseValidation = validateSchema(params[0], params[1]);
      break;
    case 'validateResponse':
      responseValidation = validateResponse(params[0], params[1]);
      break;
    case 'validateType':
      responseValidation = validateType(params[0], params[1]);
      break;
    case 'validateEmptyObject':
      responseValidation = validateEmptyObject(params[0]);
      break;
    default:
      throw new Error(`Validation function no found.`);
  }
  return responseValidation;
}

function validate(list) {
  let errors = [];
  let valid = true;
  for (let i = 0; i < list.length; i += 1) {
    const [validationName, params] = list[i];
    const validation = validateOne(validationName, params);
    errors = errors.concat(validation.errors);
    if (!validation.valid) {
      valid = false;
      break;
    }
  }
  return {
    valid,
    errors,
  };
}

module.exports = {
  validateSchema,
  validateResponse,
  validateType,
  validateEmptyObject,
  validateOne,
  validate,
};
