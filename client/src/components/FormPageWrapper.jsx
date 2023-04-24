import { useEffect, useRef, useState } from "react";
import illustration from "../assets/p2p-illustration.svg";
import { AiOutlineCaretRight as Arrow } from "react-icons/ai";
import animateLogo from "../util/animateLogo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify-ui-overwrite.css";

export default function FormPageWrapper({ children }) {
	const [logoText, setLogoText] = useState("HiWay");
	const logoTextRef = useRef("HiWay");

	useEffect(() => {
		let interval;
		const timeout = setTimeout(() => {
			interval = animateLogo(logoTextRef, setLogoText);
		}, 3000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [logoTextRef]);

	const toastUiOptions = {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		newestOnTop: false,
		closeOnClick: true,
		rtl: false,
		pauseOnFocusLoss: false,
		draggable: true,
		pauseOnHover: true,
		theme: "light",
	};

	return (
		<div className="relative lg:flex">
			<ToastContainer {...toastUiOptions} />
			<h1 className="absolute flex px-4 py-2 justify-center items-center lg:px-6 lg:py-4">
				<Arrow className="text-slate-blue-500 text-xl" />
				<span className="text-slate-blue-500 text-3xl font-neue sm:text-4xl">{logoText}</span>
			</h1>
			<div className="h-screen w-full flex justify-center items-center">{children}</div>
			<div className="h-screen w-full bg-cultured hidden lg:flex lg:justify-center lg:items-center">
				<img
					src={illustration}
					alt="peer to peer illustration"
					className="self-center max-h-[28rem] animate-seesaw"
				/>
			</div>
		</div>
	);
}
