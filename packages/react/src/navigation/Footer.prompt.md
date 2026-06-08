**Footer** — government portal footer. Brand + tagline + social on the left, link columns on the right, and a dark bottom strip with copyright + policy links.

```jsx
<Footer
  tagline="User Experience for Good Governance — accessible digital public services."
  columns={[
    { title: "Services", links: [{ label: "DigiLocker" }, { label: "MeriPehchan" }, { label: "Grievances" }] },
    { title: "About", links: [{ label: "About UX4G" }, { label: "Guidelines" }, { label: "Contact" }] },
    { title: "Resources", links: [{ label: "Components" }, { label: "Tokens" }, { label: "Downloads" }] },
  ]}
  policyLinks={[
    { label: "Privacy Policy" },
    { label: "Terms of Use" },
    { label: "Accessibility" },
  ]}
/>
```

- `social` takes `{ label, href, icon }` items — pass inline-SVG glyphs as `icon`.
- The bottom strip is always rendered; override `copyright` and `policyLinks` to customise it.
