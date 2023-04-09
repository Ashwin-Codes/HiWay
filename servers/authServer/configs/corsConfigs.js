const env = process.env.NODE_ENV;

const corsConfig = {
	origin: env ? [] : ["http://localhost:3000"],
};

export default corsConfig;
