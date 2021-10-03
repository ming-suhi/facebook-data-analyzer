const express = require('express');
const userRouter = require('./routes/user');
const messagesRouter = require('./routes/messages');
const channelsRouter = require('./routes/channels');
const wordsRouter = require('./routes/words');
const Client = require('./client');

// Create client
const client = new Client();

// Create express app
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set views directory to current directoy
app.set('views', __dirname);
app.use(express.json());
app.use(express.static(__dirname));

// Render page
app.get('/', (req, res) => {
  res.render('index', {client: client});
});

// Attach routes
app.use('/', userRouter);
app.use('/', messagesRouter);
app.use('/', channelsRouter);
app.use('/', wordsRouter);

// Start server
app.listen(8000, () => console.log("Server listening on port 8000"));