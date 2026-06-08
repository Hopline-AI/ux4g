# @hopline/ux4g-tokens

[![npm](https://img.shields.io/npm/v/@hopline/ux4g-tokens.svg)](https://www.npmjs.com/package/@hopline/ux4g-tokens)
[![license: MIT](https://img.shields.io/npm/l/@hopline/ux4g-tokens.svg)](https://github.com/Hopline-AI/ux4g/blob/main/LICENSE)

Design tokens for **UX4G**, India's government design system: one CSS import for
the variables, fonts, and interaction layer, plus a typed `theme` object for
JavaScript. This is the universal layer the React (and future native) packages
build on.

> Unofficial community packaging. UX4G is © NeGD · MeitY, Government of India
> (ux4g.gov.in). This package is not an official UX4G release.

**Docs and live token reference:** https://ux4g.pages.dev/foundations

## Install

```bash
pnpm add @hopline/ux4g-tokens
```

## Usage

```ts
// CSS variables + fonts + hover/focus interaction layer. Import once at the app root.
import "@hopline/ux4g-tokens/styles.css";

// Optional: the same values as typed JS, for inline styles, charts, canvas, etc.
import { theme, tokens } from "@hopline/ux4g-tokens/theme";

theme.color.primary; // "#613AF5"
theme.space[5];      // "24px"
theme.radius.lg;     // "12px"
tokens["color-primary"]; // flat map, keyed without the leading "--"
```

## What it provides

- **Colour:** the violet brand ramp, semantic colours (success, danger, warning, info), neutrals, and semantic aliases (`--color-primary`, `--color-text`, and friends).
- **Type:** the Noto Sans scale (broad Indic-script coverage), Roboto for button labels, Red Hat Mono.
- **Spacing, radius, shadow, motion:** an 8-point grid plus radii, elevation, and easing tokens.
- **Interaction layer:** the `:hover` / `:active` / `:focus-visible` rules, including the 4px focus halo, that components rely on.
- **Typed theme:** `theme` (grouped) and `tokens` (flat map), generated from the CSS so the JS values never drift from the stylesheet.

## Theming

Every component resolves from these variables, so re-theming is a CSS override.
Components read the raw brand ramp (for example `var(--violet-600)`) and the
`--color-*` aliases are defined from it, so overriding the ramp re-themes both at
once:

```css
[data-theme="sage"] {
  --violet-600: #4F8131; /* the brand "600" anchor; aliases follow */
  /* plus the rest of the --violet-* and --secondary-* ramp */
}
```

The docs site ships six ready-made, WCAG-AA palettes you can switch live.

## Import order

`styles.css` must load before any component styles or your own overrides that
reference these variables. Importing it once at the app root is enough.

## Self-hosting fonts

Fonts load from the Google Fonts CDN by default. For government or offline use,
bundle the `.woff2` files and replace the `@import` in `tokens/fonts.css` with
local `@font-face` rules.

## License

MIT © Hopline. Maintained by [hopline.co](https://hopline.co).
