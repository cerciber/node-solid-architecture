// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/Auth');
const AuthUser = require('@src/entities/AuthUser');

// Define table users auth
const TABLE = 'authUsers';

// Get by id
async function signinUserAuthCase(username, password) {
  // Get gateway data
  const gatewayUserAuth = await gateway.getByAttributes(TABLE, {
    username,
  });

  // Check if username is incorrect
  if (!gatewayUserAuth || gatewayUserAuth.length === 0) {
    // Return response
    return response.success(404, 'User Auth incorrect.', {});
  }

  // Instance AuthUser entity
  const authUser = new AuthUser(
    undefined,
    gatewayUserAuth.username,
    gatewayUserAuth.password,
    false
  );

  // Check if password is incorrect
  if (!authUser.comparePassword(password)) {
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
  // Instance AuthUser entity
  const authUser = new AuthUser(undefined, username, password, false);

  // Add gateway data
  const gatewayUserAdded = await gateway.add(TABLE, {
    username: authUser.username,
    password: authUser.getPassword(),
  });

  // Check if user exist
  if (!gatewayUserAdded) {
    // Return response
    return response.success(409, 'User Auth already exist.', {});
  }

  // Return response
  return response.success(201, 'User Auth registered successfully.', {});
}

// Exports
module.exports = {
  signinUserAuthCase,
  signupUserAuthCase,
};
