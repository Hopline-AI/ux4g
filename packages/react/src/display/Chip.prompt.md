**Chip** — filter or choice token, and removable input tokens. Use a row of chips for category filters.

```jsx
<Chip selected onClick={...}>All</Chip>
<Chip onClick={...}>Health</Chip>
<Chip onRemove={...} icon={<span className="material-symbols-rounded">sell</span>}>Pension</Chip>
```

- `selected`, `onClick` (clickable), `onRemove` (removable), `icon`, `disabled`.
