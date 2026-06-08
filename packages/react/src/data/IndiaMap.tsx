import React from "react";
import { INDIA_STATES, INDIA_VIEWBOX, IndiaStateGeo } from "./IndiaGeo";

export interface IndiaMapProps {
  /** Metric per region, keyed by state code (e.g. { MH: 124, KA: 98 }). */
  values?: Record<string, number>;
  /** Sequential colour ramp, light → dark. */
  colorScale?: string[];
  /** Value domain [min, max]; defaults to the extent of `values`. */
  domain?: [number, number];
  /** Fill for regions with no value. */
  emptyColor?: string;
  /** Currently selected region code (controlled). */
  selected?: string;
  /** Fired on click / Enter / Space. */
  onSelect?: (code: string, region: IndiaStateGeo) => void;
  /** Tooltip / legend value formatter. */
  formatValue?: (v: number) => string;
  /** Legend heading. */
  legendLabel?: string;
  /** Show the gradient legend. @default true */
  showLegend?: boolean;
  /** Pixel height of the map area. @default 560 */
  height?: number;
  /** "light" | "dark". @default "light" */
  theme?: "light" | "dark";
}

const DEFAULT_SCALE = ["#ECEAF3", "#C9BBF6", "#9F86F0", "#7C5BF7", "#4A26C4", "#2A1466"];

function quantize(v: number, min: number, max: number, n: number) {
  if (max <= min) return n - 1;
  const t = (v - min) / (max - min);
  return Math.max(0, Math.min(n - 1, Math.floor(t * n)));
}

/** UX4G India Map — data-driven choropleth. Colour each state/UT by a metric,
 *  with hover tooltips, click selection, a legend and full keyboard + ARIA
 *  support. Geometry covers 29 states + 7 union territories. */
export function IndiaMap({
  values = {}, colorScale = DEFAULT_SCALE, domain, emptyColor,
  selected, onSelect, formatValue = (v) => String(v), legendLabel = "Value",
  showLegend = true, height = 560, theme = "light",
}: IndiaMapProps) {
  const [hover, setHover] = React.useState<string | null>(null);
  const [tip, setTip] = React.useState<{ x: number; y: number } | null>(null);
  const [announce, setAnnounce] = React.useState("");
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  const dark = theme === "dark";
  const vals = Object.values(values);
  const min = domain ? domain[0] : (vals.length ? Math.min(...vals) : 0);
  const max = domain ? domain[1] : (vals.length ? Math.max(...vals) : 1);
  const noData = emptyColor || (dark ? "#3A364F" : "#ECEAF3");
  const stroke = dark ? "#2A1466" : "#FFFFFF";
  const ink = dark ? "#F4F3F9" : "#212121";

  const fillFor = (code: string) => {
    const v = values[code];
    if (v == null) return noData;
    return colorScale[quantize(v, min, max, colorScale.length)];
  };

  const select = (s: IndiaStateGeo) => {
    onSelect?.(s.code, s);
    const v = values[s.code];
    setAnnounce(`${s.name}${v != null ? ", " + formatValue(v) : ""}`);
  };

  // Arrow-key navigation to the geographically nearest region in a direction.
  const move = (from: IndiaStateGeo, dir: "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown") => {
    let best: IndiaStateGeo | null = null, bestD = Infinity;
    for (const s of INDIA_STATES) {
      if (s.code === from.code) continue;
      const dx = s.cx - from.cx, dy = s.cy - from.cy;
      const ok = dir === "ArrowLeft" ? dx < -2 : dir === "ArrowRight" ? dx > 2 : dir === "ArrowUp" ? dy < -2 : dy > 2;
      if (!ok) continue;
      const along = dir === "ArrowLeft" || dir === "ArrowRight" ? Math.abs(dx) : Math.abs(dy);
      const off = dir === "ArrowLeft" || dir === "ArrowRight" ? Math.abs(dy) : Math.abs(dx);
      const dist = along + off * 2;
      if (dist < bestD) { bestD = dist; best = s; }
    }
    if (best) {
      const el = wrapRef.current?.querySelector<SVGPathElement>(`[data-code="${best.code}"]`);
      el?.focus();
      setHover(best.code);
    }
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", fontFamily: "var(--font-sans)", color: ink }}>
      <svg viewBox={INDIA_VIEWBOX} role="group" aria-label="Map of India — values by state and union territory"
        style={{ width: "100%", height, display: "block", overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet">
        {INDIA_STATES.map((s) => {
          const isHover = hover === s.code;
          const isSel = selected === s.code;
          const v = values[s.code];
          return (
            <path key={s.code} d={s.d} data-code={s.code} tabIndex={0}
              role="button"
              aria-label={`${s.name}${v != null ? `: ${formatValue(v)}` : ": no data"}`}
              aria-pressed={isSel}
              fill={fillFor(s.code)}
              stroke={isSel ? "var(--color-primary)" : isHover ? (dark ? "#fff" : "var(--color-primary)") : stroke}
              strokeWidth={isSel ? 2.4 : isHover ? 1.6 : 0.6}
              style={{ cursor: "pointer", transition: "fill var(--duration-fast), stroke-width var(--duration-fast)", outline: "none", filter: isHover ? "brightness(1.06)" : undefined }}
              onMouseEnter={() => setHover(s.code)}
              onMouseMove={(e) => {
                const r = wrapRef.current?.getBoundingClientRect();
                if (r) setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
              }}
              onMouseLeave={() => { setHover((h) => (h === s.code ? null : h)); setTip(null); }}
              onFocus={() => setHover(s.code)}
              onBlur={() => setHover((h) => (h === s.code ? null : h))}
              onClick={() => select(s)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(s); }
                else if (e.key.startsWith("Arrow")) { e.preventDefault(); move(s, e.key as any); }
              }} />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hover && tip && (() => {
        const s = INDIA_STATES.find((x) => x.code === hover)!;
        const v = values[s.code];
        return (
          <div role="tooltip" style={{
            position: "absolute", left: tip.x, top: tip.y, transform: "translate(-50%, calc(-100% - 12px))",
            background: "var(--neutral-900)", color: "#fff", padding: "8px 11px", borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-l)", pointerEvents: "none", whiteSpace: "nowrap", zIndex: 5,
            fontSize: 13, lineHeight: 1.3,
          }}>
            <div style={{ fontWeight: 600 }}>{s.name}</div>
            <div style={{ opacity: 0.82, fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {v != null ? `${legendLabel}: ${formatValue(v)}` : "No data"}
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      {showLegend && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#C0BBD7" : "var(--color-text-muted)" }}>{legendLabel}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 0, borderRadius: "var(--radius-sm)", overflow: "hidden", boxShadow: "var(--shadow-xs)" }}>
            {colorScale.map((c, i) => (<span key={i} style={{ width: 26, height: 12, background: c }} />))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: dark ? "#A7A0C6" : "var(--color-text-muted)" }}>{formatValue(min)}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: dark ? "#A7A0C6" : "var(--color-text-muted)" }}>→ {formatValue(max)}</span>
        </div>
      )}

      <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{announce}</div>
    </div>
  );
}

export default IndiaMap;
