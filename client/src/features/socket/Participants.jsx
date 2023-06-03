import { useSelector } from "react-redux";
import { getAllUsersInRoom } from "./socketSlice";
import { RiAddCircleFill as AddIcon } from "react-icons/ri";

export default function Participants() {
	const usersInChat = useSelector(getAllUsersInRoom);

	function copyUrl() {
		const url = window.location;
		navigator.clipboard.writeText(url);
	}

	return (
		<div className="flex px-4 py-4 bg-cultured items-center rounded-lg">
			<div className="flex items-center w-3/6">
				<AddIcon className="text-3xl text-slate-blue-500" />
				<p className="ml-1 text-gray-600 font-medium cursor-pointer" onClick={copyUrl}>
					Invite users
				</p>
			</div>
			<p className="text-gray-600 font-medium">
				<span className="bg-slate-blue-500 rounded-full px-1 text-white">{usersInChat.length - 1}</span>{" "}
				{usersInChat.length - 1 === 1 ? "user" : "users"} in call
			</p>
		</div>
	);
}
