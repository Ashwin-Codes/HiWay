export const devServerUrl = "http://localhost:5000";

export const apiRoutes = {
	signup: "/signup",
	signin: "/login",
	logout: "/logout",
	refresh: "/refresh",
};

const routes = new Proxy(
	{},
	{
		get: function (target, props) {
			if (process.env.NODE_ENV === "development") {
				return devServerUrl + apiRoutes[props];
			} else if (process.env.NODE_ENV === "production") {
				return apiRoutes[props];
			}
		},
	}
);

export default routes;
