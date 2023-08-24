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
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');

// List data
async function getUserslistController() {
  // Apply bussiness logic
  const usersResponse = await getUserslistCase();

  // Validate output
  const outputValidation = validateByStatus(usersResponse.status, {
    200: [
      ['validateResponse', [200, usersResponse]],
      ['validateType', ['object', usersResponse.body]],
      ['validateSchema', ['Users', usersResponse.body.users]],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(400, outputValidation.badMessage, {
      errors: outputValidation.errors,
    });
  }

  // Return correct validation output
  return usersResponse;
}

// Get by id
async function getUserByIdController(params) {
  // Get input
  const { id } = params;

  // Validate input
  const inputValidation = validate([
    ['validateType', ['string', id]],
    ['validateNonEmptyString', [id]],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(400, inputValidation.badMessage, {
      errors: inputValidation.errors,
    });
  }

  // Apply bussiness logic
  const userResponse = await getUserByIdCase(id);

  // Validate output
  const outputValidation = validateByStatus(userResponse.status, {
    200: [
      ['validateResponse', [200, userResponse]],
      ['validateType', ['object', userResponse.body]],
      ['validateSchema', ['User', userResponse.body.user]],
    ],
    404: [
      ['validateResponse', [404, userResponse]],
      ['validateType', ['object', userResponse.body]],
      ['validateEmptyObject', [userResponse.body]],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(400, outputValidation.badMessage, {
      errors: outputValidation.errors,
    });
  }

  // Return correct validation output
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
