import formValidations from "./formValidations";

describe("form validation logic", () => {
	it("should return false on invalid email input", async () => {
		const { emailValidation } = formValidations();

		let requiredValidationEmptyString = emailValidation.required("");
		expect(requiredValidationEmptyString).toBe(false);

		let validEmailValidation = emailValidation.validEmail("test");
		expect(validEmailValidation).toBe(false);
	});

	it("should return true on valid email input", async () => {
		const { emailValidation } = formValidations();

		let requiredValidation = emailValidation.required("test");
		expect(requiredValidation).toBe(true);

		let validEmailValidation = emailValidation.validEmail("test@test.com");
		expect(validEmailValidation).toBe(true);
	});

	it("should return false on invalid username input", async () => {
		const { usernameValidation } = formValidations();

		let requiredValidationEmptyString = usernameValidation.required("");
		expect(requiredValidationEmptyString).toBe(false);

		let usernameLengthValidation = usernameValidation.usernameLength("test");
		expect(usernameLengthValidation).toBe(false);
	});

	it("should return true on valid username input", async () => {
		const { usernameValidation } = formValidations();

		let requiredValidationEmptyString = usernameValidation.required("test");
		expect(requiredValidationEmptyString).toBe(true);

		let usernameLengthValidation = usernameValidation.usernameLength("abcdef");
		expect(usernameLengthValidation).toBe(true);
	});

	it("should return false on invalid password input", async () => {
		const { passwordValidation } = formValidations();

		let requiredValidationEmptyString = passwordValidation.required("");
		expect(requiredValidationEmptyString).toBe(false);

		let passwordLengthValidation = passwordValidation.passwordLength("12345");
		expect(passwordLengthValidation).toBe(false);
	});

	it("should return true on valid password input", async () => {
		const { passwordValidation } = formValidations();

		let requiredValidationEmptyString = passwordValidation.required("test");
		expect(requiredValidationEmptyString).toBe(true);

		let passwordLengthValidation = passwordValidation.passwordLength("123456");
		expect(passwordLengthValidation).toBe(true);
	});

	it("should return valid error message from getSigninErrorMessage function", async () => {
		const { getSigninErrorMessage } = formValidations();

		const usernameErrorMessage = getSigninErrorMessage("username", "required");
		expect(usernameErrorMessage).toBe("Please enter a username");

		const passwordErrorMessage = getSigninErrorMessage("password", "required");
		expect(passwordErrorMessage).toBe("Please enter a password");
	});

	it("should return valid error message from getSignupErrorMessage function", async () => {
		const { getSignupErrorMessage } = formValidations();

		const emailErrorMessage = getSignupErrorMessage("email", "required");
		expect(emailErrorMessage).toBe("Please enter an email");

		const usernameErrorMessage = getSignupErrorMessage("username", "required");
		expect(usernameErrorMessage).toBe("Please pick a username");

		const passwordErrorMessage = getSignupErrorMessage("password", "required");
		expect(passwordErrorMessage).toBe("Please pick a password");
	});
});
