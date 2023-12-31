// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/fakeApiEntities/Auth');
const AuthUser = require('@src/entities/fakeApiEntities/AuthUser');

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
    gatewayUserAuth[0].username,
    gatewayUserAuth[0].password,
    true
  );

  // Check if password is incorrect
  if (!(await authUser.comparePassword(password))) {
    // Return response
    return response.success(404, 'User Auth incorrect.', {});
  }

  // Generate token
  const tokenSchema = new Auth().generateToken({ id: gatewayUserAuth[0].id });

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
  const gatewayUserAuthAdded = await gateway.add(TABLE, {
    username: authUser.username,
    password: authUser.getPassword(),
  });

  // User added
  if (gatewayUserAuthAdded.status === 201) {
    return response.success(201, 'User Auth registered successfully.', {});
  }

  // User already exist
  if (gatewayUserAuthAdded.status === 409) {
    return response.success(409, 'User Auth already exist.', {});
  }

  // Return response
  return gatewayUserAuthAdded;
}

// Exports
module.exports = {
  signinUserAuthCase,
  signupUserAuthCase,
};
