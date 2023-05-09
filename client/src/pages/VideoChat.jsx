import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../features/socket/socketConn";
import { useSelector } from "react-redux";
import { getSocketState } from "../features/socket/socketSlice";

export default function VideoChat() {
	const socketState = useSelector(getSocketState);
	const navigate = useNavigate();
	const { roomId } = useParams();

	useEffect(() => {
		const roomIdRegex = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
		if (!roomId.match(roomIdRegex)) {
			navigate("/");
		}
	}, [navigate, roomId]);

	useEffect(() => {
		if (!socketState.roomId) {
			socket.emit("join-room", { roomId });
			socket.on("wrong-room-code", () => {
				navigate("/");
				socket.off("wrong-room-code");
			});
		}
	}, [roomId, socketState, navigate]);

	return <div>VideoChat</div>;
}
