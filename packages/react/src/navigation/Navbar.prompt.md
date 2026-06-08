**Navbar** — government website header. Brand lockup + primary nav + an actions slot, with an optional "Government of India" utility strip and a keyboard skip-link.

```jsx
<Navbar
  topStrip
  title="Ministry of Electronics & IT"
  subtitle="Government of India"
  links={[
    { label: "Home", href: "/", active: true },
    { label: "Services", href: "/services" },
    { label: "Schemes", href: "/schemes" },
    { label: "About", href: "/about" },
  ]}
  actions={
    <>
      <button className="btn-ghost">Login</button>
      <button className="btn-primary">Apply now</button>
    </>
  }
/>
```

- Pass `topStrip` (boolean) for the default tricolour "Government of India" strip, or a node to customise it (language switch, helpline, etc.).
- Set `active` on the current link — it gets `aria-current="page"` and the violet subtle fill.
- `sticky` pins the header on scroll.
