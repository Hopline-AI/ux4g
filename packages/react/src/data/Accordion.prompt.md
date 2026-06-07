**Accordion** — collapsible sections for FAQs, eligibility criteria, grouped form steps.

```jsx
<Accordion defaultOpen={["a"]} items={[
  { value: "a", title: "Who is eligible?", content: "Citizens above 60 years…" },
  { value: "b", title: "Documents required", content: "Aadhaar, address proof…" },
]} />
```

- `multiple` lets several panels stay open. `defaultOpen` seeds open values.
