import { BsFillShieldLockFill as ErrorIcon } from "react-icons/bs";
import { toast } from "react-toastify";

export default function showLoginErrorToast(err) {
	const messages = {
		// Error messages
		"invalid credentials": "Username or password incorrect",

		// Error codes
		ERR_NETWORK: "Network error, try again",
		ERR_BAD_RESPONSE: "Server error, fix in process",
	};

	if (err) {
		let ErrorToast = (
			<span className="flex gap-2">
				<ErrorIcon className="text-auroMetal text-xl" /> {messages[err.message ? err.message : err.code]}
			</span>
		);
		toast(ErrorToast, {
			toastId: "login-error",
		});
	}

	function update(id) {
		toast.update(id);
	}

	return { update };
}
