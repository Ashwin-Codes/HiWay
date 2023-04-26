import { render, screen } from "../util/test-utils";
import FormPageWrapper from "./FormPageWrapper";
import illustration from "../assets/p2p-illustration.svg";
import userEvent from "@testing-library/user-event";
import LoginForm from "../features/auth/LoginForm";
import { act } from "react-dom/test-utils";

beforeEach(() => {
	process.env.NODE_ENV = "test";
});

describe("Form page wrapper component", () => {
	it("should render correctly", () => {
		render(<FormPageWrapper />);
		const logoElement = screen.getByText(/hiway/i);
		expect(logoElement).toBeInTheDocument();
	});

	it("should render passed children", () => {
		const textVal = "child element";
		render(
			<FormPageWrapper>
				<h1>{textVal}</h1>
			</FormPageWrapper>
		);
		const logoElement = screen.getByText(textVal);
		expect(logoElement).toBeInTheDocument();
	});

	it("should render illustration img with correct source", () => {
		render(<FormPageWrapper />);
		const imgElement = screen.getByRole("img");
		expect(imgElement).toHaveAttribute("src", illustration);
	});

	describe("LoginForm toast", () => {
		it("should toast error on invalid credentials", async () => {
			process.env.NODE_ENV = "development";
			const user = userEvent.setup();

			render(
				<FormPageWrapper>
					<LoginForm />
				</FormPageWrapper>
			);

			const username = screen.getByLabelText(/username/i);
			const password = screen.getByLabelText(/password/i);

			await act(async () => {
				await user.type(username, "wronguser");
				await user.type(password, "wrongpassword{enter}");
			});

			const toast = await screen.findByText("Username or password incorrect");
			expect(toast).toBeInTheDocument();
		});
	});
});
