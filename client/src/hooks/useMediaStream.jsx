import { useCallback } from "react";

export default function useMediaStream() {
	const getUserStream = useCallback(async (customOptions) => {
		let options = {
			video: true,
			audio: true,
		};

		if (customOptions) {
			options = { ...options, ...customOptions };
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: options.video ? { width: 1920, height: 1080 } : false,
				audio: options.audio,
			});
			return stream;
		} catch (err) {
			throw err;
		}
	}, []);

	const mergeStreams = useCallback((...streams) => {
		const mergedStream = new MediaStream();

		streams.forEach((stream) => {
			stream.getTracks().forEach((track) => {
				if (track.readyState === "live") {
					mergedStream.addTrack(track);
				}
			});
		});

		return mergedStream;
	}, []);

	return { getUserStream, mergeStreams };
}
