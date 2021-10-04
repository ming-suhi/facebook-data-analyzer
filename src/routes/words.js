const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();

// No of words sent
router.get('/user/words/sent', (req, res) => {
  res.send(client.wordsSent.toString());
});

// Words sent by occurences
router.get('/user/words/occurences/chart-data', (req, res) => {
  res.send(client.wordOccurences);
});

module.exports = router;