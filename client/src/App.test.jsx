import { render, screen } from "./util/test-utils";
import App from "./App";

describe("App", () => {
	it("should render login page when not authenticated", () => {
		render(<App />);
		const signUpPageElement = screen.getByRole("heading", { name: /sign in/i });
		expect(signUpPageElement).toBeInTheDocument();
	});
});
