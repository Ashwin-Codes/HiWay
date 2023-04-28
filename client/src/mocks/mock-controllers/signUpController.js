export default function signUpController(req, res, ctx) {
	const registeredEmail = "email@email.com";
	const registeredUsername = "iamtestuser";

	const { email, username } = req.body;

	if (username === "sendStatus500") {
		return res(ctx.status(500));
	}

	if (email === registeredEmail) {
		return res(
			ctx.status(409),
			ctx.json({
				message: "email already in use",
			})
		);
	}
	if (username === registeredUsername) {
		return res(
			ctx.status(409),
			ctx.json({
				message: "username not available",
			})
		);
	}
	return res(
		ctx.status(201),
		ctx.json({
			message: "user created",
		})
	);
}
