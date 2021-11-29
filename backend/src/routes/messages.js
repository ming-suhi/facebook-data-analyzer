const express = require('express');
const Client = require('../client');

// Create router
const router = express.Router();

// Create client
const client = new Client();
const messagesEncountered = client.messagesEncountered;
const messagesSent = client.messagesSent;
const messagesReceived = client.messagesReceived;
const messagesSentPerHour = client.messagesSentPerHour;
const messagesSentPerYear = client.messagesSentPerYear;

// No of messages encountered 
router.get('/user/messages/encountered', (req, res) => {
  res.send(messagesEncountered.toString());
});

// No of messages sent
router.get('/user/messages/sent', (req, res) => {
  res.send(messagesSent.toString());
});

// No of messages received
router.get('/user/messages/received', (req, res) => {
  res.send(messagesReceived.toString());
});

// Hours by no of messages sent
router.get('/user/messages/sent-per-hour/chart-data', (req, res) => {
  
  // Define type
  const type = "bar";

  // Define datas
  const labels = messagesSentPerHour.map(hour => hour.label);
  const datasets = [{
    label: "Messages Sent",
    data: messagesSentPerHour.map(hour => hour.count),
    backgroundColor: "rgba(51, 119, 191, 0.2)",
    borderColor: "rgba(51, 119, 191, 1)",
    borderWidth: 1
  }];

  // Define options
  const title = {display: true, text: "Total Messages Sent Per Hour"};
  const legend = {position: "bottom"};
  const plugins = {legend, title};

  // Build chart
  const data = {type, data: {labels, datasets}, options: {plugins}};

  // Send response
  res.send(data);
});

// Years by no of messages sent
router.get('/user/messages/sent-per-year/chart-data', (req, res) => {

  // Define type
  const type = "bar";

  // Define datas
  const labels = messagesSentPerYear.map(year => `${year.name}`);
  const datasets = [{
    label: "Messages Sent",
    data: messagesSentPerYear.map(year => year.count),
    backgroundColor: "rgba(51, 119, 191, 0.2)",
    borderColor: "rgba(51, 119, 191, 1)",
    borderWidth: 1
  }];

  // Define options
  const indexAxis = "y";
  const title = {display: true, text: "Total Messages Sent Per Year"};
  const legend = {position: "top"};
  const plugins = {legend, title};

  // Build chart
  const data = {type, data: {labels, datasets}, options: {indexAxis, plugins}};

  // Send response
  res.send(data);
});

module.exports = router;