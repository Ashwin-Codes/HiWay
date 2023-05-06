import socket from "./socketConn";
import { connect } from "./socketSlice";

export default function socketMiddleware({ dispatch, getState }) {
	socket.on("connected", (id) => {
		dispatch(connect({ id }));
	});
	return (next) => (action) => {
		return next(action);
	};
}
