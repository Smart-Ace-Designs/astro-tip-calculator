// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://smart-ace-designs.github.io",
  base: "/astro-tip-calculator",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [vue()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Mono",
      cssVariable: "--font-spacemono",
      weights: [400],
      styles: ["normal"],
    },
  ],
});
