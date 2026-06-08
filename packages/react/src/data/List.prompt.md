**List** — vertical list of rows. Each item takes a `leading` slot, up to three lines of text (`overline` / `title` / `description`) and a `trailing` slot.

```jsx
<List
  interactive
  chevron
  items={[
    { leading: <Icon name="description" />, title: "Income certificate", description: "Issued 12 Mar 2025", trailing: "Ready" },
    { leading: <Icon name="badge" />, title: "Caste certificate", description: "Under review", active: true },
    { leading: <Icon name="home" />, title: "Domicile certificate", description: "Action needed" },
  ]}
/>
```

- Set `href` or `onClick` (or `interactive`) to make rows actionable — they get a hover fill, `role="button"` and keyboard focus.
- `active` marks the current row (violet subtle fill + left accent).
- `bordered` (default true) wraps the list in a rounded surface; set false to drop it into your own container.
