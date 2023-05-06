function generate(isUnique = () => true) {
	const uuidSections = [getRandomString(3), getRandomString(4), getRandomString(3)];
	const id = uuidSections.join("-");
	if (isUnique(id)) {
		return id;
	}
	return generate(isUnique);
}

function getRandomString(length) {
	let result = "";
	const characters = "abcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const uuid = {
	generate,
};

export default uuid;
