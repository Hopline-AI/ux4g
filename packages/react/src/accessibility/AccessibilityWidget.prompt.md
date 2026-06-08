**AccessibilityWidget** — UX4G's signature "universal access" control. Drop one per page; it floats in a corner and lets any visitor tune the reading experience. Required on government sites (GIGW / RPwD-aligned).

```jsx
<AccessibilityWidget position="bottom-right" />
```

Live controls — a 3-column tile grid, applied to `target` (default `document.documentElement`) and saved to localStorage:
**Bigger Text · Smaller Text · Text Spacing · Line Height · Dyslexia Friendly · ADHD Mode · Saturation · Light-Dark · Invert Colors · Highlight Links · Text to Speech · Cursor · Pause Animation · Hide Images · Contrast**, plus **Reset all**.

- **position**: `bottom-right` (default) · `bottom-left`.
- **target**: scope adjustments to a specific element instead of the whole page.
- Light-Dark and Invert Colors are mutually exclusive; the widget counter-filters itself so it stays legible while the page is darkened/inverted.
- ADHD Mode dims the page except a reading band that follows the pointer; Text to Speech reads the main content and any text you select (Web Speech API).
