import "./configs/dotenvConfig.js";

import cors from "cors";
import express from "express";
import http from "http";
import { Server as Socket } from "socket.io";

import corsConfig from "./configs/corsConfig.js";
import authProxyRoute from "./routes/authProxyRoute.js";
const __PORT = process.env.PORT;

// Handlers
import createRoomHandler from "./socket-handlers/createRoomHandler.js";
import joinRoomHandler from "./socket-handlers/joinRoomHandler.js";

const app = express();
const server = http.createServer(app);

const io = new Socket(server, {
	cors: corsConfig.origin, // WS cors configuration
});

// HTTP cors configuration
app.use(
	cors({
		origin: corsConfig.origin,
		credentials: true,
	})
);

io.on("connection", (client) => {
	client.emit("connected", client.id);

	client.on("create-room", (payload) => {
		createRoomHandler({ io, client, payload });
	});

	client.on("join-room", (payload) => {
		joinRoomHandler({ io, client, payload });
	});
});

// Routes
app.use(authProxyRoute);

// Send status 'forbidden' for every unhandled route
app.use((req, res, next) => {
	res.sendStatus(403);
});

server.listen(__PORT, () => {
	console.log(`Server active at port : ${__PORT}`);
});
