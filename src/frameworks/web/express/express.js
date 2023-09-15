// Imports
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const config = require('@src/utils/statics/config');
const paths = require('@src/utils/statics/paths');
const swagger = require('@src/frameworks/UI/swagger/swagger');
const rootRoute = require('./routes/rootRoute');
const errorMiddleware = require('./middelwares/errorMiddleware');
const pathNoFoundMiddleware = require('./middelwares/pathNoFoundMiddleware');

// Instance express app
const app = express();

// Middlewares standard
app.use(express.json()); // Format Json Data
app.use(cors()); // Allow comunication of all origins
app.use(express.static('public')); // Allow static files on public (For Swagger)

// Use routes
app.use(paths.apiDocs.path, swagger.serve, swagger.UISetup); // Use Swagger UI
app.use(paths.root.path, rootRoute.router); // Use API Routes

// Manage no existing paths
app.use(pathNoFoundMiddleware);

// Manage errors
app.use(errorMiddleware);

// Listen
app.listen(config.frameworks.web.express.port, () => {
  const message = `Server running in mode: ${config.enviroment} at port: ${config.frameworks.web.express.port}.`;
  // eslint-disable-next-line no-console
  console.log(message);
});
