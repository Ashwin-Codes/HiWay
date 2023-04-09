import passwordValidator from "password-validator";

const validationRegex = {
	username: /^[^\W_](?!.*?[._]{2})[\w.]{6,18}[^\W_]$/,
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

const passwordSchema = new passwordValidator();
passwordSchema.is().min(8).is().max(30).has().uppercase().has().lowercase().has().digits(2);

function validateSignup(username, email, password) {
	if (!username || !email || !password) {
		return false;
	}
	const isValid =
		username.match(validationRegex.username) &&
		email.match(validationRegex.email) &&
		passwordSchema.validate(password);

	return isValid;
}

function validateLogin(username, password) {
	if (!username || !password) {
		return false;
	}
	return true;
}

export { validateSignup, validateLogin };
