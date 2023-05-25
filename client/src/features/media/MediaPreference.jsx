import { getAuth } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCam from "./UserCam";
import { AiOutlineLogin as JoinRoomIcon } from "react-icons/ai";
import { getPermissionError, setPickedMediaPreference } from "./mediaSettingsSlice";
import Toastify, { errorToast } from "../../components/Toastify";

export default function MediaPreference() {
	const permissionError = useSelector(getPermissionError);
	const authState = useSelector(getAuth);
	const dispatch = useDispatch();

	function joinChatHandler() {
		if (!permissionError) {
			dispatch(setPickedMediaPreference(true));
			return;
		}

		errorToast({ message: "Please enable camera to continue", id: "preference-permission-error" });
	}

	return (
		<div className="py-4 px-4">
			<Toastify />
			<UserCam />
			<div className="flex flex-col justify-center items-center mt-4">
				<div className="my-2 text-center">
					<p className="text-gray-500">Joining as {authState.username ? authState.username : "guest"}</p>
					{!authState.username && <p className="text-gray-500">Login to join with your username.</p>}
				</div>
				<button className="fancy-btn self-center" onClick={joinChatHandler}>
					<JoinRoomIcon className="text-white text-2xl" />
					<h1 className="text-[#829cb9] font-semibold mix-blend-plus-lighter">Join Chat</h1>
				</button>
			</div>
		</div>
	);
}
