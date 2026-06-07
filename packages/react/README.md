# @hopline/ux4g-react

Zero-dependency UX4G React components (React 18+ peer). Unofficial community
packaging of UX4G (© NeGD · MeitY · ux4g.gov.in).

```tsx
import "@hopline/ux4g-tokens/styles.css"; // REQUIRED once, at your app root
import { Button, Input, Card, Modal } from "@hopline/ux4g-react";

<Button variant="primary">Get started</Button>;
```

The one hard requirement is importing `@hopline/ux4g-tokens/styles.css` once — it
carries the CSS variables, the fonts, and the hover/focus interaction layer the
components depend on. Components are tree-shakeable (`sideEffects:false`). Internal
icons are inline SVG (Lucide geometry); pass your own SVG nodes via `iconLeft` /
`icon` props. Per-component usage notes live beside each source as `*.prompt.md`;
API contracts are in `contracts/`.
