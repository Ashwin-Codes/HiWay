import axios from "axios";
import routes from "../configs/routes.js";
import uuid from "../utils/uuid.js";

export default async function createRoomHandler({ io, client, payload }) {
	const accessToken = payload.accessToken;

	function isUnique(id) {
		if (io.sockets.adapter.rooms.has(id)) {
			return false;
		}
		return true;
	}

	try {
		const response = await axios.post(routes.verifyUser, { accessToken });
		if (response.data.userIsValid) {
			const roomId = uuid.generate(isUnique);
			client.join(roomId);
			client.chatroom = roomId;
			client.emit("room-created", roomId);

			// Room Data
			const users = Array.from(io.sockets.adapter.rooms.get(roomId));
			client.emit("room-users", users);
			return;
		}
		client.emit("socket-error");
	} catch (err) {
		client.emit("socker-error");
	}
}
