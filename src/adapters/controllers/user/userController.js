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
  validate,
} = require('@src/adapters/controllers/validation/validationController');

// List data
async function getUserslistController() {
  return getUserslistCase();
}

// Get by id
async function getUserByIdController(id) {
  // Apply bussiness logic
  const userResponse = await getUserByIdCase(id);

  // Validate responses
  if (userResponse.status === 200) {
    const responseValidation = validate([
      ['validateResponse', [200, userResponse]],
      ['validateType', ['object', userResponse.body]],
      ['validateSchema', ['User', userResponse.body.user]],
    ]);
    if (!responseValidation.valid) {
      return response.error(400, responseValidation.errors[0].message, {
        errors: responseValidation.errors,
      });
    }
  } else if (userResponse.status === 404) {
    const responseValidation = validate([
      ['validateResponse', [404, userResponse]],
      ['validateType', ['object', userResponse.body]],
      ['validateEmptyObject', [userResponse.body]],
    ]);
    if (!responseValidation.valid) {
      return response.error(400, responseValidation.errors[0].message, {
        errors: responseValidation.errors,
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
