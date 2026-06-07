**RangeSlider** — pick a numeric value in a range (income band, age, distance). Filled track + value bubble.

```jsx
const [age, setAge] = React.useState(35);
<RangeSlider label="Age" min={18} max={100} value={age} onChange={setAge} unit=" yrs" />
```

- Controlled (`value`/`onChange`) or uncontrolled (`defaultValue`). `step`, `unit`, `disabled`.
