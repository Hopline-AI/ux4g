**Chart** — branded [Chart.js](https://www.chartjs.org/) wrapper. Load Chart.js v4 on the page first (`window.Chart`), then pass a `type` + Chart.js `data`. Dataset colours default to the UX4G palette.

```html
<!-- once per page -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
```

```jsx
<Chart
  type="bar"
  height={320}
  data={{
    labels: ["Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      { label: "Applications", data: [820, 932, 1010, 1190, 1320] },
      { label: "Approved", data: [610, 720, 815, 980, 1120] },
    ],
  }}
/>
```

- `type`: `"bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea"`.
- `options` is deep-merged over UX4G defaults — override anything Chart.js supports.
- Import `UX4G_CHART_PALETTE` (or pass `palette`) to control the categorical colour sequence.
