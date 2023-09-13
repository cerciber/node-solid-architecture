// Imports
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/Auth');
const paths = require('@src/utils/statics/paths');

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
async function validateAccessCase(token) {
  // Decode token
  const payload = new Auth().decodeToken(token);

  // Check if token not was decoded
  if (!payload) {
    // Return response
    return response.success(401, 'Access to this resource not allowed.', {});
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
