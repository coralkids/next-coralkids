// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  ignorePatterns: ["/dist/*", "/app-example"],
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
