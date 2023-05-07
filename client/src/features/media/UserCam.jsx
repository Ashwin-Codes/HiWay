import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveMedia, getPermissionError, setPermissionError } from "./mediaSettingsSlice";
import UserCamControls from "./UserCamControls";
import useMediaStream from "../../hooks/useMediaStream";
import { BiCameraOff as CameraOff } from "react-icons/bi";
import { TbFaceIdError as PermissionErrorIcon } from "react-icons/tb";

export default function UserCam() {
	const streamRef = useRef(null);
	const videoRef = useRef(null);
	const activeMedia = useSelector(getActiveMedia);
	const permissionError = useSelector(getPermissionError);
	const { getUserStream } = useMediaStream();
	const dispatch = useDispatch();

	useEffect(() => {
		let mounted = true;
		async function getUserMedia() {
			if (!videoRef.current) return;
			if (streamRef.current) return;
			try {
				let stream = await getUserStream();
				if (mounted) {
					streamRef.current = stream;
					videoRef.current.srcObject = stream;
				} else {
					stream.getTracks().forEach((track) => {
						track.stop();
					});
				}
			} catch (err) {
				if (err.name === "NotAllowedError") {
					dispatch(setPermissionError(true));
				}
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
	}, [getUserStream, dispatch]);

	return (
		<div className="h-max flex flex-col justify-center items-center">
			<div className={`relative flex h-max ${permissionError && "w-[80%] h-44 sm:max-w-md lg:w-full lg:h-60"}`}>
				<video muted autoPlay ref={videoRef} className="transform rounded-lg max-h-60 sm:max-h-80"></video>
				{!permissionError && (
					<UserCamControls
						className="absolute z-10 flex bottom-1 left-2/4 -translate-x-2/4 gap-1"
						streamRef={streamRef}
						videoRef={videoRef}
					/>
				)}
				{permissionError && (
					<div className="absolute top-0 left-0 w-full h-full bg-auroMetal rounded-lg flex flex-col gap-2 text-center justify-center items-center">
						<PermissionErrorIcon className="text-4xl font-semibold text-white" />
						<p className="text-white font-semibold px-8">
							Camera's the key to chat success! Please enable it.
						</p>
					</div>
				)}
				{!activeMedia.video && (
					<div className="absolute top-0 left-0 w-full h-full bg-auroMetal rounded-lg flex justify-center items-center">
						<CameraOff className="text-4xl font-semibold text-white" />
					</div>
				)}
			</div>
		</div>
	);
}
