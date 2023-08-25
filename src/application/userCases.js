// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@response');

// Define table users
const TABLE = 'users';

// List data
async function getUserslistCase() {
  const users = await gateway.getAll(TABLE);
  return response.success(200, 'Users retrieved successfully.', { users });
}

// Get by id
async function getUserByIdCase(id) {
  const user = await gateway.get(TABLE, id);
  if (user) {
    return response.success(200, 'User retrieved successfully.', {
      user,
    });
  }
  return response.success(404, 'User no exist.', {});
}

// Add
async function addUserCase(newData) {
  const user = await gateway.get(TABLE, newData.id);
  if (user) {
    return response.success(409, 'User already exist.', {
      user,
    });
  }
  const userAdded = await gateway.add(TABLE, newData);
  console.log(userAdded);
  return response.success(200, 'User added successfully.', {
    user: userAdded,
  });
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
