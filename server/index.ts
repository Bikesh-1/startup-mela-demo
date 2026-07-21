import "dotenv/config";
import express from "express";
import http from "http";
import { initSocket } from "./socket";
import { registerSocketHandlers } from "./socketHandler";

const app = express();
const server = http.createServer(app);
const io = initSocket(server);
registerSocketHandlers(io);
server.listen(3001);