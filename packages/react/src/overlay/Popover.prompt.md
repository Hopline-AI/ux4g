**Popover** — click-triggered floating panel with an arrow. Richer than a Tooltip: it holds a title, body and actions, and closes on outside-click or Escape.

```jsx
<Popover
  placement="bottom"
  trigger={<button className="btn-ghost">Filters</button>}
  title="Filter applications"
>
  Show only the services that match your district and status.
  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
    <button className="btn-primary">Apply</button>
    <button className="btn-ghost">Reset</button>
  </div>
</Popover>
```

- `placement`: `"top" | "bottom" | "left" | "right"` (default `"bottom"`).
- `trigger` is any node — the popover toggles on click and sets `aria-expanded`.
- For a plain text hint on hover, use **Tooltip** instead; for a list of actions, use **Menu**.
