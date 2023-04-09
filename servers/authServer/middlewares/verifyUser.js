import jwt from "jsonwebtoken";

export default function verifyUser(req, res, next) {
	const authHeader = req?.headers["Authorization"] || req?.headers["authorization"];
	if (!authHeader || !authHeader.startsWith("Bearer")) return res.sendStatus(403); // Forbidden
	const accessToken = authHeader.split(" ")[1];
	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		if (error) return res.sendStatus(403);

		const username = decoded.username;
		req.user = username;
		next();
	});
}
