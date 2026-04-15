import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C2833", // Deep Charcoal/Navy (Hass signature)
        accent: "#C5A059", // Antique Gold
        "accent-dark": "#A68648", // Darker Gold/Bronze
        background: "#FFFFFF",
        "background-alt": "#F9F9F9", // Very light crisp gray
        text: "#444444", // Soft charcoal for less visual strain
        "text-light": "#777777", // Lighter gray for secondary text
        border: "#EAEAEA", // Crisper sharp borders
        sand: "#F7F6F2",
        ivory: "#FAFAF5",
        charcoal: "#151F28", // Even deeper navy for pure dark themes/footers
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        editorial: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      letterSpacing: {
        "luxury-wide": "0.15em",
        "luxury-widest": "0.25em",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
