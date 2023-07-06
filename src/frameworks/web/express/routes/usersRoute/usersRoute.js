// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const { list, get, add, update, remove } = require('@src/adapters/controllers/userController')

// Instance router
const router = express.Router()

// Get users list
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Usuarios obtenidos correctamente.', list())
})

// Get users by id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario obtenido correctamente.', get(userId))
})

// Create user
router.post('/', (req, res) => {
    const newUser = req.body;
    response.success(req, res, 200, 'Usuario creado correctamente.', add(newUser))
})

// Update user
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', update(userId, updatedUser))
});

// Update user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', remove(userId))
});


// Exports
module.exports = router
