import express from "express";
import client from "../client-consumer";

export const wordsRouter = express.Router();

wordsRouter.get('/user/words/sent', (req, res) => {
  res.send(client.wordsSentCount.toString());
});

wordsRouter.get('/user/words/occurences', (req, res) => {
  res.send(client.wordsOccurences.slice(0, 10));
});