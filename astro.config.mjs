import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/core/remark-reading-time.mjs';
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
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
  integrations: [mdx(), tailwind()]
});