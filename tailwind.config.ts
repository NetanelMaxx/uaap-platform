import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can keep any custom theme extensions here
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1.15)', opacity: '1' },
        }
      },
      animation: {
        kenburns: 'kenburns 8s ease-out forwards',
      }
    },
  },
  plugins: [],
};
export default config;