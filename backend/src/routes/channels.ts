import express from "express";
import client from "../client-consumer";

export const channelsRouter = express.Router();

channelsRouter.get('/user/channels/rankedByMessages', (req, res) => {
  res.send(client.channelsByYourSentMessages.slice(0, 10));
});