/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "mcea-1": "#164863",
      "mcea-2": "#427D9D",
      "mcea-3": "#9BBEC8",
      "mcea-4": "#DDF2FD",
      white: colors.white,
      black: colors.black,
    },
    extend: {},
  },
  plugins: [],
};
