/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Source: design-system/leeer/MASTER.md — same Claude palette as web
      colors: {
        paper: "#f4f0e7",
        ink: "#1e1b18",
        background: "#f4f0e7",
        foreground: "#1e1b18",
        primary: { DEFAULT: "#a9362c", foreground: "#faf8f3" },
        secondary: { DEFAULT: "#e8e0d0", foreground: "#1e1b18" },
        muted: { DEFAULT: "#e8e0d0", foreground: "#5c564e" },
        accent: { DEFAULT: "#a9362c", foreground: "#faf8f3" },
        card: { DEFAULT: "#faf8f3", foreground: "#1e1b18" },
        border: "#d4cbb8",
        ring: "#a9362c",
        destructive: { DEFAULT: "#a9362c", foreground: "#faf8f3" },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
