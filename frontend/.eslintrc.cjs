module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		"prettier/prettier": "error",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
	}
};