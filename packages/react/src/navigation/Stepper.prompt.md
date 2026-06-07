**Stepper** — orient users in a multi-step process (apply → verify → submit). Completed steps show a tick, the current step is emphasised.

```jsx
<Stepper current={1} steps={[
  { label: "Details" },
  { label: "Documents", description: "Aadhaar, proof" },
  { label: "Review" },
  { label: "Submit" },
]} />
```

- **orientation**: `horizontal` (default) · `vertical`.
