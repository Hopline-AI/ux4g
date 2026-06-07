---
name: ux4g-design
description: Use this skill to generate well-branded interfaces and assets for UX4G — the Government of India "User Experience for Good Governance" design system — for production or for throwaway prototypes, mocks and slides. Contains essential design guidelines, colors, type, fonts, assets, and a UI kit of components for prototyping accessible, themeable government interfaces.
user-invocable: true
---

Read the `llms.txt` file in the repo root, and explore the package sources under `packages/`.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can read the rules here and the package sources to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here

- `llms.txt` — the concise machine-readable index for coding agents: house
  rules, setup, tokens, and the full component list. **Start here.**
- `packages/tokens/styles.css` — the single CSS entry point. Import it and you
  get every design token (colors, type, spacing, radius, shadow) plus the
  webfonts and a light reset. Reference the semantic aliases (`--color-primary`,
  `--color-text`, `--color-border`, …), not raw ramp values.
- `packages/tokens/tokens/` — the token source files imported by `styles.css`.
- `packages/tokens/theme` — a typed `theme` / `tokens` object for JS
  (`import { theme, tokens } from "@hopline/ux4g-tokens/theme"`).
- `packages/react/src/<group>/` — reusable React/TSX primitives (Button, Input,
  Card, Badge, Alert, Tabs, …). Each has a `.prompt.md` with a one-line "what &
  when" + usage example. Read the `.prompt.md` first. The props contracts live
  in `packages/react/contracts/<group>/<Name>.d.ts`.

## House rules (the short version)

- **Primary is violet `#613AF5`** on a clean white / light-neutral canvas. Flat
  fills, **no gradients** except the occasional brand hero panel. The palette is
  themeable — a product may re-skin primary/secondary, but keep the structure.
- **Type is Noto Sans** (Indic-script coverage), Roboto Medium for button labels,
  Red Hat Mono for code/tokens. Sentence case. Headings Medium (500).
- **Accessibility first:** WCAG 2.2 AA contrast, a visible **4px violet focus
  halo**, 44px minimum touch targets, real labels on every field.
- **Voice:** plain, instructional, citizen-first ("you"). No hype, no emoji in
  product UI.
- **Icons:** inline SVG (Lucide-style outline, 24×24, 2px stroke). UX4G's
  reference uses Material Symbols — see ICONOGRAPHY notes in `llms.txt`.
- 8-point spacing grid · 8px button/input radius · 12px card radius · soft ink
  shadows. Cards = 1px `#DBDBDB` border + small shadow.

© UX4G · Powered by NeGD · MeitY, Government of India · ux4g.gov.in
