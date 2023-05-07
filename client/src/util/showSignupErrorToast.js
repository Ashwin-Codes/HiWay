import { errorToast, updateToast } from "../components/Toastify";

export default function showSignupErrorToast(err) {
	const messages = {
		// Error codes
		ERR_NETWORK: "Network error, try again",
		ERR_BAD_RESPONSE: "Server error, fix in process",
	};

	if (err) {
		errorToast({
			message: messages[err.code] ? messages[err.code] : "Something went wrong",
			id: "signup-error",
		});
	}

	function update(id) {
		updateToast(id);
	}

	return { update };
}
