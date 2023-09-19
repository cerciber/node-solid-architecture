// Imports
const response = require('@src/adapters/presenters/response');
const {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
} = require('@src/application/fakeApiApplication/userCases');
const {
  validate,
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateResponse,
  validateType,
  validateSchema,
  validateObjectKeys,
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
      500,
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
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return userResponse;
}

// Add
async function addUserController(body) {
  // Get input
  const { user } = body;

  // Validate input
  const inputValidation = validate([
    [
      validateObjectKeys,
      [body, ['user']],
      'Body is not an key object type with specific keys.',
    ],
    [validateSchema, ['User', user], 'User schema not have correct structure.'],
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
  const addUserResponse = await addUserCase(user);

  // Validate output
  const outputValidation = validateByStatus(addUserResponse.status, {
    200: [
      [
        validateResponse,
        [200, addUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
    409: [
      [
        validateResponse,
        [409, addUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return addUserResponse;
}

// Update by id
async function updateUserController(params, body) {
  // Get input
  const { id } = params;
  const { user } = body;

  // Validate input
  const inputValidation = validate([
    [validateType, ['string', id], 'Param id not is an string type.'],
    [validateNonEmptyString, [id], 'Param id is an empty string value.'],
    [
      validateObjectKeys,
      [body, ['user']],
      'Body is not an key object type with specific keys.',
    ],
    [validateSchema, ['User', user], 'User schema not have correct structure.'],
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
  const updateUserResponse = await updateUserCase(id, user);

  // Validate output
  const outputValidation = validateByStatus(updateUserResponse.status, {
    200: [
      [
        validateResponse,
        [200, updateUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
    404: [
      [
        validateResponse,
        [404, updateUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return updateUserResponse;
}

// Remove by id
async function removeUserController(params) {
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
  const deleteUserResponse = await removeUserCase(id);

  // Validate output
  const outputValidation = validateByStatus(deleteUserResponse.status, {
    200: [
      [
        validateResponse,
        [200, deleteUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
    404: [
      [
        validateResponse,
        [404, deleteUserResponse, {}],
        `Response not have correct structure.`,
      ],
    ],
  });

  // Return incorrect validation output
  if (!outputValidation.valid) {
    return response.error(
      500,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return deleteUserResponse;
}

// Exports
module.exports = {
  getUserslistController,
  getUserByIdController,
  addUserController,
  updateUserController,
  removeUserController,
};
