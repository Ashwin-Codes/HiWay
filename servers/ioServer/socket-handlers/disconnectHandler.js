export default async function acceptRequest({ io, client }) {
	io.to(client.chatroom).emit("user-disconnected", { id: client.id });

	// Resend Room Data
	const usersInRoom = io.sockets.adapter.rooms.get(client.chatroom);
	if (usersInRoom) {
		const users = Array.from(usersInRoom);
		io.to(client.chatroom).emit("room-users", users);
	}
}
