export default async function messageHandler({ io, client, payload }) {
	const room = payload.room;
	const message = payload.message;
	io.to(room).emit("message", message);
}
