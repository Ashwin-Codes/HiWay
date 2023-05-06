import socket from "./socketConn";
import { connect, newRoom } from "./socketSlice";

export default function socketMiddleware({ dispatch, getState }) {
	socket.on("connected", (id) => {
		dispatch(connect({ id }));
	});

	socket.on("room-created", (roomId) => {
		dispatch(newRoom({ roomId }));
	});

	socket.on("joined-room", (roomId) => {
		dispatch(newRoom({ roomId }));
	});

	return (next) => (action) => {
		return next(action);
	};
}
