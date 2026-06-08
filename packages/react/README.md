# @hopline/ux4g-react

[![npm](https://img.shields.io/npm/v/@hopline/ux4g-react.svg)](https://www.npmjs.com/package/@hopline/ux4g-react)
[![license: MIT](https://img.shields.io/npm/l/@hopline/ux4g-react.svg)](https://github.com/Hopline-AI/ux4g/blob/main/LICENSE)

Zero-dependency React components for **UX4G**, India's "User Experience for Good
Governance" government design system. Plain, accessible markup styled entirely by
CSS variables, so the whole set stays small, predictable, and themeable.

> Unofficial community packaging. UX4G is © NeGD · MeitY, Government of India
> (ux4g.gov.in). This package is not an official UX4G release.

**Docs and live showcase:** https://ux4g.pages.dev

## Install

```bash
pnpm add @hopline/ux4g-react @hopline/ux4g-tokens
```

`react` and `react-dom` 18+ are peer dependencies.

## Usage

Import the tokens stylesheet once at your app root, then use components anywhere.

```tsx
import "@hopline/ux4g-tokens/styles.css"; // required once, at the app root
import { Button, Input, Card } from "@hopline/ux4g-react";

export function Apply() {
  return (
    <Card title="New application">
      <Input label="Full name" placeholder="Asha Rao" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### The one hard rule

Import `@hopline/ux4g-tokens/styles.css` exactly once. It carries the CSS
variables, the fonts, and the hover / focus / active interaction layer every
component reads from. Without it, components render unstyled.

## What you get

32 components across eight groups:

| Group | Components |
| --- | --- |
| Actions | Button, IconButton |
| Forms | Input, Textarea, Select, Checkbox, Radio, Switch, Search, DatePicker, RangeSlider, ColorPicker, FileUpload |
| Display | Card, Badge, Chip, Avatar |
| Feedback | Alert, Progress, Spinner, EmptyState |
| Overlay | Modal, Tooltip, Menu, Toast |
| Data | Table, Accordion, Pagination |
| Navigation | Tabs, Breadcrumb, Stepper |
| Media | Carousel |

## Why this packaging

- **Zero runtime dependencies.** No styling library, no icon font. Icons are inline SVG (Lucide geometry); pass your own through `iconLeft` / `icon` props.
- **Tree-shakeable.** `sideEffects: false`, ESM and CJS builds, full TypeScript types.
- **Accessible.** Built to WCAG 2.2 AA: real labels, a visible 4px focus halo, 44px targets, sensible keyboard behaviour.
- **Themeable.** Everything resolves from design tokens. Override the brand ramp, or a single `--color-*` variable, and the whole set follows. The docs site ships six ready-made, WCAG-AA palettes you can switch live.
- **LLM-friendly.** Typed contracts in `contracts/` and a per-component `*.prompt.md` usage note ship in the repo, alongside an `llms.txt` index for coding agents.

## Own the source instead (shadcn)

Prefer to copy a component into your repo rather than depend on the package?

```bash
npx shadcn add https://ux4g.pages.dev/r/button.json
```

Swap `button` for any component name. You own the file; the tokens keep it on brand.

## License

MIT © Hopline. Maintained by [hopline.co](https://hopline.co).
