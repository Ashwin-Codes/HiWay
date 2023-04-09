import User from "../model/User.js";

async function logoutController(req, res, next) {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
	const refreshToken = cookies.jwt;

	const user = await User.findOne({ refreshToken });
	if (!user) return res.sendStatus(401); // Unauthorized

	// Delete user's refresh token in DB
	user.refreshToken = null;
	await user.save();

	// Delete user's refresh token from browser
	res.clearCookie("jwt", { httpOnly: true });
	res.json({ message: "logout successful" });
}

export default logoutController;
