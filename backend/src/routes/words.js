const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();
const wordsSent = client.wordsSent;
const wordsOccurences = client.wordsOccurences.slice(0, 10);

// No of words sent
router.get('/user/words/sent', (req, res) => {
  res.send(wordsSent.toString());
});

// Words sent by occurences
router.get('/user/words/occurences', (req, res) => {
  res.send(wordsOccurences);
});

module.exports = router;