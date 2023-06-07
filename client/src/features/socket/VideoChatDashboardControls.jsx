import { FaVideo as VideoOn } from "react-icons/fa";
import { FaVideoSlash as VideoOff } from "react-icons/fa";
import { BsFillMicFill as MicOn } from "react-icons/bs";
import { BsFillMicMuteFill as MicOff } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getActiveMedia } from "../media/mediaSettingsSlice";
import { MdCallEnd as PhoneIcon } from "react-icons/md";

export default function VideoChatDashboardControls() {
	const activeMedia = useSelector(getActiveMedia);

	function Wrapper({ children }) {
		return (
			<div
				className="relative flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14
              rounded-full bg-white border before:absolute before:top-0 overflow-hidden cursor-pointer">
				{children}
			</div>
		);
	}

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-cultured py-2 flex justify-center items-center gap-2 cursor-pointer">
			<Wrapper>
				{activeMedia.audio ? (
					<MicOn className="text-slate-blue-500 text-lg lg:text-2xl" />
				) : (
					<MicOff className="text-slate-blue-500 text-lg lg:text-2xl" />
				)}
			</Wrapper>

			<div className="flex justify-center items-center w-14 h-14 lg:w-16 lg:h-16 bg-[#fd5d5c] rounded-2xl">
				<PhoneIcon className="text-white text-2xl lg:text-3xl" />
			</div>
			<Wrapper>
				{activeMedia.video ? (
					<VideoOn className="text-slate-blue-500 text-lg lg:text-2xl" />
				) : (
					<VideoOff className="text-slate-blue-500 text-lg lg:text-2xl" />
				)}
			</Wrapper>
		</div>
	);
}
