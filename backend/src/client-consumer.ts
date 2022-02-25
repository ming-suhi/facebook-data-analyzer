import Client from "./structures/client";
import dotenv from 'dotenv';

dotenv.config();
const client = new Client(process.env.CATALOG_DIRECTORY!);

export default client;