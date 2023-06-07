import { useSelector } from "react-redux";
import { getAllUsersInRoom } from "./socketSlice";
import { RiAddCircleFill as AddIcon } from "react-icons/ri";
import { useRef, useState } from "react";
import { IoIosCheckmarkCircle as CheckmarkIcon } from "react-icons/io";

export default function Participants() {
	const config = {
		originalLabel: "Invite link",
		updatedLabel: "Link copied",
	};
	const copyRef = useRef();
	const [copiedLableText, setCopiedLableText] = useState(config.originalLabel);
	const usersInChat = useSelector(getAllUsersInRoom);

	function copyUrl() {
		const url = window.location;
		navigator.clipboard.writeText(url);
		copiedHandler();
	}

	function copiedHandler() {
		setCopiedLableText(config.updatedLabel);
		setTimeout(() => {
			setCopiedLableText(config.originalLabel);
		}, 3000);
	}

	const tailwindClasses = copiedLableText === config.originalLabel ? "text-gray-600" : "text-green-500";

	return (
		<div className="flex px-4 py-4 bg-cultured items-center rounded-lg">
			<div className="flex items-center w-3/6">
				{copiedLableText === config.originalLabel ? (
					<AddIcon className="text-3xl text-slate-blue-500" />
				) : (
					<CheckmarkIcon className="text-3xl text-green-600" />
				)}
				<p className={`ml-1 font-medium cursor-pointer ${tailwindClasses}`} onClick={copyUrl} ref={copyRef}>
					{copiedLableText}
				</p>
			</div>
			<p className="text-gray-600 font-medium">
				<span className="bg-slate-blue-500 rounded-full px-1 text-white">{usersInChat.length - 1}</span>{" "}
				{usersInChat.length - 1 === 1 ? "User" : "Users"} in call
			</p>
		</div>
	);
}
