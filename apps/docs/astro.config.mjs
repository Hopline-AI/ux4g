import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// UX4G docs + showcase. Static output, deployed to Cloudflare Pages (served at root).
export default defineConfig({
  site: "https://ux4g.pages.dev",
  integrations: [react()],
});
