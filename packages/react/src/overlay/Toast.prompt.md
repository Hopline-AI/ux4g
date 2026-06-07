**Toast** — a transient, auto-dismissing notification ("Application saved"). Render a stack of them in a fixed corner container.

```jsx
<div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 10 }}>
  <Toast variant="success" title="Saved" onClose={dismiss}>Your draft was saved.</Toast>
</div>
```

- **variant**: info · success · warning · danger.
