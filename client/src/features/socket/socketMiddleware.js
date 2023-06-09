import socket from "./socketConn";
import { connect, disconnect, leftRoom, newRoom, setUsers } from "./socketSlice";

export default function socketMiddleware({ dispatch, getState }) {
	socket.on("connected", (id) => {
		dispatch(connect({ id }));
	});

	socket.on("disconnect", () => {
		dispatch(disconnect());
	});

	socket.on("left-room", (roomId) => {
		dispatch(leftRoom(roomId));
	});

	socket.on("room-created", (roomId) => {
		dispatch(newRoom({ roomId }));
	});

	socket.on("joined-room", (roomId) => {
		dispatch(newRoom({ roomId }));
	});

	socket.on("room-users", (users) => {
		dispatch(setUsers(users));
	});

	return (next) => (action) => {
		return next(action);
	};
}
