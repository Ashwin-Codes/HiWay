import { BsFillShieldLockFill as ErrorIcon } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify-ui-overwrite.css";

export function errorToast({ message, id }) {
	toast.update(id ? id : message);

	let ErrorToast = (
		<span className="flex gap-2">
			<ErrorIcon className="text-auroMetal text-xl" /> <p>{message}</p>
		</span>
	);
	toast(ErrorToast, {
		toastId: id ? id : message,
	});
}

export function updateToast(id) {
	toast.update(id);
}

export default function Toastify() {
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
		<>
			<ToastContainer {...toastUiOptions} />
		</>
	);
}
