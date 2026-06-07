**Progress** — show completion of a task (upload, multi-step form, verification). Linear by default; `circular` for a compact ring. Omit `value` for indeterminate.

```jsx
<Progress value={64} showValue />
<Progress value={40} variant="success" circular showValue />
<Progress />                {/* indeterminate */}
```
