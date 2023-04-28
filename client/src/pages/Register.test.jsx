import { render, screen } from "../util/test-utils";
import Register from "./Register";

describe("Register Page", () => {
	it("should render correctly", () => {
		render(<Register />);
		const signIn = screen.getByRole("heading", { name: /sign up/i });
		expect(signIn).toBeInTheDocument();
	});
});
