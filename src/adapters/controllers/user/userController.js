// Imports
const {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
} = require('@src/application/userCases');

// List data
async function getUserslistController() {
  return getUserslistCase();
}

// Get by id
async function getUserByIdController(id) {
  return getUserByIdCase(id);
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
