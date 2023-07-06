// Imports
const express = require('express')
const config = require('@src/utils/config')

// Instance express app
const app = express()

// Listen
console.log(config)
app.listen(config.frameworks.web.express.port, () => {
    const message = `Server running in mode: ${config.enviroment} at port: ${config.frameworks.web.express.port}.`
    console.log(message)
})