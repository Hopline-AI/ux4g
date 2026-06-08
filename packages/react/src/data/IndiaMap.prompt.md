**IndiaMap** — data-driven choropleth of India (29 states + 7 UTs). Pass `values` keyed by state code; regions colour by a sequential ramp. Includes hover tooltips, click selection, a legend, and keyboard/ARIA navigation.

```jsx
<IndiaMap
  legendLabel="Applications (k)"
  values={{ MH: 124, KA: 98, UP: 210, TN: 86, RJ: 64, WB: 90, GJ: 102, BR: 70 }}
  formatValue={(v) => v + "k"}
  selected={sel}
  onSelect={(code, region) => setSel(code)}
/>
```

- **Codes** are ISO 3166-2:IN style — `MH`, `KA`, `TN`, `DL`, `AN`… (see `IndiaGeo.ts` for the full list of 36).
- Regions without a `values` entry render in `emptyColor`.
- Override `colorScale` (light→dark array) and `domain` to control the heatmap; `theme="dark"` for dark surfaces.
- Geometry is a stylised administrative outline for data-viz — not survey-accurate, and not an official boundary depiction.
- Accessibility: Tab moves between regions, Arrow keys jump to the nearest region, Enter/Space selects; selection is announced via `aria-live`.
