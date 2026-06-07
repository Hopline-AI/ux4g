**IconButton** — square, icon-only action for toolbars, cards and dialogs (close, more, edit). Always provide `aria-label`.

```jsx
<IconButton aria-label="Close" onClick={onClose}>
  <span className="material-symbols-rounded">close</span>
</IconButton>
<IconButton variant="primary" appearance="tonal" aria-label="Edit">
  <span className="material-symbols-rounded">edit</span>
</IconButton>
```

- **variant**: `neutral` · `primary` · `danger`
- **appearance**: `ghost` · `tonal` · `filled`
- **size**: `small` (32) · `default` (40) · `large` (48)
