// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/Auth');

// Define table users auth
const TABLE = 'authUsers';

// Get by id
async function signinUserAuthCase(username, password) {
  // Get gateway data
  const gatewayUserAuth = await gateway.getByAttributes(TABLE, {
    username,
    password,
  });

  // Check if username or password is incorrect
  if (!gatewayUserAuth) {
    // Return response
    return response.success(404, 'User Auth incorrect.', {});
  }

  // Generate token
  const tokenSchema = new Auth().generateToken({ id: gatewayUserAuth.id });

  // Return response
  return response.success(200, 'User Auth retrieved successfully.', {
    token: tokenSchema,
  });
}

// Add
async function signupUserAuthCase(username, password) {
  // Add gateway data
  const gatewayUserAdded = await gateway.add(TABLE, { username, password });

  // Check if user exist
  if (!gatewayUserAdded) {
    // Return response
    return response.success(409, 'User Auth already exist.');
  }

  // Return response
  return response.success(200, 'User Auth registered successfully.');
}

// Exports
module.exports = {
  signinUserAuthCase,
  signupUserAuthCase,
};
