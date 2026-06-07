**DatePicker** — pick a single date (date of birth, appointment) from a calendar popover. Value is ISO `yyyy-mm-dd`.

```jsx
const [dob, setDob] = React.useState("");
<DatePicker label="Date of birth" value={dob} onChange={setDob} max="2008-01-01" />
```

- `min` / `max` bound selectable dates (ISO strings).
