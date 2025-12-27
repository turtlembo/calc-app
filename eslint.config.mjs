import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
// import { rules } from "eslint-config-prettier";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, prettier:prettierPlugin }, extends: ["js/recommended", eslintConfigPrettier], languageOptions: { globals: globals.browser }  },
  {
    rules:{
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "error",
      eqeqeq: "error"
    },
  }
]);
