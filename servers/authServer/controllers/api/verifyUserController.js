import jwt from "jsonwebtoken";

async function verifyUserController(req, res, next) {
	const authToken = req?.body?.accessToken;

	if (!authToken) {
		res.json({ userIsValid: true });
		return;
	}

	jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		const userValidityResponse = { userIsValid: true };
		if (error) {
			userValidityResponse.userIsValid = false;
		}
		res.json(userValidityResponse);
	});
}

export default verifyUserController;
