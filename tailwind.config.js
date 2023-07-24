/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 49%": {
            opacity: 1,
          },
          "50%, 100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
      colors: {
        campbell: {
          black: {
            light: "#767676",
            DEFAULT: "#0c0c0c",
          },
          gray: {
            light: "#f2f2f2",
            DEFAULT: "#cccccc",
          },
          red: {
            light: "#e74856",
            DEFAULT: "#c50f1f",
          },
          green: {
            light: "#16c60c",
            DEFAULT: "#13a10e",
          },
          yellow: {
            light: "#f9f1a5",
            DEFAULT: "#c19c00",
          },
          blue: {
            light: "#3b78ff",
            DEFAULT: "#0037da",
          },
          magenta: {
            light: "#b4009e",
            DEFAULT: "#881798",
          },
          cyan: {
            light: "#61d6d6",
            DEFAULT: "#3a96dd",
          },
          selection: {
            DEFAULT: "#606060",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  safelist: [
    {
      pattern: /^bg-campbell-.+/,
    },
    {
      pattern: /^text-campbell-.+/,
    },
    "inset-0",
    "bg-opacity-50",
    "text-opacity-50",
    "font-bold",
    "italic",
    "underline",
  ],
};
