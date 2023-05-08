import { render, screen } from "./util/test-utils";
import App from "./App";
import Cookies from "js-cookie";
import { act } from "react-dom/test-utils";

describe("App", () => {
	it("should render login page when not authenticated", async () => {
		render(<App />);
		const signUpPageElement = await screen.findByRole("heading", { name: /sign in/i });
		expect(signUpPageElement).toBeInTheDocument();
	});

	it("renders loading page when when accessToken refresh request is in process", async () => {
		render(<App />);
		await act(async () => {
			const loadingElement = await screen.findByTestId("loading-page");
			expect(loadingElement).toBeInTheDocument();
		});
	});

	it("should render home page when authenticated", async () => {
		Cookies.set("jwt", "refreshCookie");
		render(<App />);
		const homePageElement = await screen.findByText(/create a new video chat room/i);
		expect(homePageElement).toBeInTheDocument();
	});
});
