import { render, screen } from "../../util/test-utils";
import userEvent from "@testing-library/user-event";
import SignupForm from "./SignupForm";
import { act } from "react-dom/test-utils";

describe("Signup form", () => {
	it("should render without crash", () => {
		render(<SignupForm />);
		const signInHeadingElement = screen.getByRole("heading", {
			name: /sign up/i,
		});
		expect(signInHeadingElement).toBeInTheDocument();
	});

	it("should redirect to signin route on btn click", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const signinBtn = screen.getByRole("link", {
			name: /sign in/i,
		});
		await act(async () => {
			await user.click(signinBtn);
		});
		expect(window.location.pathname).toBe("/login");
	});

	it("should render correct error empty email input", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const submitBtn = screen.getByRole("button", {
			name: /sign up/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/please enter an email/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error on invalid email", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const emailInput = screen.getByLabelText(/email/i);

		await act(async () => {
			await user.type(emailInput, "notvalidemail{enter}");
		});

		const errorEle = screen.getByText(/please enter a valid email/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error empty username input", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const submitBtn = screen.getByRole("button", {
			name: /sign up/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/Please pick a username/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error on incorrect username length", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const usernameInput = screen.getByLabelText(/username/i);

		await act(async () => {
			await user.type(usernameInput, "abcde{enter}");
		});

		const errorEle = screen.getByText(/Username must have 6 to 18 characters/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error on no password input", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);

		const submitBtn = screen.getByRole("button", {
			name: /sign up/i,
		});

		await act(async () => {
			await user.click(submitBtn);
		});

		const errorEle = screen.getByText(/Please pick a password/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should render correct error when password length is less than 6", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(password, "12345{enter}");
		});

		const errorEle = screen.queryByText(/Password must be at least 6 characters/i);
		expect(errorEle).toBeInTheDocument();
	});

	it("should not render error on accepted password", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);
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
		render(<SignupForm />);

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

	it("should pop error for no password when submitted form with correct email", async () => {
		const user = userEvent.setup();
		render(<SignupForm />);

		const email = screen.getByLabelText(/email/i);

		await act(async () => {
			await user.type(email, "test@test.com{enter}");
		});

		let errorMessage = screen.getByText(/Please pick a password/i);
		expect(errorMessage).toBeInTheDocument();
	});

	it("should redirect to login on signup", async () => {
		const user = userEvent.setup();

		render(<SignupForm />);

		const email = screen.getByLabelText(/email/i);
		const username = screen.getByLabelText(/username/i);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(email, "test@test.com");
			await user.type(username, "testuser");
			await user.type(password, "testpassword{enter}");
		});

		expect(window.location.pathname).toBe("/login");
	});

	it("should show error if username is taken", async () => {
		const user = userEvent.setup();

		render(<SignupForm />);

		const email = screen.getByLabelText(/email/i);
		const username = screen.getByLabelText(/username/i);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(email, "test@test.com");
			await user.type(username, "iamtestuser");
			await user.type(password, "testpassword{enter}");
		});
		const errorMessage = screen.getByText(/username not available/i);
		expect(errorMessage).toBeInTheDocument();
	});
	it("should show error if email is already being used", async () => {
		const user = userEvent.setup();

		render(<SignupForm />);

		const email = screen.getByLabelText(/email/i);
		const username = screen.getByLabelText(/username/i);
		const password = screen.getByLabelText(/password/i);

		await act(async () => {
			await user.type(email, "email@email.com");
			await user.type(username, "testusername");
			await user.type(password, "testpassword{enter}");
		});
		const errorMessage = screen.getByText(/email already in use/i);
		expect(errorMessage).toBeInTheDocument();
	});
});
