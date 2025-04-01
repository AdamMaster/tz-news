import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

const config = [
  {
    ignores: ["README.md"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      /* Общие правила */
      "no-nested-ternary": "error",

      /* Правила работы с React */
      "react/prop-types": "off",
      "react/jsx-curly-spacing": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-array-index-key": "warn",
      "react/boolean-prop-naming": "error",
      "react/display-name": ["off", { ignoreTranspilerName: true }],
      "react/destructuring-assignment": ["error", "always"],
      "react/jsx-fragments": ["error", "element"],
      "react/jsx-handler-names": "error",
      "react/jsx-sort-props": [
        0,
        {
          callbacksLast: true,
          multiline: "last",
          noSortAlphabetically: true
        }
      ],

      "import/no-restricted-paths": ["error"],

      /* Правила работы с TypeScript */
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  }
];

export default config;