const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#7B7C00", 
        "secondary-color" :'#9A9348'
      },
    },
  },
  plugins: [require("daisyui")],
});
