**Input** — single-line text field. Pairs a label, the control, and helper/validation text. Set `state="error"` with a helper message for invalid fields.

```jsx
<Input label="Full name" placeholder="As per Aadhaar" required />
<Input label="Email" type="email" state="error" helperText="Invalid email address"
       iconLeft={<span className="material-symbols-rounded">mail</span>} />
<Input label="Search" iconLeft={<span className="material-symbols-rounded">search</span>} />
```

- **size**: `small` (36) · `default` (43) · `large` (48)
- **state**: `default` · `error` (red) · `success` (green)
- `iconLeft`, `iconRight`, `helperText`, `required`, plus all native input props.
