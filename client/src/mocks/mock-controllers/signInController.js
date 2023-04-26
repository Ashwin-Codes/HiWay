export default function signInController(req, res, ctx) {
	const { username, password } = req.body;

	if (username === "testuser" && password === "testpassword") {
		return res(
			ctx.status(200),
			ctx.json({
				accessToken:
					"Z?Gh2y21t9VVs6IzNPfcEoGVfAKcCCAPe?rMpb/auB5wOk4Gy9G4yJwmAuvVgxHDMqiIBGn03pdO5dyaefsG!XHEGRTlnvvhnWNfQZe0H7bbfhAeYRUOYZrT3c-zm2wG!1vNZhJFy0D03e1L=a99kTGPPteXg!xJHf!jE0=c?j7Ef6C8F3ZmO?3nEL8?8?PtizsiJ4qIPFZeeI873wIw9Y5xnRrRzwMG=saTRGGY3fq-fm?gVOPq-mw1Al8OA5hj",
			})
		);
	} else {
		return res(
			ctx.status(401),
			ctx.json({
				message: "invalid credentials",
			})
		);
	}
}
