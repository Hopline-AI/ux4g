**Card** — the standard surface for grouping content (scheme tiles, service cards, dashboard panels). 12px radius, 1px border + soft shadow.

```jsx
<Card title="Pension Scheme" subtitle="Apply before 31 Mar 2026"
      actions={<Button size="small">Apply</Button>}>
  Monthly assistance for eligible senior citizens.
</Card>
```

- `title`, `subtitle`, `media` (16:9), `footer`, `actions`, `padding`, `interactive`.
- Or ignore the slots and compose children freely.
