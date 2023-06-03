const env = process.env.NODE_ENV;

const corsConfig = {
	origin: env ? [] : ["http://localhost:3000", "http://192.168.0.108:3000"],
};

export default corsConfig;
