import Quotes from "../model/Quotes.js";

export async function getQuotes(req, res, next) {
	try {
		const allQuotes = await Quotes.find().exec();
		res.json(allQuotes);
	} catch (err) {
		res.sendStatus(500); // Internal server error
	}
}
