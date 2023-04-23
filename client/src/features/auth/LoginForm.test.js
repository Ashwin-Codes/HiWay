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

	it("should render correct error on no email input", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const submitBtn = screen.getByRole("button", {
			name: /sign in/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/Please enter an email/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error on invalid email input", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const emailInput = screen.getByLabelText(/email/i);

		await act(async () => {
			await user.type(emailInput, "test{enter}");
		});

		const errorEle = screen.getByText(/Please enter a valid email/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should not render error block on correct email pattern", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const emailInput = screen.getByLabelText(/email/i);

		await act(async () => {
			await user.type(emailInput, "test@test.com{enter}");
		});

		const errorEleOne = screen.queryByText(/Please enter a valid email/i);
		const errorEleTwo = screen.queryByText(/Please enter an email/i);

		expect(errorEleOne).toBe(null);
		expect(errorEleTwo).toBe(null);
	});

	it("should render correct error on no password input", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		const submitBtn = screen.getByRole("button", {
			name: /sign in/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/Please enter a password/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error when password length is less than 6", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(password, "12345{enter}");
		});

		const errorEle = screen.queryByText(/Password must be at least 6 characters/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should not render error on accepted password", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(password, "123456{enter}");
		});

		const errorEleOne = screen.queryByText(/Please enter a password/i);
		const errorEleTwo = screen.queryByText(/Password must be at least 6 characters/i);

		expect(errorEleOne).toBe(null);
		expect(errorEleTwo).toBe(null);
	});

	it("should remove error on type", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		const email = screen.getByLabelText(/email/i);
		await act(async () => {
			await user.type(email, "test{enter}");
		});

		let emailBeforeCorrectInput = screen.getByText(/please enter a valid email/i);
		expect(emailBeforeCorrectInput).toBeInTheDocument();

		await act(async () => {
			await user.type(email, "test");
		});

		let emailAfterCorrectInput = screen.queryByText(/please enter a valid email/i);
		expect(emailAfterCorrectInput).toBe(null);
	});

	it("should pop error for no password when submitted form with correct email", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		const email = screen.getByLabelText(/email/i);

		await act(async () => {
			await user.type(email, "test@test.com{enter}");
		});

		let errorMessage = screen.getByText(/please enter a password/i);
		expect(errorMessage).toBeInTheDocument();
	});
});
