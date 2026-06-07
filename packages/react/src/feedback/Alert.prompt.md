**Alert** — inline contextual message for form results, system notices and warnings. Pick the variant by severity.

```jsx
<Alert variant="success" title="Application submitted">
  Your reference number is GRV-2026-00482.
</Alert>
<Alert variant="warning" onClose={...}>Your password will expire soon.</Alert>
```

- **variant**: info · success · warning · danger · `title`, `onClose`, `icon`.
