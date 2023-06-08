export default function promisifiedTimeout(condition) {
	let timeoutInMs = 5000;
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (condition()) {
				resolve();
				clearInterval(interval);
				return;
			}
			if (timeoutInMs <= 0) {
				reject();
				clearInterval(interval);
			}
			timeoutInMs = timeoutInMs - 100;
		}, 100);
	});
}
