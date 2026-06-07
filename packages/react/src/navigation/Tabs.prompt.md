**Tabs** — underline tab bar for switching views within a page (e.g. My Applications / Drafts / Closed).

```jsx
<Tabs defaultValue="open" onChange={setTab}
  tabs={[
    { value: "open", label: "Open", badge: 3 },
    { value: "closed", label: "Closed" },
    { value: "drafts", label: "Drafts", icon: "draft" },
  ]} />
```

- Items: strings or `{value,label,icon,badge,disabled}`. `fullWidth` stretches them.
