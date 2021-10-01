module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:import/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "newline-before-return": "error",
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
        "no-console": "warn",
        "quotes": ["error", "double"],
        "@typescript-eslint/quotes": ["error", "double"]
    }
};