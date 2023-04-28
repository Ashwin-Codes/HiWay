import passwordValidator from "password-validator";

const validationRegex = {
	username: /^.{6,18}$/,
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

const passwordSchema = new passwordValidator();
passwordSchema.is().min(6);

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
