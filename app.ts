import dotenv from 'dotenv';
import Server from "./modules/server";
dotenv.config();

const server = new Server();

server.listen();