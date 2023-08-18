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
} = require('@src/adapters/controllers/schemas/schemaController');

// List data
async function getUserslistController() {
  return getUserslistCase();
}

// Get by id
async function getUserByIdController(id) {
  const user = await getUserByIdCase(id);
  const userValidation = validateSchema('User', user);
  if (userValidation.valid) {
    return user;
  }
  return response.error(200, 'User not have correct structure.', {});
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
