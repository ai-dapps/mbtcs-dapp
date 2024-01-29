module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // {
    //   pattern: /rotate-\[(432000 | 216000)deg\]/,
    // },
    // ...[...Array(768).keys()].flatMap((i) => [`max-w-[${i}px]`, `w-[${i}px]`]),
  ],
  theme: {
    screens: {
      "2xs": { max: "399px" },
      // => @media (max-width: 399px) { ... }
      xs: { min: "400px", max: "649px" },
      // => @media (min-width: 400px, max-width: 649px) { ... }
      sm: { min: "650px", max: "767px" },
      // => @media (min-width: 650px and max-width: 767px) { ... }
      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }
      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      //   advent: "'Advent Pro'",
      //   goldman: "'Goldman'",
      //   Montserrat: "'Montserrat'",
      //   poppins: "Poppins",
      //   noto: "'Noto Sans KR'",
      MyriadPro: "'MyriadPro'",
      Gotham: "'Gotham'",
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
    keyframes: {
      fadeIn: {
        from: {
          opacity: "0.1",
          transform: "translateY(50px)",
        },
        to: {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      spin: {
        from: {
          transform: "rotate(0)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      arrow: {
        from: {
          opacity: ".5",
        },
        to: {
          opacity: "1",
        },
      },
    },
    animation: {
      openRecord: "openRecord 2s ease-in-out 1 forwards",
      closeRecord: "closeRecord 2s ease-in-out 1 forwards",
      fadeIn: "fadeIn .3s ease 1 forwards",
      spin: "spin 1s linear infinite forwards",
      arrow: "arrow .5s infinite alternate",
      arrow2: "arrow .5s infinite .5s alternate",
    },
  },
  plugins: [],
};
