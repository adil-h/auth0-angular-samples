const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/env', function(req, res) {
  const { AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;
  if (!AUTH0_CLIENT_ID && !AUTH0_DOMAIN) {
    return res.status(400).json({ message: 'No env set.' });
  }
  res.json({ AUTH0_CLIENT_ID, AUTH0_DOMAIN });
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);