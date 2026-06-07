import React from "react";

export interface ProgressProps {
  /** 0–100. Omit for an indeterminate bar. */
  value?: number;
  variant?: "primary" | "success" | "danger" | "warning";
  /** @default "md" */
  size?: "sm" | "md";
  /** Show the % label (linear only). @default false */
  showValue?: boolean;
  /** Render a circular ring instead of a bar. @default false */
  circular?: boolean;
}

/** UX4G Progress — linear bar or circular ring. */
export function Progress({ value, variant = "primary", size = "md", showValue = false, circular = false }: ProgressProps) {
  const color = ({ primary: "var(--color-primary)", success: "var(--color-success)", danger: "var(--color-danger)", warning: "var(--color-warning)" } as Record<string, string>)[variant];
  const indeterminate = value == null;
  const pct = Math.max(0, Math.min(100, value ?? 0));

  if (circular) {
    const r = 16, c = 2 * Math.PI * r, dim = 44;
    return (
      <span role="progressbar" aria-valuenow={indeterminate ? undefined : pct} style={{ display: "inline-flex", position: "relative", width: dim, height: dim }}>
        <svg width={dim} height={dim} viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="22" cy="22" r={r} fill="none" stroke="var(--neutral-200)" strokeWidth="4" />
          <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={indeterminate ? c * 0.7 : c * (1 - pct / 100)}
            style={indeterminate ? { animation: "ux-spin 1s linear infinite", transformOrigin: "center" } : { transition: "stroke-dashoffset var(--duration-slow) var(--ease-standard)" }} />
        </svg>
        {showValue && !indeterminate && <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--color-text)" }}>{pct}%</span>}
        <style>{"@keyframes ux-spin{to{transform:rotate(360deg)}}"}</style>
      </span>
    );
  }

  const h = size === "sm" ? 4 : 8;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div role="progressbar" aria-valuenow={indeterminate ? undefined : pct}
        style={{ flex: 1, height: h, background: "var(--neutral-200)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
        <div style={indeterminate
          ? { width: "40%", height: "100%", background: color, borderRadius: "inherit", animation: "ux-indet 1.3s var(--ease-standard) infinite" }
          : { width: `${pct}%`, height: "100%", background: color, borderRadius: "inherit", transition: "width var(--duration-slow) var(--ease-standard)" }} />
      </div>
      {showValue && !indeterminate && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", minWidth: 34, textAlign: "right" }}>{pct}%</span>}
      <style>{"@keyframes ux-indet{0%{margin-left:-40%}100%{margin-left:100%}}"}</style>
    </div>
  );
}

export default Progress;
