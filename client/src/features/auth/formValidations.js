const signinErrorMessages = {
	email: {
		required: "Please enter an email",
		validEmail: "Please enter a valid email",
	},
	password: {
		required: "Please enter a password",
		passwordLength: "Password must be at least 6 characters",
	},
};

function getSigninErrorMessage(input, validationKey) {
	return signinErrorMessages[input][validationKey];
}

export default function formValidations() {
	const emailValidation = {
		required: (email) => !!email,
		validEmail: (email) => {
			const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
			return emailRegex.test(email);
		},
	};

	const passwordValidation = {
		required: (password) => !!password,
		passwordLength: (password) => (password?.length < 6 ? false : true),
	};

	return { emailValidation, passwordValidation, getSigninErrorMessage };
}
