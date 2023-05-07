import { errorToast, updateToast } from "../components/Toastify";

export default function showLoginErrorToast(err) {
	const messages = {
		// Error messages
		"invalid credentials": "Username or password incorrect",

		// Error codes
		ERR_NETWORK: "Network error, try again",
		ERR_BAD_RESPONSE: "Server error, fix in process",
	};

	if (err) {
		errorToast({
			message: messages[err.message ? err.message : err.code],
			id: "login-error",
		});
	}

	function update(id) {
		updateToast(id);
	}

	return { update };
}
