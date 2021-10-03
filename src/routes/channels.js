const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();

module.exports = router;