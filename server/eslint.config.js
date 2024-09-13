module.exports = [
    {
        ignores: ["node_modules", "dist"],
    },
    {
        files: ["src/**/*.{ts,js}"],
        languageOptions: {
            parser: require("@typescript-eslint/parser"),
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
            prettier: require("eslint-plugin-prettier"),
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": "warn",
            "no-console": "off",
        },
        settings: {
            node: {
                tryExtensions: [".ts", ".js"],
            },
        },
    },
];
