// Imports
const { v4: uuidv4 } = require('uuid');
const { database } = require('@src/frameworks/DB/fakeDB/fakeDB');

// List data
async function getAll(tableName) {
  return database[tableName] || [];
}

// Get by id
async function get(tableName, id) {
  const table = database[tableName];
  if (!table) {
    return null;
  }
  return table.find((item) => item.id === id);
}

// Get by attributes
async function getByAttributes(tableName, attributes) {
  const table = database[tableName];
  if (!table) {
    return null;
  }
  return table.filter((item) => {
    const attributeKeys = Object.keys(attributes);
    return attributeKeys.every((key) => item[key] === attributes[key]);
  });
}

// Add
async function add(tableName, newItem) {
  const table = database[tableName];
  if (!table) {
    return null;
  }
  const newId = uuidv4();
  const newItemWithId = { id: newId, ...newItem };
  table.push(newItemWithId);
  return newItemWithId;
}

// Update by id
async function update(tableName, id, newData) {
  const table = database[tableName];
  if (!table) {
    return null;
  }
  const index = table.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  table[index] = { ...table[index], ...newData };
  return table[index];
}

// Remove by id
async function remove(tableName, id) {
  const table = database[tableName];
  if (!table) {
    return null;
  }
  const index = table.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  database[tableName] = table.filter((item) => item.id !== id);
  return table[index];
}

// Exports
module.exports = {
  getAll,
  get,
  getByAttributes,
  add,
  update,
  remove,
};
