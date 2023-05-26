export default async function joinRoomHandler({ io, client, payload }) {
	const roomId = payload.roomId;
	const roomExists = io.sockets.adapter.rooms.has(roomId);
	if (!roomExists) {
		client.emit("wrong-room-code");
		return;
	}
	client.join(roomId);
	client.emit("joined-room", roomId);

	// Room Data
	const users = Array.from(io.sockets.adapter.rooms.get(roomId));
	io.to(roomId).emit("room-users", users);
}
