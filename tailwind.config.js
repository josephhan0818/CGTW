/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sage: "#7F9C7C",
        beige: "#EDE6D8",
        ocean: "#0F3B56"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 59, 86, 0.08)"
      }
    }
  },
  plugins: []
};
