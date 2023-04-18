import { render, screen } from "../../util/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { act } from "react-dom/test-utils";
import App from "../../App";

describe("Login form", () => {
	it("should render without crash", () => {
		render(<LoginForm />);
		const signInHeadingElement = screen.getByRole("heading", {
			name: /sign in/i,
		});
		expect(signInHeadingElement).toBeInTheDocument();
	});

	it("should redirect to signup route on btn click", async () => {
		const user = userEvent.setup();
		render(
			<App>
				<LoginForm />
			</App>
		);
		const signUpBtn = screen.getByRole("link", {
			name: /sign up/i,
		});

		await act(async () => {
			await user.click(signUpBtn);
		});

		expect(window.location.pathname).toBe("/signup");
	});
});
