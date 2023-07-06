// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const usersRoute = require('./usersRoute/usersRoute')

// Instance router
const router = express.Router()

// Include subpaths
router.use('/users', usersRoute)

// Default request
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Peticion a la raiz realizada correctamente.', list())
})

// Exports
module.exports = router
