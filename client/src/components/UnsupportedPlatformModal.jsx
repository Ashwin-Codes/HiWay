import { useState } from "react";
import { GrClose as CloseBtn } from "react-icons/gr";
import isIOS from "../util/isIOS";

export default function UnsupportedPlatformModal() {
	const [openModal, setOpenModal] = useState(isIOS());

	if (!openModal) return;

	function closeModal() {
		setOpenModal(false);
	}

	return (
		<div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-40 flex justify-center items-center">
			<div className="relative bg-white flex flex-col items-center px-6 py-10 gap-6 max-w-[90%] rounded-xl before:border-2 before:border-slate-500 before:left-[2%] before:top-[2%] before:w-[96%] before:h-[96%] before:absolute before:rounded-lg sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[25%]">
				<button
					className="absolute left-full top-0 -translate-x-full p-2 text-2xl bg-white"
					onClick={closeModal}>
					<CloseBtn />
				</button>
				<h1 className="font-neue text-slate-blue-500 text-2xl text-center">Message from Developer</h1>
				<div className="flex flex-col gap-5 text-slate-blue-800 text-center font-mono">
					<p>HiWay is not yet supported on iOS Devices. You may experience unexpected behaviour.</p>
					<p className="text-green-500">Fix is in process, please check back after some time.</p>
					<p>For now, Please use a Desktop, Mac or Android.</p>
					<button
						className="bg-slate-blue-500 text-white w-max px-5 py-1 rounded-lg self-center z-50"
						onClick={closeModal}>
						Use Anyway
					</button>
				</div>
			</div>
		</div>
	);
}
