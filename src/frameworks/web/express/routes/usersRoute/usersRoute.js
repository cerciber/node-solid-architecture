// Imports
const express = require('express')
const response = require('@src/frameworks/web/express/response')
const { list, get, add, update, remove } = require('@src/adapters/controllers/userController')

// Instance router
const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - user
 *     summary: Get the list of users
 *     description: Returns a list of all registered users.
 *     responses:
 *       200:
 *         description: List of users obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *               properties:
 *                 body:
 *                    $ref: '#/components/schemas/Users'
 *       500:
 *         description: An error occurred while getting the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *               properties:
 *                 message: 'An error occurred while getting the list of users.'
 */
router.get('/', (req, res) => {
    response.success(req, res, 200, 'Usuarios obtenidos correctamente.', list())
})

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario obtenido correctamente.', get(userId))
})

router.post('/', (req, res) => {
    const newUser = req.body;
    response.success(req, res, 200, 'Usuario creado correctamente.', add(newUser))
})

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', update(userId, updatedUser))
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    response.success(req, res, 200, 'Usuario actualizado correctamente.', remove(userId))
});


// Exports
module.exports = router
