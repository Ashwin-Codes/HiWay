import FormPageWrapper from "../components/FormPageWrapper"
import LoginForm from "../features/auth/LoginForm";

export default function Login() {

	return (
		<FormPageWrapper>
			<LoginForm className="max-w-md sm:border-2 sm:rounded-lg sm:w-[70%] sm:p-10 lg:p-4" />
		</FormPageWrapper>
	)
}
