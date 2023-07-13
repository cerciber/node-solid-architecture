// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway')

// Define table users
const TABLE = 'users'

// List data
function list() {
    return gateway.list(TABLE)
}

// Get by id
function get(id) {
    return gateway.get(TABLE, id)
}

// Add
function add(newData) {
    return gateway.add(TABLE, newData)
}

// Update by id
function update(id, newData) {
    return gateway.update(TABLE, id, newData)
}

// Remove by id
function remove(id) {
    return gateway.remove(TABLE, id)
}

// Exports
module.exports = {
    list,
    get,
    add,
    update,
    remove
}