**AccessibilityWidget** — UX4G's signature "universal access" control. Drop one per page; it floats in a corner and lets any visitor tune the reading experience. Required on government sites (GIGW / RPwD-aligned).

```jsx
<AccessibilityWidget position="bottom-right" />
```

Live controls (applied to `document.documentElement` and saved to localStorage):
text size · line spacing · letter spacing · contrast · grayscale · highlight links · readable font · big cursor · pause motion · reading guide · reset all.

- **position**: `bottom-right` (default) · `bottom-left`.
- **target**: scope adjustments to a specific element instead of the whole page.
