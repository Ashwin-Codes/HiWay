import routes from "./routes";
import { apiRoutes, devServerUrl } from "./routes";

describe("Routes util function", () => {
	beforeEach(() => {
		process.env.NODE_ENV = "test";
	});

	it("should return route with localhost base url in development environment", () => {
		const route = routes.signup;
		expect(route).toContain(devServerUrl);
	});

	it("should return route without localhost base url in production environment", () => {
		process.env.NODE_ENV = "production";
		const route = routes.signup;
		expect(route).not.toContain(devServerUrl);
	});

	it("should return correct routes in development environment", () => {
		const signup = routes.signup;
		const signin = routes.signin;
		const logout = routes.logout;
		const refresh = routes.refresh;

		expect(signup).toBe(devServerUrl + apiRoutes.signup);
		expect(signin).toBe(devServerUrl + apiRoutes.signin);
		expect(logout).toBe(devServerUrl + apiRoutes.logout);
		expect(refresh).toBe(devServerUrl + apiRoutes.refresh);
	});

	it("should return correct routes in production environment", () => {
		process.env.NODE_ENV = "production";

		const signup = routes.signup;
		const signin = routes.signin;
		const logout = routes.logout;
		const refresh = routes.refresh;

		expect(signup).toBe(apiRoutes.signup);
		expect(signin).toBe(apiRoutes.signin);
		expect(logout).toBe(apiRoutes.logout);
		expect(refresh).toBe(apiRoutes.refresh);
	});
});
