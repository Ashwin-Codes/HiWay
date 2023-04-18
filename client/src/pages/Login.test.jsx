import { render, screen } from "../util/test-utils";
import Login from "./Login";

describe("Login Page", () => {
	it("should render correctly", () => {
		render(<Login />);
		const signIn = screen.getByRole("heading", { name: /sign in/i });
		expect(signIn).toBeInTheDocument();
	});
});
