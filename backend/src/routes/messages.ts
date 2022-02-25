import express from "express";
import client from "../client-consumer";

export const messagesRouter = express.Router();

messagesRouter.get('/user/messages/encountered', (req, res) => {
  res.send(client.totalMessages.toString());
});

messagesRouter.get('/user/messages/sent', (req, res) => {
  res.send(client.messagesSentCount.toString());
});

messagesRouter.get('/user/messages/received', (req, res) => {
  res.send(client.messagesReceivedCount.toString());
});

messagesRouter.get('/user/messages/sent-per-hour/chart-data', (req, res) => {
  const labels = [
    "12AM", "1AM", "2AM", "3AM", "4AM", "5AM",
    "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
    "12PM", "1PM", "2PM", "3PM", "4PM", "5PM",
    "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"
  ];
  const datasets = [{
    label: "Messages Sent",
    data: client.messagesSentPerHour.map(hour => hour.count),
    backgroundColor: "rgba(51, 119, 191, 0.2)",
    borderColor: "rgba(51, 119, 191, 1)",
    borderWidth: 1
  }];
  const plugins = {
    title: {
      display: true, 
      text: "Total Messages Sent Per Hour"
    },
    legend: {
      position: "bottom"
    }
  };
  const responsive = true;
  res.send({data: {labels, datasets}, options: {plugins, responsive}});
});

messagesRouter.get('/user/messages/sent-per-year/chart-data', (req, res) => {
  const labels = client.messagesSentPerYear.map(year => year.name.toString());
  const datasets = [{
    label: "Messages Sent",
    data: client.messagesSentPerYear.map(year => year.count.toString()),
    backgroundColor: "rgba(51, 119, 191, 0.2)",
    borderColor: "rgba(51, 119, 191, 1)",
    borderWidth: 1
  }];
  const indexAxis = "y";
  const plugins = {
    title: {
      display: true, 
      text: "Total Messages Sent Per Year"
    },
    legend: {
      position: "top"
    }
  };
  res.send({data: {labels, datasets}, options: {indexAxis, plugins}});
});