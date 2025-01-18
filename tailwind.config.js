/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Quét các file HTML trong thư mục
  theme: {
    extend: {
      colors: {
        darkGreen: "#859c84",        // customGreen1 - màu xanh đậm
        darkTeal: "#285552",         // customTeal1 - màu teal đậm
        mediumTeal: "#3a6d69",       // customTeal2 - màu teal vừa
        darkGray: "#656c67",         // customGray1 - màu xám đậm
        darkBlue: "#305661",         // customBlue1 - màu xanh dương đậm
        lightBlue: "#6092a6",        // customBlue2 - màu xanh dương nhạt
        mediumBlue: "#547c89",       // customBlue3 - màu xanh dương vừa
        lightBlue2: "#76b6c5",       // customBlue4 - màu xanh dương rất nhạt
        lightGray: "#cccecc",        // customGray2 - màu xám nhạt
        veryDarkBlue: "#24313f"      // customDarkBlue - màu xanh dương tối
      },
    },
  },
  plugins: [],
};
