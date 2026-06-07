**Menu** — a dropdown of actions (overflow `⋮`, account menu, row actions). Pass the opening element as `trigger`.

```jsx
<Menu align="right" trigger={<IconButton aria-label="More"><DotsIcon /></IconButton>}
  items={[
    { label: "Edit", icon: <EditIcon />, onClick: edit },
    { label: "Duplicate", onClick: dup },
    { label: "Delete", danger: true, onClick: del },
  ]} />
```

- **align**: `left` (default) · `right`. Items support `icon`, `danger`, `disabled`.
