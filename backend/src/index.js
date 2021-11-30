const express = require('express');
const dotenv = require('dotenv');
const messagesRouter = require('./routes/messages');
const channelsRouter = require('./routes/channels');
const wordsRouter = require('./routes/words');

// Set env variables
dotenv.config();

// Create express app
const app = express();

// Set views directory to current directoy
app.use(express.json());
app.use(express.static(__dirname));

// Render page
app.get('/', (req, res) => {
  res.render('index');
});

// Attach routes
app.use('/', messagesRouter);
app.use('/', channelsRouter);
app.use('/', wordsRouter);

// Start server
const port = parseInt(process.env.PORT) || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));