import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String || null,
		default: null,
	},
});

export default mongoose.model("User", userSchema);
