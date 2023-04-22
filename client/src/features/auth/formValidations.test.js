import formValidations from "./formValidations";

describe("form validation logic", () => {
	it("should return false on incorrect email input", async () => {
		const { emailValidation } = formValidations();

		let requiredValidationEmptyString = emailValidation.required("");
		expect(requiredValidationEmptyString).toBe(false);

		let validEmailValidation = emailValidation.validEmail("test");
		expect(validEmailValidation).toBe(false);
	});

	it("should return true on correct email input", async () => {
		const { emailValidation } = formValidations();

		let requiredValidation = emailValidation.required("test");
		expect(requiredValidation).toBe(true);

		let validEmailValidation = emailValidation.validEmail("test@test.com");
		expect(validEmailValidation).toBe(true);
	});

	it("should return false on incorrect password input", async () => {
		const { passwordValidation } = formValidations();

		let requiredValidationEmptyString = passwordValidation.required("");
		expect(requiredValidationEmptyString).toBe(false);

		let passwordLengthValidation = passwordValidation.passwordLength("12345");
		expect(passwordLengthValidation).toBe(false);
	});

	it("should return true on correct password input", async () => {
		const { passwordValidation } = formValidations();

		let requiredValidationEmptyString = passwordValidation.required("test");
		expect(requiredValidationEmptyString).toBe(true);

		let passwordLengthValidation = passwordValidation.passwordLength("123456");
		expect(passwordLengthValidation).toBe(true);
	});

	it("should return correct error message", async () => {
		const { getSigninErrorMessage } = formValidations();

		const emailErrorMessage = getSigninErrorMessage("email", "required");
		expect(emailErrorMessage).toBe("Please enter an email");

		const passwordErrorMessage = getSigninErrorMessage("password", "required");
		expect(passwordErrorMessage).toBe("Please enter a password");
	});
});
