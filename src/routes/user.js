const express = require('express');
const Client = require('../client');

const router = express.Router();

const client = new Client();

router.get('/user', (req, res) => {
  res.send(client.yourFavoriteHours);
})

module.exports = router;