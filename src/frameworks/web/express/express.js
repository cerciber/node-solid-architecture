// Imports
const express = require('express')
const cors = require('cors')
const config = require('@src/utils/config')
const rootRoute = require('./routes/rootRoute')
const swagger = require('@src/frameworks/UI/swagger/swagger')

// Instance express app
const app = express()

// Middlewares
app.use(express.json()) // Format Json Data
app.use(cors()) // Allow comunication of all origins

// Use routes
app.use('/api-docs', swagger.serve, swagger.UISetup) // Use Swagger UI
app.use('/', rootRoute) // Use API Routes

// Listen
app.listen(config.frameworks.web.express.port, () => {
    const message = `Server running in mode: ${config.enviroment} at port: ${config.frameworks.web.express.port}.`
    console.log(message)
})