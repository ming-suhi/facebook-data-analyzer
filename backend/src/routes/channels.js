const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();

// Years by no of messages sent
router.get('/user/channels/rankedByMessages', (req, res) => {
  res.send(client.channelsByYourSentMessages);
});

module.exports = router;