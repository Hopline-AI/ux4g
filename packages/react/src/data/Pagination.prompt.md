**Pagination** — move through paged tables and result lists. 1-indexed; truncates with `…` for long ranges.

```jsx
const [page, setPage] = React.useState(1);
<Pagination page={page} pageCount={12} onChange={setPage} />
```

- `siblings` controls how many pages show either side of the current page.
