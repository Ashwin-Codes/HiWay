import "./configs/dotenvConfig.js";

import cors from "cors";
import express from "express";
import http from "http";
import { Server as Socket } from "socket.io";

import corsConfig from "./configs/corsConfig.js";
import authProxyRoute from "./routes/authProxyRoute.js";
const __PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

const io = new Socket(server, {
	cors: corsConfig.origin, // WS cors configuration
});

// HTTP cors configuration
app.use(
	cors({
		origin: corsConfig.origin,
	})
);

// Routes
app.use(authProxyRoute);

// Send status 'forbidden' for every unhandled route
app.use((req, res, next) => {
	res.sendStatus(403);
});

server.listen(__PORT, () => {
	console.log(`Server active at port : ${__PORT}`);
});
