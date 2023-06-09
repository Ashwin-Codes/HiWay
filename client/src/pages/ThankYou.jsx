import { AiOutlineCaretRight as Arrow } from "react-icons/ai";
import animateLogo from "../util/animateLogo";
import { useEffect, useRef, useState } from "react";

export default function ThankYou() {
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

	function Project({ name, livelink, githubLink }) {
		return (
			<article className="flex flex-col bg-cultured px-3 py-6 rounded-lg w-full sm:w-3/4 lg:w-2/4">
				<p className="text-gray-600 tracking-wide">{name}</p>
				<div className="flex gap-2">
					<span>
						<a
							href={livelink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-slate-blue-500 cursor-pointer">
							Live Link
						</a>
					</span>
					<span>
						<a
							href={githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-slate-blue-500 cursor-pointer">
							GitHub Link
						</a>
					</span>
				</div>
			</article>
		);
	}

	return (
		<main>
			<div className="flex px-4 py-2 justify-start items-center lg:px-6 lg:py-4">
				<Arrow className="text-slate-blue-500 text-xl" />
				<span className="text-slate-blue-500 text-3xl font-neue sm:text-4xl">{logoText}</span>
			</div>
			<div className="w-full xl:w-2/3 m-auto text-center mt-12">
				<h1 className="font-medium font-neue text-4xl sm:text-5xl xl:text-6xl text-slate-blue-900">
					Thank you for using HiWay
				</h1>
			</div>
			<div className="w-2/3 m-auto text-center mt-8">
				<a
					href="https://github.com/ashwin-codes/hiway"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-slate-blue-500 text-white px-4 py-2 rounded-3xl text-lg">
					GitHub Link
				</a>
				<p className="text-gray-400 mt-3 animate-pulse">Give me a star Maybe 🤷</p>
			</div>
			<div className="w-full px-4 sm:w-[75%] xl:w-2/3 m-auto mt-16 flex flex-col gap-3">
				<h1 className="text-xl text-gray-600">Checkout my other projects</h1>
				<Project
					name="UpDrop - A cloud storage solution"
					livelink="https://updrop.ashwincodes.com"
					githubLink="https://github.com/ashwin-codes/updrop"
				/>
				<Project
					name="HexHub - A smart color palette"
					livelink="https://hexhub.ashwincodes.com"
					githubLink="https://github.com/ashwin-codes/hexhub"
				/>
			</div>
		</main>
	);
}
