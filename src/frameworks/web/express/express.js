// Imports
const express = require('express')
const config = require('@src/utils/config')
const rootRoute = require('./routes/rootRoute')

// Instance express app
const app = express()

// Use routes
app.use('/', rootRoute)

// Listen
app.listen(config.frameworks.web.express.port, () => {
    const message = `Server running in mode: ${config.enviroment} at port: ${config.frameworks.web.express.port}.`
    console.log(message)
})