export default async function leaveRoomHandler({ io, client, payload }) {
	client.leave(payload.roomId);
	client.emit("left-room", payload.roomId);

	// Emit user left to the room
	io.to(client.chatroom).emit("user-disconnected", { id: client.id });

	// Resend Room Data
	const usersInRoom = io.sockets.adapter.rooms.get(client.chatroom);
	if (usersInRoom) {
		const users = Array.from(usersInRoom);
		io.to(client.chatroom).emit("room-users", users);
	}

	client.chatroom = null;
}
