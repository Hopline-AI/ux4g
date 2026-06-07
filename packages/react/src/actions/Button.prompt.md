**Button** — the standard UX4G call-to-action; use for any user-triggered action (submit, continue, open dialog). Reach for `variant="danger"` only on destructive actions.

```jsx
<Button variant="primary" appearance="filled">Apply now</Button>
<Button variant="primary" appearance="outlined">Cancel</Button>
<Button variant="success" appearance="tonal" iconLeft={<span className="material-symbols-rounded">check</span>}>Approve</Button>
<Button appearance="text" size="small">Learn more</Button>
```

- **variant**: `primary` (violet) · `success` (green) · `danger` (red)
- **appearance**: `filled` · `outlined` · `text` · `tonal` (soft tint)
- **size**: `small` (32px) · `default` (40px) · `large` (48px)
- `fullWidth`, `disabled`, `iconLeft`, `iconRight`. Labels are Roboto Medium, sentence case.
