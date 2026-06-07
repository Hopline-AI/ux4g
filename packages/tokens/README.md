# @hopline/ux4g-tokens

UX4G design tokens — one CSS import plus a typed theme object. Unofficial
community packaging of UX4G (© NeGD · MeitY · ux4g.gov.in).

```ts
import "@hopline/ux4g-tokens/styles.css";   // CSS variables + interaction layer + fonts
import { theme, tokens } from "@hopline/ux4g-tokens/theme"; // typed values for JS
```

Fonts load from Google Fonts CDN. For government/offline use, self-host: bundle
the `.woff2` files and replace the `@import` in `tokens/fonts.css` with local
`@font-face` rules. `theme.ts` is generated from `tokens/*.css` by
`scripts/gen-theme.ts` (run via `pnpm gen:theme`).
