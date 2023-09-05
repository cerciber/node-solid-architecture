// Imports
const response = require('@src/adapters/presenters/response');
const {
  signinUserAuthCase,
  signupUserAuthCase,
} = require('@src/application/authUserCases');
const {
  validate,
  validateByStatus,
} = require('@src/adapters/controllers/validation/validationController');
const {
  validateNonEmptyString,
  validateResponse,
  validateType,
} = require('@src/adapters/controllers/validation/validationFunctions');

// Get
async function signinUserAuthController(params) {
  // Get input
  const { username, password } = params;

  // Validate input
  const inputValidation = validate([
    [
      validateType,
      ['string', username],
      'Param username is not an string type.',
    ],
    [
      validateNonEmptyString,
      [username],
      'Param username is an empty string value.',
    ],
    [
      validateType,
      ['string', password],
      'Param password is not an string type.',
    ],
    [
      validateNonEmptyString,
      [password],
      'Param password is an empty string value.',
    ],
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
  const userAuthResponse = await signinUserAuthCase(username, password);

  // Validate output
  const outputValidation = validateByStatus(userAuthResponse.status, {
    200: [
      [
        validateResponse,
        [200, userAuthResponse, { token: 'Token' }],
        `Response not have correct structure.`,
      ],
    ],
    404: [
      [
        validateResponse,
        [404, userAuthResponse, {}],
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
  return userAuthResponse;
}

// Add
async function signupUserAuthController(body) {
  // Get input
  const { username, password } = body;

  // Validate input
  const inputValidation = validate([
    [
      validateType,
      ['string', username],
      'Param username is not an string type.',
    ],
    [
      validateNonEmptyString,
      [username],
      'Param username is an empty string value.',
    ],
    [
      validateType,
      ['string', password],
      'Param password is not an string type.',
    ],
    [
      validateNonEmptyString,
      [password],
      'Param password is an empty string value.',
    ],
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
  const addUserResponse = await signupUserAuthCase(username, password);

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
      400,
      outputValidation.badMessage,
      outputValidation.details
    );
  }

  // Return correct validation output
  return addUserResponse;
}

// Exports
module.exports = {
  signinUserAuthController,
  signupUserAuthController,
};
