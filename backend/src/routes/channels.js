const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();
const channelsByYourSentMessages = client.channelsByYourSentMessages;

// Years by no of messages sent
router.get('/user/channels/rankedByMessages', (req, res) => {
  res.send(channelsByYourSentMessages);
});

module.exports = router;