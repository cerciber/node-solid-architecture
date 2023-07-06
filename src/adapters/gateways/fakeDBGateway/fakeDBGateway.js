// Imports
let { database } = require('@src/frameworks/DB/fakeDB/fakeDB')
  
// List data
function list(tableName) {
    return database[tableName] || [];
}
  
// Get by id
function get(tableName, id) {
    const table = database[tableName];
    if (table) {
      return table.find((item) => item.id === id);
    }
    return null;
}
  
// Update by id
function update(tableName, id, newData) {
    const table = database[tableName];
    if (table) {
      const index = table.findIndex((item) => item.id === id);
      if (index !== -1) {
        table[index] = { ...table[index], ...newData };
        return true;
      }
    }
    return false;
}
  
// Remove by id
function remove(tableName, id) {
    const table = database[tableName];
    if (table) {
      const initialLength = table.length;
      database[tableName] = table.filter((item) => item.id !== id);
      return database[tableName].length !== initialLength;
    }
    return false;
}

module.exports = {
    list,
    get,
    update,
    remove
}