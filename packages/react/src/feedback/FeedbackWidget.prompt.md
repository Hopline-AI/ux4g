**FeedbackWidget** — a floating corner launcher that opens a short feedback form: a 1–5 face rating, optional category chips, a comment, and a thank-you state.

```jsx
<FeedbackWidget
  position="bottom-right"
  title="Share your feedback"
  prompt="How was your experience?"
  categories={["Speed", "Clarity", "Accessibility", "Bug"]}
  onSubmit={({ rating, category, message }) => sendFeedback({ rating, category, message })}
/>
```

- Faces are inline SVG (no emoji) — five levels from "Very poor" to "Excellent". Override with `ratings`.
- Defaults to `position="fixed"` in a corner; pass `inline` to embed it in page flow (useful in forms/demos).
- `onSubmit` receives `{ rating, category, message }`; the widget then shows its built-in thank-you confirmation.
