// Imports
const response = require('@response');
const {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
} = require('@src/application/userCases');
const {
  validateSchema,
  validateResponse,
} = require('@src/adapters/controllers/schemas/schemaController');

// List data
async function getUserslistController() {
  return getUserslistCase();
}

// Get by id
async function getUserByIdController(id) {
  // Apply bussiness logic
  const userResponse = await getUserByIdCase(id);

  // Validate responses 200
  if (userResponse.status === 200) {
    // Validate response 200 schema
    const responseValidation = validateResponse(200, userResponse);
    if (!responseValidation.valid) {
      return response.error(400, 'Response not have correct structure.', {
        errors: responseValidation.errors,
      });
    }

    // Validate user schema
    const userValidation = validateSchema('User', userResponse.body.user);
    if (!userValidation.valid) {
      return response.error(400, 'User response not have correct structure.', {
        errors: userValidation.errors,
      });
    }
  }

  // Validate responses 404
  else if (userResponse.status === 404) {
    // Validate response 400 schema
    const responseValidation = validateResponse(404, userResponse);
    if (!responseValidation.valid) {
      return response.error(400, 'Response not have correct structure.', {
        errors: responseValidation.errors,
      });
    }

    // Validate undefined user
    if (userResponse.body.user !== undefined) {
      return response.error(400, 'User response not have correct structure.', {
        errors: ['userResponse.body.user !== undefined'],
      });
    }
  }

  // Send result
  return userResponse;
}

// Add
async function addUserController(newData) {
  return addUserCase(newData);
}

// Update by id
async function updateUserController(id, newData) {
  return updateUserCase(id, newData);
}

// Remove by id
async function removeUserController(id) {
  return removeUserCase(id);
}

// Exports
module.exports = {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
};
