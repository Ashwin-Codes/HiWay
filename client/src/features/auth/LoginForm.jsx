import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useFormState from "../../hooks/useFormState";
import formValidations from "./formValidations";

export default function LoginForm({ className }) {
	const { emailValidation, passwordValidation, getSigninErrorMessage } = formValidations();

	const { useInput, getFormState, isValidForm } = useFormState();
	const { ref: emailRef, inFocus: setEmailInFocus } = useInput("email", emailValidation);
	const { ref: passwordRef, inFocus: setPasswordInFocus } = useInput("password", passwordValidation);

	const [formErrors, setFormErrors] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		setEmailInFocus();
	}, [setEmailInFocus]);

	function submitHandler(e) {
		e.preventDefault();
		const formState = getFormState();

		if (!isValidForm()) {
			setErrors(formState);
			if (formState.email.validation.error) {
				setEmailInFocus();
				return;
			}

			if (formState.password.validation.error) {
				setPasswordInFocus();
				return;
			}
			return;
		}

		// Ready to send login request
	}

	function setErrors(formState, options = {}) {
		let inputs = {};

		Object.keys(formState).forEach((key) => {
			inputs[key] = true;
		});

		inputs = { ...inputs, ...options };

		const errors = {
			...formErrors,
		};

		if (inputs.email && formState.email.validation.error) {
			const errorMessage = getSigninErrorMessage("email", formState.email.validation.failed);
			errors.email = errorMessage;
		}

		if (inputs.password && formState.password.validation.error) {
			const errorMessage = getSigninErrorMessage("password", formState.password.validation.failed);
			errors.password = errorMessage;
		}

		setFormErrors(errors);
	}

	function onEmailChangeHandler() {
		if (formErrors?.email?.length > 0) {
			setFormErrors({ ...formErrors, email: "" });
		}
	}

	function onEmailBlurHandler() {
		const formState = getFormState();
		setErrors(formState, { password: false });
	}

	function onPasswordChangeHandler() {
		if (formErrors?.password?.length > 0) {
			setFormErrors({ ...formErrors, password: "" });
		}
	}

	function onPasswordBlurHandler() {
		const formState = getFormState();
		setErrors(formState, false, { email: false });
	}

	return (
		<div className={`w-full ${className}`}>
			<div className="mx-8">
				<h1 className="text-3xl font-semibold">Sign In</h1>
				<h2 className="mt-2 text-gray-500 font-normal">Login to use peer to peer video chat</h2>
			</div>
			<div>
				<form className="my-8" onSubmit={submitHandler}>
					<div className="px-8 py-2">
						<label htmlFor="email" className="flex flex-col">
							<span className="text-lg">Email</span>
							{formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

							<input
								type="text"
								id="email"
								className={`border-2 rounded-lg h-10 outline-none px-4 tracking-wider ${
									formErrors.email ? "border-red-200" : ""
								}`}
								ref={emailRef}
								onChange={onEmailChangeHandler}
								onBlur={onEmailBlurHandler}
							/>
						</label>
					</div>
					<div className="px-8 py-2">
						<label htmlFor="password" className="flex flex-col">
							<span className="text-lg">Password</span>
							{formErrors.email && <p className="text-red-500 text-sm">{formErrors.password}</p>}
							<input
								type="password"
								id="password"
								className={`border-2 rounded-lg h-10 outline-none px-4 tracking-wider ${
									formErrors.password ? "border-red-200" : ""
								}`}
								ref={passwordRef}
								onChange={onPasswordChangeHandler}
								onBlur={onPasswordBlurHandler}
							/>
						</label>
					</div>
					<div className="px-8 mt-4 h-10">
						<button type="submit" className="w-full h-full bg-slate-blue-500 rounded-lg text-white">
							Sign in
						</button>
					</div>
				</form>
				<span className="mt-4 mx-8 text-gray-500 font-normal">
					Don't have an account ?{" "}
					<NavLink to={"/signup"} className="text-slate-blue-500">
						Sign up
					</NavLink>
				</span>
			</div>
		</div>
	);
}
