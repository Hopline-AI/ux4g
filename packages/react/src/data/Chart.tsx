import React from "react";

export type ChartType = "bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea";

export interface ChartProps {
  /** Chart.js chart type. */
  type: ChartType;
  /** Chart.js `data` object ({ labels, datasets }). Dataset colours are
   *  auto-filled from the UX4G palette when omitted. */
  data: any;
  /** Chart.js `options` — deep-merged over UX4G defaults. */
  options?: any;
  /** Pixel height of the chart area. @default 300 */
  height?: number;
  /** Override the categorical colour sequence. */
  palette?: string[];
}

/** UX4G categorical palette — brand violet first, then info/success/warning/danger. */
export const UX4G_CHART_PALETTE = [
  "#613AF5", "#1937B2", "#107400", "#EE8033", "#DB2829", "#8981AB", "#2384C5", "#69B349",
];

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** UX4G Chart — themed Chart.js wrapper. Requires Chart.js v4 on the page
 *  (`window.Chart`). Applies UX4G fonts, palette, grid and tooltip styling. */
export function Chart({ type, data, options, height = 300, palette = UX4G_CHART_PALETTE }: ChartProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    const ChartJS = (typeof window !== "undefined" && (window as any).Chart) || null;
    const canvas = canvasRef.current;
    if (!ChartJS || !canvas) return;

    const circular = type === "pie" || type === "doughnut" || type === "polarArea";

    // Colour the datasets from the palette when the caller hasn't.
    const themedData = {
      ...data,
      datasets: (data.datasets || []).map((ds: any, i: number) => {
        const base = palette[i % palette.length];
        const out: any = { ...ds };
        if (circular) {
          if (out.backgroundColor == null)
            out.backgroundColor = (data.labels || []).map((_: any, j: number) => palette[j % palette.length]);
          if (out.borderColor == null) out.borderColor = "#fff";
          if (out.borderWidth == null) out.borderWidth = 2;
        } else if (type === "line") {
          if (out.borderColor == null) out.borderColor = base;
          if (out.backgroundColor == null) out.backgroundColor = hexToRgba(base, 0.12);
          if (out.tension == null) out.tension = 0.35;
          if (out.fill == null) out.fill = ds.fill ?? false;
          if (out.pointBackgroundColor == null) out.pointBackgroundColor = base;
          if (out.borderWidth == null) out.borderWidth = 2;
        } else if (type === "radar") {
          if (out.borderColor == null) out.borderColor = base;
          if (out.backgroundColor == null) out.backgroundColor = hexToRgba(base, 0.18);
          if (out.pointBackgroundColor == null) out.pointBackgroundColor = base;
        } else {
          if (out.backgroundColor == null) out.backgroundColor = base;
          if (out.borderRadius == null) out.borderRadius = 6;
          if (out.maxBarThickness == null) out.maxBarThickness = 48;
        }
        return out;
      }),
    };

    const grid = "#EEEEEE";
    const ink = "#525252";
    const baseOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      font: { family: "'Noto Sans', sans-serif" },
      plugins: {
        legend: {
          labels: { color: "#212121", font: { family: "'Noto Sans', sans-serif", size: 13 }, usePointStyle: true, pointStyle: "circle", padding: 16 },
          position: "bottom",
        },
        tooltip: {
          backgroundColor: "#212121", padding: 12, cornerRadius: 8, displayColors: true, usePointStyle: true,
          titleFont: { family: "'Noto Sans', sans-serif", size: 13, weight: "600" },
          bodyFont: { family: "'Noto Sans', sans-serif", size: 12 },
          boxPadding: 4,
        },
      },
      scales: circular || type === "radar" ? undefined : {
        x: { grid: { display: false }, ticks: { color: ink, font: { family: "'Noto Sans', sans-serif", size: 12 } }, border: { color: "#DBDBDB" } },
        y: { grid: { color: grid }, ticks: { color: ink, font: { family: "'Noto Sans', sans-serif", size: 12 } }, border: { display: false }, beginAtZero: true },
      },
    };
    if (type === "radar") {
      baseOptions.scales = { r: { grid: { color: grid }, angleLines: { color: grid }, pointLabels: { color: ink, font: { family: "'Noto Sans', sans-serif", size: 12 } }, ticks: { backdropColor: "transparent", color: "#ABABAB" } } };
    }

    const merged = deepMerge(baseOptions, options || {});
    chartRef.current = new ChartJS(canvas, { type, data: themedData, options: merged });
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [type, JSON.stringify(data), JSON.stringify(options), height, palette.join(",")]);

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <canvas ref={canvasRef} role="img" />
    </div>
  );
}

function deepMerge(a: any, b: any): any {
  if (Array.isArray(a) || Array.isArray(b) || typeof a !== "object" || typeof b !== "object" || a == null || b == null) return b ?? a;
  const out: any = { ...a };
  for (const k of Object.keys(b)) out[k] = k in a ? deepMerge(a[k], b[k]) : b[k];
  return out;
}

export default Chart;
