import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/core/remark-reading-time.mjs';
import mdx from "@astrojs/mdx";
import astroI18next from 'astro-i18next';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://inesworld.vercel.app",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [mdx(), tailwind(), astroI18next(), sitemap()],
  output: "hybrid", // https://docs.astro.build/en/guides/server-side-rendering/
  adapter: vercel()
});