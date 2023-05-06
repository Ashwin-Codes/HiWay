const authServer = "http://localhost:5000/";

const apiRoutes = {
	verifyUser: "api/verifyUser",
};

const routes = new Proxy(
	{},
	{
		get: (target, props) => {
			if (apiRoutes[props]) {
				return authServer + apiRoutes[props];
			}

			throw new Error(`${props} is not a route`);
		},
	}
);

export default routes;
