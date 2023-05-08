import useMediaStream from "../../hooks/useMediaStream";
import { useDispatch, useSelector } from "react-redux";
import { getActiveMedia, setActiveMedia } from "./mediaSettingsSlice";
import { BsFillMicFill as MicOn } from "react-icons/bs";
import { BsFillMicMuteFill as MicOff } from "react-icons/bs";
import { FaVideo as VideoOn } from "react-icons/fa";
import { FaVideoSlash as VideoOff } from "react-icons/fa";

export default function UserCamControls({ className, streamRef, videoRef }) {
	const dispatch = useDispatch();
	const activeMedia = useSelector(getActiveMedia);
	const { mergeStreams, getUserStream } = useMediaStream();

	function onMicClick() {
		const newMediaState = { ...activeMedia };
		newMediaState.audio = !newMediaState.audio;
		dispatch(setActiveMedia(newMediaState));

		// Disble audio
		streamRef.current.getTracks().forEach((track) => {
			if (track.kind === "audio") {
				track.enabled = !activeMedia.audio;
			}
		});
	}

	async function onVideoClick() {
		const newMediaState = { ...activeMedia };
		newMediaState.video = !newMediaState.video;
		dispatch(setActiveMedia(newMediaState));

		// Stop all streams
		if (activeMedia.video) {
			streamRef.current.getTracks().forEach((track) => {
				if (track.kind === "video") {
					track.stop();
				}
			});
			return;
		}

		// Start new stream
		const stream = await getUserStream({ audio: false });
		const mergedStream = mergeStreams(streamRef.current, stream);
		streamRef.current = mergedStream;
		videoRef.current.srcObject = mergedStream;
	}

	return (
		<div className={className}>
			<div className="p-3 bg-cultured rounded-full cursor-pointer w-max" onClick={onMicClick}>
				{activeMedia.audio ? (
					<MicOn className="text-slate-blue-500 text-lg" />
				) : (
					<MicOff className="text-slate-blue-500 text-lg" />
				)}
			</div>
			<div
				className="p-3 bg-cultured rounded-full cursor-pointer"
				onClick={onVideoClick}
				data-testid="camera-off-btn">
				{activeMedia.video ? (
					<VideoOn className="text-slate-blue-500 text-lg" />
				) : (
					<VideoOff className="text-slate-blue-500 text-lg" />
				)}
			</div>
		</div>
	);
}
