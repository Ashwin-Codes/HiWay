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
		async function userStream() {
			const stream = await getUserStream();
			streamRef.current = stream;
			setVideoStreams([{ self: true, stream: streamRef.current }]);
		}
		userStream();

		return () => {
			if (!streamRef.current) return;
			streamRef.current.getTracks().forEach((track) => {
				track.stop();
			});
			streamRef.current = null;
		};
	}, [getUserStream]);

	useEffect(() => {
		socket.on("initiate-connection", () => {
			console.log("initiate-connection");
			function sendVideoRequest() {
				console.log("function ran");
				for (const user of users) {
					console.log("user :", user);
					if (user !== socketId.connectionId) {
						const peer = new SimplePeer({
							initiator: true,
							trickle: false,
							stream: streamRef.current,
						});
						console.log("peer build : ", peer);
						peer.on("signal", (data) => {
							socket.emit("send-connection-request", { signalData: data, to: user });
						});

						socket.on("request-accepted", (payload) => {
							if (payload.acceptedBy === user) {
								peer.signal(payload.signalData);
							}
						});

						peer.on("connect", () => {
							console.log("Connected to peer");
						});

						peer.on("stream", (stream) => {
							console.log("stream recieved");
							setVideoStreams((prevState) => [...prevState, { self: false, stream }]);
						});

						peer.on("error", (err) => {
							console.log(err);
						});
					}
				}
			}

			function condition() {
				console.log("condition : ", streamRef.current);
				return Boolean(streamRef.current);
			}

			promisifiedTimeout(condition)
				.then(() => {
					sendVideoRequest();
				})
				.catch((err) => {
					console.log(err);
				});
		});

		socket.on("incoming-connection-request", (payload) => {
			console.log("incoming-connection-request");
			const peer = new SimplePeer({
				initiator: false,
				trickle: false,
				stream: streamRef.current,
			});

			peer.signal(payload.signalData);

			peer.on("signal", (data) => {
				socket.emit("accept-request", { signalData: data, to: payload.requestFrom });
			});

			peer.on("connect", () => {
				console.log("Connected to peer");
			});

			peer.on("stream", (stream) => {
				console.log("stream recieved");
				setVideoStreams((prevState) => [...prevState, { self: false, stream }]);
			});

			peer.on("error", (err) => {
				console.log(err);
			});
		});

		return () => {
			socket.off("initiate-connection");
			socket.off("incoming-connection-request");
		};
	}, [users, socketId]);

	function test() {
		setVideoStreams([...videoStreams, { self: false, stream: streamRef.current }]);
	}

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
		tailwindClasses = "place-content-start grid-cols-1";
	}

	return (
		<div className="h-full">
			<div className={`h-full grid rounded-xl overflow-auto ${tailwindClasses}`}>
				{videoStreams.map((streamObj, index) => {
					return (
						<div className="h-full m-2 flex justify-center items-center rounded-lg" key={index}>
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
			<button className="absolute z-30 text-red-700 top-0" onClick={test}>
				Add Video
			</button>
		</div>
	);
}
