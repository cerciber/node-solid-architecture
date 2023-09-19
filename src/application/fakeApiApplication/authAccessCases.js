// Imports
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/fakeApiEntities/Auth');
const paths = require('@src/utils/statics/paths');
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway');

// Define tables names
const AUTH_USERS_TABLE = 'authUsers';
const ROLS_TABLE = 'rols';

// Check if permissions are valid to path and method
function validatePermissions(basePath, method, permissions) {
  // Check if data have correct structure
  if (
    typeof basePath !== 'string' ||
    typeof method !== 'string' ||
    !Array.isArray(permissions)
  ) {
    return false;
  }

  // Get path key
  const foundKey = Object.keys(paths).find(
    (key) => paths[key]?.path === basePath
  );

  // Check if path not exist
  if (!foundKey) {
    return false;
  }

  // Check if path and method are valid on permissions
  const valid = permissions.some(
    (permission) =>
      Array.isArray(permission.pathKeys) &&
      (permission.pathKeys.includes('*') ||
        permission.pathKeys.includes(foundKey)) &&
      Array.isArray(permission.methods) &&
      (permission.methods.includes('*') || permission.methods.includes(method))
  );

  // Return if is valid
  return valid;
}

// validate Public path case
async function getPathDataCase(path) {
  // get key form path
  const foundKey = Object.keys(paths).find((key) => paths[key]?.path === path);

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
    return response.success(
      401,
      'Access to this resource not allowed. Bad token.',
      {}
    );
  }

  // Check if token have id
  if (!payload.id) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Token payload id no exist',
      {}
    );
  }

  // Get gateway data
  const gatewayUserAuth = await gateway.getByAttributes(AUTH_USERS_TABLE, {
    id: payload.id,
  });

  // Check if user was found
  if (!gatewayUserAuth || gatewayUserAuth.length === 0) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Auth user not exist.',
      {}
    );
  }

  // Get authorization
  const authorization = gatewayUserAuth[0]?.authorization;

  // Check if user has authorization configuration
  if (
    !authorization?.type ||
    !(
      (authorization?.type === 'rol' &&
        typeof authorization?.rol === 'string') ||
      (authorization?.type === 'custom' &&
        Array.isArray(authorization?.permissions))
    )
  ) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Bad authorization configuration structure.',
      {}
    );
  }

  // Get permisions
  let permissions;
  if (authorization.type === 'rol') {
    // Get gateway data
    const gatewayRol = await gateway.getByAttributes(ROLS_TABLE, {
      key: authorization.rol,
    });

    // Check if rol was found
    if (!gatewayRol || gatewayRol.length === 0) {
      // Return response
      return response.success(
        401,
        'Access to this resource not allowed. Rol not exist.',
        {}
      );
    }

    // Set permissions
    permissions = gatewayRol[0].permissions;
  } else {
    // Set permissions
    permissions = authorization.permissions;
  }

  // Check if user have authorization to this request
  if (!validatePermissions(basePath, method, permissions)) {
    // Return response
    return response.success(
      401,
      `Access to this resource not allowed. No permissions to [${method}]:${basePath}.`,
      {}
    );
  }

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
