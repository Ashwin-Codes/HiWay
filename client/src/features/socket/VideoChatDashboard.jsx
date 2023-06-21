import * as process from "process";

import { useEffect, useRef, useState } from "react";
import useMediaStream from "../../hooks/useMediaStream";
import VideoChatDashboardControls from "./VideoChatDashboardControls";
import socket from "./socketConn";
import { getAllUsersInRoom, getSocketState } from "./socketSlice";
import { useSelector } from "react-redux";
import SimplePeer from "simple-peer";
import promisifiedTimeout from "../../util/promisifiedTimeout";

// Polyfill
window.global = window;
window.process = process;
window.Buffer = [];

export default function VideoChatDashboard() {
	const socketId = useSelector(getSocketState);
	const users = useSelector(getAllUsersInRoom);
	const { getUserStream } = useMediaStream();
	const streamRef = useRef();
	const [videoStreams, setVideoStreams] = useState([]);

	useEffect(() => {
		let mounted = true;
		async function userStream() {
			const stream = await getUserStream();
			if (mounted) {
				streamRef.current = stream;
				setVideoStreams([{ self: true, stream: streamRef.current }]);
				socket.emit("client-ready");
			} else {
				stream.getTracks().forEach((track) => {
					track.stop();
				});
			}
		}
		userStream();
		return () => {
			mounted = false;
			if (!streamRef.current) return;
			streamRef.current.getTracks().forEach((track) => {
				track.stop();
			});
			streamRef.current = null;
		};
	}, [getUserStream]);

	useEffect(() => {
		socket.on("user-disconnected", (payload) => {
			const users = videoStreams.filter((stream) => {
				return stream.id !== payload.id;
			});
			setVideoStreams(users);
		});

		return () => {
			socket.off("user-disconnected");
		};
	}, [videoStreams]);

	useEffect(() => {
		socket.on("initiate-connection", () => {
			function sendVideoRequest() {
				for (const user of users) {
					if (user !== socketId.connectionId) {
						const peer = new SimplePeer({
							initiator: true,
							trickle: false,
							stream: streamRef.current,
						});
						peer.on("signal", (data) => {
							socket.emit("send-connection-request", { signalData: data, to: user });
						});

						socket.on("request-accepted", (payload) => {
							if (payload.acceptedBy === user) {
								peer.signal(payload.signalData);
							}
						});

						peer.on("stream", (stream) => {
							setVideoStreams((prevState) => [...prevState, { self: false, id: user, stream }]);
						});

						peer.on("error", (err) => {});
					}
				}
			}

			function condition() {
				return Boolean(streamRef.current);
			}

			promisifiedTimeout(condition)
				.then(() => {
					sendVideoRequest();
				})
				.catch((err) => {});
		});

		socket.on("incoming-connection-request", (payload) => {
			const peer = new SimplePeer({
				initiator: false,
				trickle: false,
				stream: streamRef.current,
			});

			peer.signal(payload.signalData);

			peer.on("signal", (data) => {
				socket.emit("accept-request", { signalData: data, to: payload.requestFrom });
			});

			peer.on("stream", (stream) => {
				setVideoStreams((prevState) => [...prevState, { self: false, id: payload.requestFrom, stream }]);
			});
			peer.on("error", (err) => {});
		});

		return () => {
			socket.off("initiate-connection");
			socket.off("incoming-connection-request");
		};
	}, [users, socketId]);

	let tailwindClasses =
		videoStreams.length === 1
			? "place-content-center"
			: videoStreams.length <= 4
			? "grid-cols-split place-content-center"
			: videoStreams.length <= 9
			? "grid-cols-3 place-content-center"
			: videoStreams.length > 9
			? "grid-cols-3"
			: "grid-cols-3";

	if (window.innerHeight > window.innerWidth) {
		if (videoStreams.length === 1) {
			tailwindClasses += "place-content-start";
		}
		tailwindClasses = "grid-cols-1";
	}

	return (
		<div className="h-full">
			<div className={`h-full grid rounded-xl overflow-auto ${tailwindClasses}`}>
				{videoStreams.map((streamObj, index) => {
					return (
						<div className="h-full mx-2 flex justify-center items-center rounded-lg" key={index}>
							<video
								className={`w-full rounded-lg aspect-video bg-black  ${
									window.innerHeight > window.innerWidth
										? "max-w-[75vw] max-h-[30vh] aspect-auto"
										: ""
								}`}
								ref={(videoRef) => {
									if (videoRef) {
										videoRef.srcObject = streamObj.stream;
									}
								}}
								muted={streamObj.self}
								autoPlay
								controls={false}
							/>
						</div>
					);
				})}
			</div>
			<VideoChatDashboardControls streamRef={streamRef} />
		</div>
	);
}
