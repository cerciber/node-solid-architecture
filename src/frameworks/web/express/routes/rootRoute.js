// Imports
const express = require('express')

// Instance router
const router = express.Router()

// Activate path request 
router.get('/', (req, res) => {
    res.send('Root')
})

// Exports
module.exports = router
