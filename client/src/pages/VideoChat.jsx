import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../features/socket/socketConn";
import { useSelector } from "react-redux";
import { getSocketState } from "../features/socket/socketSlice";
import { getPickedMediaPreference } from "../features/media/mediaSettingsSlice";
import { errorToast } from "../components/Toastify";
import MediaPreference from "../features/media/MediaPreference";
import VideoChatDashboard from "../features/socket/VideoChatDashboard";
import { AiOutlineCaretRight as Arrow } from "react-icons/ai";
import TextChat from "../features/socket/TextChat";
import Participants from "../features/socket/Participants";
import { IoIosArrowUp as UpArrow } from "react-icons/io";
import { IoIosArrowDown as DownArrow } from "react-icons/io";

export default function VideoChat() {
	const [chatVisible, setChatVisible] = useState(false);
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

	function setChatVisibleHandler() {
		setChatVisible((prevState) => {
			return !prevState;
		});
	}

	return (
		<>
			<div className="relative overflow-hidden h-[100dvh]">
				<div
					className={`h-12 w-28 mt-2 rounded-tl-full rounded-bl-full transition-all bg-slate-blue-500 fixed top-0 right-0 flex items-center z-10 xl:hidden ${
						chatVisible ? "translate-x-2/4 px-2" : "px-4"
					}`}>
					{chatVisible ? (
						<DownArrow className="text-white text-5xl cursor-pointer" onClick={setChatVisibleHandler} />
					) : (
						<UpArrow className="text-white text-5xl cursor-pointer" onClick={setChatVisibleHandler} />
					)}
				</div>
				<h1 className="flex px-4 py-2 justify-start items-center lg:px-6 lg:py-4">
					<Arrow className="text-slate-blue-500 text-xl" />
					<span className="text-slate-blue-500 text-3xl font-neue sm:text-4xl">HiWay</span>
				</h1>
				<div className="py-2 px-2 my-auto gap-4 h-[calc(100vh-10rem)] lg:px-6 lg:py-4 lg:flex lg:justify-between lg:items-center">
					<VideoChatDashboard />
					<div
						className={
							"h-[calc(100vh-3rem)]  max-h-full flex flex-col gap-4 absolute bg-white left-0 w-full transition-all xl:static xl:w-[unset] " +
							`${chatVisible ? "top-0" : "top-full"}`
						}>
						<Participants />
						<TextChat />
					</div>
				</div>
			</div>
		</>
	);
}
