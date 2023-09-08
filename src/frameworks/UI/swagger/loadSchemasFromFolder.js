// Imports
const fs = require('fs');

// Load schemas from folder
function loadSchemasFromFolder(folderPath) {
  // Create object to store schemas
  const schemas = {};

  // Get absolute path from alias
  const absoluteCurrentPathParts = __dirname.split('\\src');
  const srcPath = absoluteCurrentPathParts
    .slice(0, absoluteCurrentPathParts.length - 1)
    .join('\\src');
  const aliasPathCorrection = folderPath
    .replace(/@/, '\\')
    .replace(/\//g, '\\');
  const absolutePath = srcPath + aliasPathCorrection;

  // Read files
  const files = fs.readdirSync(absolutePath);

  // Add schemas to object
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const schema = require(`${folderPath}/${file}`);
      const schemaName = Object.keys(schema)[0];
      schemas[schemaName] = schema[schemaName];
    }
  });

  // Return schemas object
  return schemas;
}

// Exports
module.exports = loadSchemasFromFolder;
