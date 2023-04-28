import { BsFillShieldLockFill as ErrorIcon } from "react-icons/bs";
import { toast } from "react-toastify";

export default function showSignupErrorToast(err) {
	const messages = {
		// Error codes
		ERR_NETWORK: "Network error, try again",
		ERR_BAD_RESPONSE: "Server error, fix in process",
	};

	if (err) {
		let ErrorToast = (
			<span className="flex gap-2">
				<ErrorIcon className="text-auroMetal text-xl" />{" "}
				{messages[err.code] ? messages[err.code] : "Something went wrong"}
			</span>
		);
		toast(ErrorToast, {
			toastId: "signup-error",
		});
	}

	function update(id) {
		toast.update(id);
	}

	return { update };
}
