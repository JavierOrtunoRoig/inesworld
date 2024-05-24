/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
		require('tailwindcss-animated')
	],
	daisyui: {
		themes: [{
			"ines-theme": {
				"primary": "#7582ff",
				"primary-content": "#050617",
				"secondary": "#ff71cf",
				"secondary-content": "#190211",
				"accent": "#00c7b5",
				"accent-content": "#000e0c",
				"neutral": "#2a323c",
				"neutral-content": "#a6adbb",
				"base-100": "#1d232a",
				"base-200": "#191e24",
				"base-300": "#15191e",
				"base-content": "#a6adbb",
				"info": "#00b3f0",
				"info-content": "#000000",
				"success": "#00a96f",
				"success-content": "#000000",
				"warning": "#ffc22d",
				"warning-content": "#000000",
				"error": "#ff6f70",
				"error-content": "#000000"
			}
		}], // the first one is the default theme
	},
}