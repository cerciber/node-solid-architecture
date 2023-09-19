// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@src/adapters/presenters/response');

// Define table users
const TABLE = 'users';

// List data
async function getUserslistCase() {
  // Get gateway data
  const gatewayUsers = await gateway.getAll(TABLE);

  // Format data to schema
  const usersSchema = gatewayUsers.map((user) => {
    return { id: user.id, name: user.name };
  });

  // Return response
  return response.success(200, 'Users retrieved successfully.', {
    users: usersSchema,
  });
}

// Get by id
async function getUserByIdCase(id) {
  // Get gateway data
  const gatewayUser = await gateway.get(TABLE, id);

  // Check if user exist
  if (gatewayUser) {
    // Format data to schema
    const userSchema = { id: gatewayUser.id, name: gatewayUser.name };

    // Return response
    return response.success(200, 'User retrieved successfully.', {
      user: userSchema,
    });
  }

  // Return response
  return response.success(404, 'User no exist.', {});
}

// Add
async function addUserCase(newData) {
  // Add gateway data
  const gatewayUserAdded = await gateway.add(TABLE, newData);

  // User added
  if (gatewayUserAdded.status === 201) {
    return response.success(201, 'User registered successfully.', {});
  }

  // User already exist
  if (gatewayUserAdded.status === 409) {
    return response.success(409, 'User already exist.', {});
  }

  // Return response
  return gatewayUserAdded;
}

// Update by id
async function updateUserCase(id, newData) {
  // Update gateway data
  const updatedUser = await gateway.update(TABLE, id, newData);

  // Check if user wasn't updated
  if (!updatedUser) {
    // Return response
    return response.success(404, 'User no exist.', {});
  }

  // Return response
  return response.success(200, 'User updated successfully.', {});
}

// Remove by id
async function removeUserCase(id) {
  // Delete gateway data
  const deletedUser = await gateway.remove(TABLE, id);

  // Check if user exist
  if (!deletedUser) {
    // Return response
    return response.success(404, 'User no exist.', {});
  }

  // Return response
  return response.success(200, 'User deleted successfully.', {});
}

// Exports
module.exports = {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
};
