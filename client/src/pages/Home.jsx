import UserCam from "../features/media/UserCam";
import CreateJoinRoomForm from "../features/socket/CreateJoinRoomForm";
import { AiOutlineCaretRight as Arrow } from "react-icons/ai";
import Toastify from "../components/Toastify";
import { useEffect } from "react";
import { setPickedMediaPreference } from "../features/media/mediaSettingsSlice";
import { useDispatch } from "react-redux";

export default function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPickedMediaPreference(true));
	}, [dispatch]);

	return (
		<>
			<Toastify />
			<div className="">
				<h1 className="flex px-4 py-2 justify-start items-center lg:px-6 lg:py-4">
					<Arrow className="text-slate-blue-500 text-xl" />
					<span className="text-slate-blue-500 text-3xl font-neue sm:text-4xl">HiWay</span>
				</h1>
				<div className="py-2 px-2 my-auto lg:h-[calc(100vh-144px)] lg:px-6 lg:py-4 lg:flex lg:justify-around lg:items-center">
					<UserCam />
					<CreateJoinRoomForm />
				</div>
			</div>
		</>
	);
}
