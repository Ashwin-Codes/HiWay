import { FaVideo as VideoOn } from "react-icons/fa";
import { FaVideoSlash as VideoOff } from "react-icons/fa";
import { BsFillMicFill as MicOn } from "react-icons/bs";
import { BsFillMicMuteFill as MicOff } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getActiveMedia, setActiveMedia } from "../media/mediaSettingsSlice";
import { MdCallEnd as PhoneIcon } from "react-icons/md";
import { useEffect } from "react";

export default function VideoChatDashboardControls({ streamRef }) {
	const activeMedia = useSelector(getActiveMedia);
	const dispatch = useDispatch();

	function Wrapper({ children, onClick }) {
		return (
			<div
				onClick={onClick}
				className="relative flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14
              rounded-full bg-white border before:absolute before:top-0 overflow-hidden cursor-pointer">
				{children}
			</div>
		);
	}

	function promisifiedTimeout(condition) {
		let timeoutInMs = 5000;
		return new Promise((resolve, reject) => {
			const interval = setInterval(() => {
				if (condition()) {
					resolve(streamRef.current);
					clearInterval(interval);
					return;
				}
				if (timeoutInMs <= 0) {
					reject();
					clearInterval(interval);
				}
				timeoutInMs = timeoutInMs - 100;
			}, 100);
		});
	}

	useEffect(() => {
		function condition() {
			return Boolean(streamRef.current);
		}
		promisifiedTimeout(condition).then(() => {
			streamRef.current.getAudioTracks()[0].enabled = activeMedia.audio;
			streamRef.current.getVideoTracks()[0].enabled = activeMedia.video;
		});
	}, [activeMedia, streamRef]);

	function micOffHandler() {
		const config = { ...activeMedia };
		config.audio = !activeMedia.audio;
		dispatch(setActiveMedia(config));
	}

	function cameraOffHandler() {
		const config = { ...activeMedia };
		config.video = !activeMedia.video;
		dispatch(setActiveMedia(config));
	}

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-cultured py-2 flex justify-center items-center gap-2">
			<Wrapper onClick={micOffHandler}>
				<div>
					{activeMedia.audio ? (
						<MicOn className="text-slate-blue-500 text-lg lg:text-2xl" />
					) : (
						<MicOff className="text-slate-blue-500 text-lg lg:text-2xl" />
					)}
				</div>
			</Wrapper>

			<div className="flex justify-center items-center w-14 h-14 lg:w-16 lg:h-16 bg-[#fd5d5c] rounded-2xl">
				<PhoneIcon className="text-white text-2xl lg:text-3xl" />
			</div>

			<Wrapper onClick={cameraOffHandler}>
				{activeMedia.video ? (
					<VideoOn className="text-slate-blue-500 text-lg lg:text-2xl" />
				) : (
					<VideoOff className="text-slate-blue-500 text-lg lg:text-2xl" />
				)}
			</Wrapper>
		</div>
	);
}
