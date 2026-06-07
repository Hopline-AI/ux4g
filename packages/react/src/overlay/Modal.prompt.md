**Modal** — a focused dialog for confirmations, short forms and detail views. Controlled with `open`; Esc or scrim-click triggers `onClose`.

```jsx
const [open, setOpen] = React.useState(false);
<Button onClick={() => setOpen(true)}>Delete account</Button>
<Modal open={open} onClose={() => setOpen(false)}
  title="Delete account?" description="This action cannot be undone."
  footer={<>
    <Button appearance="text" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirm}>Delete</Button>
  </>}>
  Your applications and saved data will be permanently removed.
</Modal>
```

- **size**: `sm` (400) · `md` (520) · `lg` (720) · `hideClose` removes the ×.
