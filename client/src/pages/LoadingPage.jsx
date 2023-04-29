import React from "react";
import { BiLoaderCircle as Loader } from "react-icons/bi";

export default function LoadingPage() {
	return (
		<div
			data-testid="loading-page"
			className="absolute top-0 left-0 w-screen h-screen bg-slate-blue-300 flex justify-center items-center">
			<Loader className="text-white text-8xl animate-spin" />
		</div>
	);
}
