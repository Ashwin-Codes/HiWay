export default function animateLogo(logoTextRef, setLogoText) {
	let textToInsert = "gh definition  Gate";
	let insertFrom = 2;
	let i = 0;
	let pauseTime = null;

	const interval = setInterval(() => {
		if (i === textToInsert.length) {
			if (!pauseTime) {
				pauseTime = new Date();
				return;
			}
			if (!(Math.abs(pauseTime - new Date()) > 1500)) return;
			if (insertFrom === 2) {
				clearInterval(interval);
				return;
			}
			--insertFrom;
			logoTextRef.current = logoTextRef.current.slice(0, insertFrom) + logoTextRef.current.slice(insertFrom + 1);
			setLogoText(logoTextRef.current);
			return;
		}
		logoTextRef.current =
			logoTextRef.current.slice(0, insertFrom) + textToInsert[i] + logoTextRef.current.slice(insertFrom);
		setLogoText(logoTextRef.current);
		insertFrom++;
		i++;
	}, 50);

	return interval;
}
