import jwt from "jsonwebtoken";
import User from "../model/User.js";

async function refreshTokenController(req, res, next) {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

	const refreshToken = cookies.jwt;

	const user = await User.findOne({ refreshToken }).exec();
	if (!user) return res.sendStatus(401); // Unauthorized

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || user.username !== decoded.username)
			return res.status(401).json({ message: "refresh token expired" }); // Unauthorized

		const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		});
		res.json({ username: user.username, accessToken });
	});
}

export default refreshTokenController;
