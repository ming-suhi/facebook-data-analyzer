const Client = require('./client');
const express = require('express');

const client = new Client();
const app = express();

console.table(client.yourFavoriteHours);

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set views directory to current directoy
app.set('views', __dirname);

// Render page
app.get('/', (req, res) => {
  res.render('index', {
    client: client
  });
})

// Start server
app.listen(8000);