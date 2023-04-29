import { useState, useEffect } from "react";
import useFormState from "../../hooks/useFormState";
import formValidations from "./formValidations";
import { useDispatch, useSelector } from "react-redux";
import { signUp, getAuth } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters as Loader } from "react-icons/ai";
import showSignupErrorToast from "../../util/showSignupErrorToast";

export default function Register({ className }) {
	const { emailValidation, usernameValidation, passwordValidation, getSignupErrorMessage } = formValidations();
	const { useInput, getFormState, isValidForm } = useFormState();
	const { ref: emailRef, inFocus: setEmailInFocus } = useInput("email", emailValidation);
	const { ref: usernameRef, inFocus: setUsernameInFocus } = useInput("username", usernameValidation);
	const { ref: passwordRef, inFocus: setPasswordInFocus } = useInput("password", passwordValidation);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formErrors, setFormErrors] = useState({
		email: "",
		username: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const auth = useSelector(getAuth);

	useEffect(() => {
		if (auth.username) {
			navigate("/login");
		}
	}, [auth, navigate]);

	useEffect(() => {
		setEmailInFocus();
	}, [setEmailInFocus]);

	async function submitHandler(e) {
		e.preventDefault();
		const formState = getFormState();

		if (!isValidForm()) {
			if (formState.email.validation.error) {
				setEmailInFocus();
				setErrors(formState);
				return;
			}

			if (formState.username.validation.error) {
				setUsernameInFocus();
				setErrors(formState);
				return;
			}

			if (formState.password.validation.error) {
				setPasswordInFocus();
				setErrors(formState);
				return;
			}
			return;
		}

		const credentials = {
			email: formState.email.value,
			username: formState.username.value,
			password: formState.password.value,
		};

		try {
			setLoading(true);
			await dispatch(signUp(credentials)).unwrap();
		} catch (err) {
			setSignupErrors(err);
			if (!err.status || (err.status >= 500 && err.status <= 505)) {
				showSignupErrorToast(err);
			}
			setLoading(false);
		}
	}

	function setSignupErrors(err) {
		const errors = {
			...formErrors,
		};

		if (err.message === "email already in use") {
			setEmailInFocus();
			errors.email = "Email already in use";
			setFormErrors(errors);
		} else if (err.message === "username not available") {
			setUsernameInFocus();
			errors.username = "Username not available";
			setFormErrors(errors);
		}
	}

	function setErrors(formState) {
		const errors = {
			...formErrors,
		};

		if (formState.email.validation.error) {
			const errorMessage = getSignupErrorMessage("email", formState.email.validation.failed);
			errors.email = errorMessage;
		}

		if (formState.username.validation.error) {
			const errorMessage = getSignupErrorMessage("username", formState.username.validation.failed);
			errors.username = errorMessage;
		}

		if (formState.password.validation.error) {
			const errorMessage = getSignupErrorMessage("password", formState.password.validation.failed);
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
		const errorMessage = getSignupErrorMessage("email", formState.email.validation.failed);
		setFormErrors({ ...formErrors, email: errorMessage });
	}

	function onUsernameChangeHandler() {
		if (formErrors?.username?.length > 0) {
			setFormErrors({ ...formErrors, username: "" });
		}
	}

	function onUsernameBlurHandler() {
		const formState = getFormState();
		const errorMessage = getSignupErrorMessage("username", formState.username.validation.failed);
		setFormErrors({ ...formErrors, username: errorMessage });
	}

	function onPasswordChangeHandler() {
		if (formErrors?.password?.length > 0) {
			setFormErrors({ ...formErrors, password: "" });
		}
	}

	function onPasswordBlurHandler() {
		const formState = getFormState();
		const errorMessage = getSignupErrorMessage("password", formState.password.validation.failed);
		setFormErrors({ ...formErrors, password: errorMessage });
	}

	return (
		<div className={`w-full ${className}`}>
			<div className="mx-8">
				<h1 className="text-3xl font-semibold">Sign Up</h1>
				<h2 className="mt-2 text-gray-500 font-normal">Signup to use peer to peer video chat</h2>
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
						<label htmlFor="username" className="flex flex-col">
							<span className="text-lg">Username</span>
							{formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}

							<input
								type="text"
								id="username"
								className={`border-2 rounded-lg h-10 outline-none px-4 tracking-wider ${
									formErrors.username ? "border-red-200" : ""
								}`}
								ref={usernameRef}
								onChange={onUsernameChangeHandler}
								onBlur={onUsernameBlurHandler}
							/>
						</label>
					</div>
					<div className="px-8 py-2">
						<label htmlFor="password" className="flex flex-col">
							<span className="text-lg">Password</span>
							{formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
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
						<button
							onClick={() => {
								showSignupErrorToast().update("signup-error");
							}}
							disabled={loading ? true : false}
							type="submit"
							className="w-full h-full bg-slate-blue-500 rounded-lg text-white flex justify-center items-center">
							{loading ? <Loader className="animate-spin text-xl" /> : "Sign up"}
						</button>
					</div>
				</form>
				<span className="mt-4 mx-8 text-gray-500 font-normal">
					Already have an account ?{" "}
					<a
						href="/login"
						className="text-slate-blue-500"
						onMouseDown={(e) => {
							e.preventDefault();
							navigate("/login");
						}}>
						Sign In
					</a>
				</span>
			</div>
		</div>
	);
}
