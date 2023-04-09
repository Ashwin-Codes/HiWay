import mongoose from "mongoose";

export default async function connectDatabase() {
	try {
		await mongoose.connect(process.env.DATABASE_URI);
	} catch (err) {
		console.error(err.message);
	}
}
