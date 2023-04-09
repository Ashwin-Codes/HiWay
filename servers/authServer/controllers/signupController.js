import bcrypt from "bcrypt";
import User from "../model/User.js";
import { validateSignup } from "../utilities/inputValidation.js";

async function signupController(req, res, next) {
	const { username, email, password } = req.body;

	// Check for falsy inputs
	const isValid = validateSignup(username, email, password);
	if (!isValid) {
		res.status(400).json({
			message: "invalid input fields",
		});
		return;
	}

	// Check for conflicting username and email
	const findByUsername = await User.findOne({ username }).exec();
	const findByEmail = await User.findOne({ email }).exec();

	if (findByUsername) {
		res.status(409).json({
			message: "username not available",
		});
		return;
	}
	if (findByEmail) {
		res.status(409).json({
			message: "email already in use",
		});
		return;
	}

	// Create User
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res.status(201).json({
			message: "user created",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
}

export default signupController;
