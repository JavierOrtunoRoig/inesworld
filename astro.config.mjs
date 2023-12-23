import { defineConfig } from 'astro/config';
import vercelStatic from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true
    },
    output: 'static',
    adapter: vercelStatic(),
  }
});
