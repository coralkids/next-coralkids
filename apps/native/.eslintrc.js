// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  ignorePatterns: ["/dist/*", "/app-example"],
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  paths: {
    "@/*": ["./*"],
  },
};
