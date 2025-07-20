/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your project
  ],
  theme: {
    extend: {
      colors: {
        healPurple: "#c26dbc",
      },
    },
  },
  plugins: [],
};

export default config;
