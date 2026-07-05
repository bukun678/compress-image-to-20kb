import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171321",
        berry: "#ff4f9a",
        mango: "#ffbf3f",
        limepop: "#7ee957",
        pool: "#2fd4ff",
        violetpop: "#8b5cf6"
      },
      boxShadow: {
        candy: "0 24px 80px rgba(23, 19, 33, 0.18)",
        soft: "0 16px 40px rgba(23, 19, 33, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
