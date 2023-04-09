import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({
	quote: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Quote", quotesSchema);
