import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getActiveMedia } from "./mediaSettingsSlice";
import UserCamControls from "./UserCamControls";
import useMediaStream from "../../hooks/useMediaStream";
import { BiCameraOff as CameraOff } from "react-icons/bi";

export default function UserCam() {
	const streamRef = useRef(null);
	const videoRef = useRef(null);
	const activeMedia = useSelector(getActiveMedia);
	const { getUserStream } = useMediaStream();

	useEffect(() => {
		let mounted = true;
		async function getUserMedia() {
			if (!videoRef.current) return;
			if (streamRef.current) return;

			let stream = await getUserStream();
			if (mounted) {
				streamRef.current = stream;
				videoRef.current.srcObject = stream;
			} else {
				stream.getTracks().forEach((track) => {
					track.stop();
				});
			}
		}

		getUserMedia();

		return () => {
			mounted = false;
			if (!streamRef.current) return;
			streamRef.current.getTracks().forEach((track) => {
				track.stop();
			});
			streamRef.current = null;
		};
	}, [getUserStream]);

	return (
		<div className="h-max flex flex-col justify-center items-center">
			<div className="relative flex h-max">
				<video muted autoPlay ref={videoRef} className="transform rounded-lg max-h-60 sm:max-h-80"></video>
				<UserCamControls
					className="absolute z-10 flex bottom-1 left-2/4 -translate-x-2/4 gap-1"
					streamRef={streamRef}
					videoRef={videoRef}
				/>
				{!activeMedia.video && (
					<div className="absolute top-0 left-0 w-full h-full bg-auroMetal rounded-lg flex justify-center items-center">
						<CameraOff className="text-4xl font-semibold text-white" />
					</div>
				)}
			</div>
		</div>
	);
}
