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
const {
  validateNonEmptyString,
  validateResponse,
  validateType,
} = require('@src/adapters/controllers/validation/validationFunctions');

// List data
async function getUserslistController() {
  // Apply bussiness logic
  const usersResponse = await getUserslistCase();

  // Validate output
  const outputValidation = validateByStatus(usersResponse.status, {
    200: [
      [
        validateResponse,
        [200, usersResponse, { users: 'Users' }],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      400,
      outputValidation.badMessage,
      outputValidation.details
    );
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
    [validateType, ['string', id], 'Param id not is an string type.'],
    [validateNonEmptyString, [id], 'Param id is an empty string value.'],
  ]);

  // Return incorrect validation input
  if (!inputValidation.valid) {
    return response.error(
      400,
      inputValidation.badMessage,
      inputValidation.details
    );
  }

  // Apply bussiness logic
  const userResponse = await getUserByIdCase(id);

  // Validate output
  const outputValidation = validateByStatus(userResponse.status, {
    200: [
      [
        validateResponse,
        [200, userResponse, { user: 'User' }],
        `Response not have correct structure.`,
      ],
    ],
    404: [
      [
        validateResponse,
        [404, userResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      400,
      outputValidation.badMessage,
      outputValidation.details
    );
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
