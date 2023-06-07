import { useEffect, useRef, useState } from "react";
import { BiSend as SendIcon } from "react-icons/bi";
import { BiUserCircle as UserIcon } from "react-icons/bi";
import socket from "./socketConn";
import { useSelector } from "react-redux";
import { getSocketState } from "./socketSlice";
import { getAuth } from "../auth/authSlice";

export default function TextChat() {
	const socketState = useSelector(getSocketState);
	const { username } = useSelector(getAuth);
	const [messageState, setMessageState] = useState([]);
	const inputRef = useRef();
	const chatBoxRef = useRef();

	function Message({ msg, author }) {
		return (
			<div className="mx-4 mt-4 bg-white rounded-2xl px-4 py-2">
				<div className="flex items-center gap-1">
					<UserIcon className="text-slate-blue-500 text-xl" />
					<p className="text-slate-blue-500 font-semibold">{author ? author : "Guest"}</p>
				</div>
				<p className="tracking-wider text-auroMetal break-words">{msg}</p>
			</div>
		);
	}

	function sendMessage(msg) {
		const messageObject = {
			room: socketState.roomId,
			message: {
				author: username,
				message: msg,
			},
		};
		socket.emit("message", messageObject);
	}

	function handleSendMessage(e) {
		e.preventDefault();
		if (!inputRef.current) return;
		if (inputRef.current.value) {
			sendMessage(inputRef.current.value);
			inputRef.current.value = "";
		}
	}

	useEffect(() => {
		socket.on("message", (message) => {
			setMessageState((prevState) => {
				return [...prevState, message];
			});
			setTimeout(() => {
				chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
			}, 1);
		});
		return () => {
			socket.off("message");
		};
	}, []);

	return (
		<div className="h-[90%] w-full xl:w-[26rem] max-w-[100vw] relative">
			<div className="bg-cultured rounded-tl-lg rounded-tr-lg absolute top-0 left-0 w-full p-4 font-semibold border-b-2">
				Group Chat
			</div>
			<div className="bg-cultured pt-14 pb-20 h-full overflow-auto scroll-smooth rounded-xl" ref={chatBoxRef}>
				{messageState.map((message, index) => {
					return <Message key={index} msg={message.message} author={message.author} />;
				})}
				{messageState.length === 0 && <h1 className="text-slate-blue-500 text-center p-8">No Messages</h1>}
			</div>
			<div className="bg-cultured absolute bottom-0 w-full p-4 rounded-bl-lg rounded-br-lg">
				<form
					className="flex bg-white px-4 py-2 rounded-lg justify-between shadow-md"
					onSubmit={handleSendMessage}>
					<input
						type="text"
						ref={inputRef}
						className="w-4/5 tracking-wider text-gray-700"
						placeholder="Your Message..."
					/>
					<button
						type="submit"
						className="bg-slate-blue-500 flex items-center justify-center w-8 h-8 rounded-lg">
						<SendIcon className="text-white text-xl" />
					</button>
				</form>
			</div>
		</div>
	);
}
