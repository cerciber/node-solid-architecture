// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const { list } = require('@src/adapters/controllers/listController')

// Instance router
const router = express.Router()

// Activate path request 
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Peticion a la raiz', list())
})

// Exports
module.exports = router
