// Imports
const gateway = require('@src/adapters/gateways/fakeDBGateway/fakeDBGateway')

const TABLE = 'users'

function list() {
    return gateway.list(TABLE)
}

module.exports = {
    list
}