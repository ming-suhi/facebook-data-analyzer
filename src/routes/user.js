const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();

// User full name
router.get('/user/name', (req, res) => {
  res.send(client.name);
});

// User account created date
router.get('/user/registeredDate', (req, res) => {
  res.send(client.registeredDate);
});

module.exports = router;