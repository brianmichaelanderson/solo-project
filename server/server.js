const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routes/api');

const PORT = 3000;

// CORS (Cross Origin Resource Sharing) Middleware
app.use(
  cors({
    origin: 'http://localhost:8080', // Specify the origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    //works with the below headers commented out
    //   'Accept',
    //   'Origin',
    //   'X-Requested-With',
    ], // Defining allowed headers
  })
);

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
//Access Webpack build in the 'dist' folder:
app.use(express.static(path.resolve(__dirname, 'dist')));

/**
 * define route handlers
 */
// mount
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((_req, res) => res.status(404).send('Unknown route...'));

// // Suggestion from ChatGPT -> Catch-all route handler for serving the React app for unknown routes.  Sends them back to index.html.  Should make a Not Found Component if using this.
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
//   });

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, _req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
