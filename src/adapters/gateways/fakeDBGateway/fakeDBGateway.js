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
  if (table) {
    return table.find((item) => item.id === id);
  }
  return null;
}

// Add
async function add(tableName, newItem) {
  const table = database[tableName];
  if (table) {
    const newId = uuidv4();
    const newItemWithId = { id: newId, ...newItem };
    table.push(newItemWithId);
    return newItemWithId;
  }
  return null;
}

// Update by id
async function update(tableName, id, newData) {
  const table = database[tableName];
  if (table) {
    const index = table.findIndex((item) => item.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...newData };
      return table[index];
    }
  }
  return undefined;
}

// Remove by id
async function remove(tableName, id) {
  const table = database[tableName];
  if (table) {
    const index = table.findIndex((item) => item.id === id);
    if (index !== -1) {
      database[tableName] = table.filter((item) => item.id !== id);
      return table[index];
    }
  }
  return undefined;
}

// Exports
module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
