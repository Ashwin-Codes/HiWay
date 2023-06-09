export const devServerUrl = "http://localhost:4000";

export const apiRoutes = {
	signup: "/signup",
	signin: "/login",
	logout: "/logout",
	refresh: "/refresh",
	socket: "/",
};

const routes = new Proxy(
	{},
	{
		get: function (target, props) {
			if (process.env.NODE_ENV === "production") {
				return apiRoutes[props];
			} else {
				return devServerUrl + apiRoutes[props];
			}
		},
	}
);

export default routes;
