**Carousel** — rotate hero banners, scheme highlights or an image gallery. Each child is one slide; arrows + dots included.

```jsx
<Carousel height={320} interval={5000}>
  <img src="/banner-1.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  <img src="/banner-2.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</Carousel>
```

- `interval` (ms) auto-advances; `arrows` / `dots` toggle the controls.
