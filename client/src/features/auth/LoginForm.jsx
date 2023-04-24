import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useFormState from "../../hooks/useFormState";
import formValidations from "./formValidations";
import { useDispatch, useSelector } from "react-redux";
import { signIn, getAuth } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters as Loader } from "react-icons/ai";

export default function LoginForm({ className }) {
	const { usernameValidation, passwordValidation, getSigninErrorMessage } = formValidations();
	const { useInput, getFormState, isValidForm } = useFormState();
	const { ref: usernameRef, inFocus: setUsernameInFocus } = useInput("username", usernameValidation);
	const { ref: passwordRef, inFocus: setPasswordInFocus } = useInput("password", passwordValidation);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formErrors, setFormErrors] = useState({
		username: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const auth = useSelector(getAuth);

	useEffect(() => {
		if (auth.username && auth.accessToken) {
			navigate("/");
		}
	}, [auth, navigate]);

	useEffect(() => {
		setUsernameInFocus();
	}, [setUsernameInFocus]);

	async function submitHandler(e) {
		e.preventDefault();
		const formState = getFormState();

		if (!isValidForm()) {
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
			username: formState.username.value,
			password: formState.password.value,
		};

		try {
			setLoading(true);
			await dispatch(signIn(credentials)).unwrap();
		} catch (err) {
			setLoading(false);
		}
	}

	function setErrors(formState) {
		const errors = {
			...formErrors,
		};

		if (formState.username.validation.error) {
			const errorMessage = getSigninErrorMessage("username", formState.username.validation.failed);
			errors.username = errorMessage;
		}

		if (formState.password.validation.error) {
			const errorMessage = getSigninErrorMessage("password", formState.password.validation.failed);
			errors.password = errorMessage;
		}

		setFormErrors(errors);
	}

	function onUsernameChangeHandler() {
		if (formErrors?.username?.length > 0) {
			setFormErrors({ ...formErrors, username: "" });
		}
	}

	function onUsernameBlurHandler() {
		const formState = getFormState();
		const errorMessage = getSigninErrorMessage("username", formState.username.validation.failed);
		setFormErrors({ ...formErrors, username: errorMessage });
	}

	function onPasswordChangeHandler() {
		if (formErrors?.password?.length > 0) {
			setFormErrors({ ...formErrors, password: "" });
		}
	}

	function onPasswordBlurHandler() {
		const formState = getFormState();
		const errorMessage = getSigninErrorMessage("password", formState.password.validation.failed);
		setFormErrors({ ...formErrors, password: errorMessage });
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
							disabled={loading ? true : false}
							type="submit"
							className="w-full h-full bg-slate-blue-500 rounded-lg text-white flex justify-center items-center">
							{loading ? <Loader className="animate-spin text-xl" /> : "Sign in"}
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
