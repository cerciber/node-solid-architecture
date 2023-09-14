// Imports
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/Auth');
const paths = require('@src/utils/statics/paths');
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');

// Define table users auth
const TABLE = 'authUsers';

// validate Public path case
async function getPathDataCase(path) {
  // Decode token
  const foundKey = Object.keys(paths).find((key) => paths[key].path === path);

  // Check if path not exist
  if (!foundKey) {
    // Return response
    return response.success(404, 'This path not exist.', {});
  }

  // Check if path is private
  if (!paths[foundKey].public) {
    // Return response
    return response.success(401, 'This path is private.', {});
  }

  // Return response
  return response.success(200, 'This path is public.', {});
}

// validate Access Case
async function validateAccessCase(basePath, method, token) {
  // Decode token
  const payload = new Auth().decodeToken(token);

  // Check if token not was decoded
  if (!payload) {
    // Return response
    return response.success(401, 'Access to this resource not allowed.', {});
  }

  // Check if token have id
  if (!payload.id) {
    // Return response
    return response.success(401, 'Access to this resource not allowed.', {});
  }

  // Get gateway data
  const gatewayUserAuth = await gateway.getByAttributes(TABLE, {
    id: payload.id,
  });

  // Check if user was found
  if (!gatewayUserAuth || gatewayUserAuth.length === 0) {
    // Return response
    return response.success(401, 'Access to this resource not allowed.', {});
  }

  // Get authorization
  const authorization = gatewayUserAuth[0]?.authorization;

  // Check if user has authorization configuration
  if (
    !(
      authorization?.type ||
      !(
        authorization?.type === 'rol' && typeof authorization?.rol === 'string'
      ) ||
      !(
        authorization?.type === 'custom' &&
        Array.isArray(authorization?.permissions)
      )
    )
  ) {
    // Return response
    return response.success(401, 'Access to this resource not allowed.', {});
  }

  // If rol, get rol authorization configuration

  // Check if user have authorization to this request
  console.log(gatewayUserAuth);

  // Return response
  return response.success(200, 'Access to this resource allowed.', {
    tokenPayload: payload,
  });
}

// Exports
module.exports = {
  validateAccessCase,
  getPathDataCase,
};
