import { getAuth } from "./authSlice";
import { useSelector } from "react-redux";
import { HiUserCircle as UserIcon } from "react-icons/hi";
import { logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { errorToast } from "../../components/Toastify";
import { CgLogOut as LogoutIcon } from "react-icons/cg";

export default function Logout() {
	const dispatch = useDispatch();
	const username = useSelector(getAuth).username;

	async function logoutHandler() {
		try {
			await dispatch(logout()).unwrap();
		} catch (err) {
			errorToast({ message: "Something went wrong", id: "logout-failed" });
		}
	}

	return (
		<div className="flex gap-1 justify-center items-center px-2 md:mr-6 xl:mr-8">
			<UserIcon className="text-slate-blue-500 text-base" />
			<h1 className="text-slate-blue-500 text-sm max-w-[12ch] truncate sm:max-w-full">{username}</h1>
			<button
				onClick={logoutHandler}
				className="text-[#c082bc] border border-[#c082bc] text-sm px-2 py-1 rounded-lg flex items-center gap-1">
				<LogoutIcon className="text-xl" />
				<p className="hidden sm:inline-block">Logout</p>
			</button>
		</div>
	);
}
