// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],

//   daisyui: {
//     themes: [
//       {
//         mytheme: {
//           primary: "#2BCAC2",
//           secondary: "#FFC000",
//           accent: "#FFEDD5",
//           neutral: "#F3F4F6",
//           "base-100": "#ffffff",
//           info: "#98A8DD",
//           success: "#1BBB70",
//           warning: "#DF7E07",
//           error: "#FA5C5C",
//         },
//       },
//     ],
//   },

//   plugins: [require("daisyui")],
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#142850",
          secondary: "#FFC000",
          accent: "#FFEDD5",
          neutral: "#F3F4F6",
          "base-100": "#ffffff",
          info: "#98A8DD",
          success: "#1BBB70",
          warning: "#DF7E07",
          error: "#FA5C5C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
