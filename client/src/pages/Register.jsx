import FormPageWrapper from "../components/FormPageWrapper";
import SignupForm from "../features/auth/SignupForm";

export default function Register() {
	return (
		<FormPageWrapper>
			<SignupForm className="max-w-md sm:border-2 sm:rounded-lg sm:w-[70%] sm:p-10 lg:p-4" />
		</FormPageWrapper>
	);
}
