// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const usersRoute = require('./usersRoute/usersRoute')

// Instance router
const router = express.Router()

// Default request
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Peticion a la raiz realizada correctamente.', {})
})


// Include subpaths
router.use('/users', usersRoute)

// Exports
module.exports = router
