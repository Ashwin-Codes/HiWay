/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				seesaw: "slide-up-down 2s linear infinite",
			},
			keyframes: {
				"slide-up-down": {
					"0%": {
						transform: "translateY(0)",
					},
					"50%": {
						transform: "translateY(-10px)",
					},
					"100% ": {
						transform: "translateY(0)",
					},
				},
			},
			fontFamily: {
				neue: ["Bebas Neue", "cursive"],
			},
			colors: {
				"slate-blue": {
					100: "#e7b5ff",
					200: "#cc9cff",
					300: "#b284ff",
					400: "#cc9cff",
					500: "#7e56d9",
					600: "#6440c0",
					700: "#4a2aa7",
					800: "#4a2aa7",
					900: "#010076",
				},
				cultured: "#F3F5F9",
				auroMetal: "#6B8587",
			},
			gridTemplateColumns: {
				split: "repeat(auto-fit, minmax(50%, 1fr))",
			},
		},
	},
	plugins: [],
};
