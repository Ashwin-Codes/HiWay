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

	it("should render correct error on no username input", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const submitBtn = screen.getByRole("button", {
			name: /sign in/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/Please enter a username/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error on incorrect username length", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);
		const usernameInput = screen.getByLabelText(/username/i);

		await act(async () => {
			await user.type(usernameInput, "abcde{enter}");
		});

		const errorEle = screen.getByText(/Username must have 6 to 18 characters/i);
		expect(errorEle).toBeInTheDocument();
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

		const usernameInput = screen.getByLabelText(/username/i);
		await act(async () => {
			await user.type(usernameInput, "test{enter}");
		});

		let usernameBeforeCorrectInput = screen.getByText(/Username must have 6 to 18 characters/i);
		expect(usernameBeforeCorrectInput).toBeInTheDocument();

		await act(async () => {
			await user.type(usernameInput, "test");
		});

		let usernameAfterCorrectInput = screen.queryByText(/Username must have 6 to 18 characters/i);
		expect(usernameAfterCorrectInput).toBe(null);
	});

	it("should pop error for no password when submitted form with correct username", async () => {
		const user = userEvent.setup();
		render(<LoginForm />);

		const username = screen.getByLabelText(/username/i);

		await act(async () => {
			await user.type(username, "username{enter}");
		});

		let errorMessage = screen.getByText(/Please enter a password/i);
		expect(errorMessage).toBeInTheDocument();
	});

	it("should redirect to home on valid credentials", async () => {
		process.env.NODE_ENV = "development";
		const user = userEvent.setup();

		render(<LoginForm />);

		const username = screen.getByLabelText(/username/i);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(username, "testuser");
			await user.type(password, "testpassword{enter}");
		});

		expect(window.location.pathname).toBe("/");
	});
});
