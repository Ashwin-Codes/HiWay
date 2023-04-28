const signinErrorMessages = {
	username: {
		required: "Please enter a username",
		usernameLength: "Username must have 6 to 18 characters",
	},
	password: {
		required: "Please enter a password",
		passwordLength: "Password must be at least 6 characters",
	},
};

const signupErrorMessages = {
	email: {
		required: "Please enter an email",
		validEmail: "Please enter a valid email",
	},
	username: {
		required: "Please pick a username",
		usernameLength: "Username must have 6 to 18 characters",
	},
	password: {
		required: "Please pick a password",
		passwordLength: "Password must be at least 6 characters",
	},
};

function getSigninErrorMessage(input, validationKey) {
	return signinErrorMessages[input][validationKey];
}

function getSignupErrorMessage(input, validationKey) {
	return signupErrorMessages[input][validationKey];
}

export default function formValidations() {
	const emailValidation = {
		required: (email) => !!email,
		validEmail: (email) => {
			const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
			return emailRegex.test(email);
		},
	};

	const usernameValidation = {
		required: (username) => !!username,
		usernameLength: (username) => username.length >= 6 && username.length <= 18,
	};

	const passwordValidation = {
		required: (password) => !!password,
		passwordLength: (password) => (password?.length < 6 ? false : true),
	};

	return { emailValidation, passwordValidation, usernameValidation, getSigninErrorMessage, getSignupErrorMessage };
}
