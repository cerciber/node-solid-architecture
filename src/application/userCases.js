// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@src/adapters/presenters/response');
const User = require('@src/entities/User');

// Define table users
const TABLE = 'users';

// List data
async function getUserslistCase() {
  // Get gateway data
  const gatewayUsers = await gateway.getAll(TABLE);

  // Convert data to entities
  const users = gatewayUsers.map((gatewayUser) => {
    const user = new User(gatewayUser.id, gatewayUser.name);
    return user;
  });

  // Specific bussiness logic...

  // Format entities to data
  const usersSchema = users.map((user) => {
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
    // Convert data to entities
    const user = new User(gatewayUser.id, gatewayUser.name);

    // Specific bussiness logic...

    // Format entities to data
    const userSchema = { id: user.id, name: user.name };

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
  // Get gateway data
  const gatewayUser = await gateway.get(TABLE, newData.id);

  // Check if user exist
  if (gatewayUser) {
    // Add gateway data
    const gatewayUserAdded = await gateway.add(TABLE, newData);

    // Convert data to entities
    const user = new User(gatewayUserAdded.id, gatewayUserAdded.name);

    // Specific bussiness logic...

    // Format entities to data
    const userSchema = { id: user.id, name: user.name };

    // Return response
    return response.success(409, 'User already exist.', {
      user: userSchema,
    });
  }

  // Convert data to entities
  const user = new User(gatewayUser.id, gatewayUser.name);

  // Specific bussiness logic...

  // Format entities to data
  const userSchema = { id: user.id, name: user.name };

  // Return response
  return response.success(200, 'User added successfully.', {
    user: userSchema,
  });
}

// Update by id
async function updateUserCase(id, newData) {
  // Update gateway data
  const updatedUser = await gateway.update(TABLE, id, newData);

  // Check if user was updated
  if (updatedUser) {
    // Convert data to entities
    const user = new User(updatedUser.id, updatedUser.name);

    // Specific bussiness logic...

    // Format entities to data
    const userSchema = { id: user.id, name: user.name };

    // Return response
    return response.success(200, 'User retrieved successfully.', {
      user: userSchema,
    });
  }

  // Return response
  return response.success(404, 'User no exist.', {});
}

// Remove by id
async function removeUserCase(id) {
  // Delete gateway data
  const deletedUser = await gateway.remove(TABLE, id);

  // Check if user exist
  if (deletedUser) {
    // Convert data to entities
    const user = new User(deletedUser.id, deletedUser.name);

    // Specific bussiness logic...

    // Format entities to data
    const userSchema = { id: user.id, name: user.name };

    return response.success(200, 'User retrieved successfully.', {
      user: userSchema,
    });
  }
  return response.success(404, 'User no exist.', {});
}

// Exports
module.exports = {
  getUserslistCase,
  getUserByIdCase,
  addUserCase,
  updateUserCase,
  removeUserCase,
};
