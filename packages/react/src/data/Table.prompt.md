**Table** — list records (applications, beneficiaries, payments). Columns declare a `key`, `header`, optional `render` and `align`; cells default to `row[key]`.

```jsx
<Table
  columns={[
    { key: "id", header: "Reference" },
    { key: "service", header: "Service" },
    { key: "status", header: "Status", render: (r) => <Badge variant={r.tone}>{r.status}</Badge> },
    { key: "date", header: "Updated", align: "right" },
  ]}
  rows={applications}
/>
```

- `striped`, `hover` (default true), `empty` (empty-state node).
