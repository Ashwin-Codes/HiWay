import socket from "./socketConn";
import { useSelector } from "react-redux";
import { MdEditRoad as CreateRoomIcon } from "react-icons/md";
import { MdAddRoad as JoinRoomIcon } from "react-icons/md";
import { getAuth } from "../auth/authSlice";
import { useRef } from "react";

export default function CreateJoinRoomForm() {
	const roomIdInputRef = useRef();
	const { accessToken } = useSelector(getAuth);

	function createRoomHandler() {
		socket.emit("create-room", { accessToken });
	}

	function joinRoomHandler() {
		const roomId = roomIdInputRef.current.value.trim();
		socket.emit("join-room", { roomId });
	}

	return (
		<div className="my-8 px-6 py-4 rounded-lg sm:max-w-lg mx-auto lg:mx-0 lg:max-w-[80%] xl:w-[35rem]">
			<form
				className="flex flex-col gap-2 xl:gap-8"
				onClick={(e) => {
					e.preventDefault();
				}}>
				<div className="flex flex-col border-2 gap-4 p-5 rounded-lg">
					<p className="text-gray-500">Create a new video chat room</p>
					<button className="fancy-btn self-center" onClick={createRoomHandler}>
						<CreateRoomIcon className="text-white text-2xl" />
						<h1 className="text-[#829cb9] font-semibold mix-blend-plus-lighter">Create Hiway</h1>
					</button>
				</div>
				<div className="flex flex-col gap-4 border-2 p-5 rounded-lg">
					<p className="text-gray-500">Join an existing room</p>
					<div className="relative flex flex-col gap-2 bg-cultured">
						<input
							id="join-room"
							ref={roomIdInputRef}
							type="text"
							placeholder=" "
							className="border-2 px-4 py-2 rounded-lg focus:border-slate-blue-500 text-gray-600 peer"
						/>
						<label
							className="absolute transition-all pointer-events-none translate-x-2 text-sm px-2 -translate-y-2/4 text-gray-500 bg-white rounded-lg border-2 peer-focus:border-slate-blue-500 peer-focus:bg-slate-blue-500 peer-focus:text-white peer-placeholder-shown:top-2/4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:border-transparent peer-placeholder-shown:px2 peer-focus:top-0"
							htmlFor="join-room">
							Joining Code
						</label>
					</div>
					<button className="fancy-btn self-center" onClick={joinRoomHandler}>
						<JoinRoomIcon className="text-white text-2xl" />
						<h1 className="text-[#829cb9] font-semibold mix-blend-plus-lighter">Join Hiway</h1>
					</button>
				</div>
			</form>
		</div>
	);
}
