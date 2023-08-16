// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');

// Define table users
const TABLE = 'users';

// List data
async function getUserslistCase() {
  return gateway.getAll(TABLE);
}

// Get by id
async function getUserByIdCase(id) {
  return gateway.get(TABLE, id);
}

// Add
async function addUserCase(newData) {
  return gateway.add(TABLE, newData);
}

// Update by id
async function updateUserCase(id, newData) {
  return gateway.update(TABLE, id, newData);
}

// Remove by id
async function removeUserCase(id) {
  return gateway.remove(TABLE, id);
}

// Exports
module.exports = {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
};
