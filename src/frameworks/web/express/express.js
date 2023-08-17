// Imports
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const config = require('@src/utils/config');
const swagger = require('@src/frameworks/UI/swagger/swagger');
const rootRoute = require('./routes/rootRoute');
const errorMiddleware = require('./middelwares/errorMiddleware');

// Instance express app
const app = express();

// Middlewares
app.use(express.json()); // Format Json Data
app.use(cors()); // Allow comunication of all origins
app.use(express.static('public')); // Allow static files on public (For Swagger)

// Use routes
app.use('/api-docs', swagger.serve, swagger.UISetup); // Use Swagger UI
app.use('/', rootRoute); // Use API Routes

// Manage errors
app.use(errorMiddleware);

// Listen
app.listen(config.frameworks.web.express.port, () => {
  const message = `Server running in mode: ${config.enviroment} at port: ${config.frameworks.web.express.port}.`;
  console.log(message);
});
