import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../features/socket/socketConn";
import { useSelector } from "react-redux";
import { getSocketState } from "../features/socket/socketSlice";
import { getPickedMediaPreference } from "../features/media/mediaSettingsSlice";
import { errorToast } from "../components/Toastify";
import MediaPreference from "../features/media/MediaPreference";

export default function VideoChat() {
	const pickedMediaPreference = useSelector(getPickedMediaPreference);
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
		if (!socketState.roomId && pickedMediaPreference) {
			socket.emit("join-room", { roomId });
			socket.on("wrong-room-code", () => {
				navigate("/");
				errorToast({ message: "Please check your room code", id: "join-room-error" });
				socket.off("wrong-room-code");
			});
		}
	}, [roomId, socketState, pickedMediaPreference, navigate]);

	if (!pickedMediaPreference) {
		return <MediaPreference />;
	}

	return <div>VideoChat</div>;
}
