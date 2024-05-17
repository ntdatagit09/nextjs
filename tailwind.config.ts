import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '2/1': '2 / 1',
        '16/9': '16 / 9'
      },
      colors: {
        sgt: {
          primary: {
            light: '#fdda74',
            default: '#fdd152',
            dark: '#b19239',
          },
          secondary: {
            light: '#896046',
            default: '#6c3918',
            dark: '#4b2710',
          },
          'bg-primary': "#f7f9fa",

        },
        youtube: '#FF0000',
        facebook: '#1877F2',
      }
    },
  },
  plugins: [],
};
export default config;
