/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "consistent",
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: true,
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        printWidth: 120,
      },
    },
  ],
};