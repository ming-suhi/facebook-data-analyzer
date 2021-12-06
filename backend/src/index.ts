import express from "express";
import dotenv from "dotenv";
import { channelsRouter, messagesRouter, wordsRouter  } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', messagesRouter);
app.use('/', channelsRouter);
app.use('/', wordsRouter);

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => console.log(`Backend server listening on port ${port}`));