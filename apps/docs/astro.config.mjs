import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// UX4G docs + showcase. Static output, deployed to Cloudflare Pages (served at root).
// @astrojs/sitemap reads `site` and emits /sitemap-index.xml at build.
export default defineConfig({
  site: "https://ux4g.pages.dev",
  integrations: [react(), sitemap()],
});
