// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  // Fonts are downloaded from Google Fonts at build time and served from our own server
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Onest",
      cssVariable: "--font-onest",
      weights: [400, 500, 600, 700, 800],
      // "symbols" holds the → arrow used in the buttons
      subsets: ["cyrillic", "latin", "symbols"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400, 500],
      subsets: ["cyrillic", "latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
