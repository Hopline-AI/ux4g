import React from "react";

export interface StepperStep {
  label: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  /** 0-indexed current step. */
  current: number;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

/** UX4G Stepper — progress through a multi-step flow (e.g. grievance, KYC). */
export function Stepper({ steps, current, orientation = "horizontal" }: StepperProps) {
  const vertical = orientation === "vertical";
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "stretch" : "flex-start", gap: 0 }}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        const dotColor = done || active ? "var(--color-primary)" : "var(--neutral-300)";
        return (
          <div key={i} style={{ display: "flex", flexDirection: vertical ? "row" : "column", alignItems: vertical ? "flex-start" : "center", flex: vertical ? "none" : 1, gap: vertical ? 12 : 0, position: "relative" }}>
            <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", width: vertical ? "auto" : "100%" }}>
              {!vertical && i > 0 && <div style={{ flex: 1, height: 2, background: done || active ? "var(--color-primary)" : "var(--neutral-200)" }} />}
              <div style={{
                width: 28, height: 28, flex: "none", borderRadius: "var(--radius-full)", display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: done ? "var(--color-primary)" : active ? "var(--violet-50)" : "var(--neutral-100)",
                border: `2px solid ${dotColor}`, color: done ? "var(--white)" : dotColor,
                fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
              }}>
                {done
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  : i + 1}
              </div>
              {!vertical && i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? "var(--color-primary)" : "var(--neutral-200)" }} />}
              {vertical && i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: i < current ? "var(--color-primary)" : "var(--neutral-200)", margin: "4px 0" }} />}
            </div>
            <div style={{ textAlign: vertical ? "left" : "center", marginTop: vertical ? 2 : 8, paddingBottom: vertical ? 16 : 0, maxWidth: vertical ? "none" : 140 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: active ? 600 : 500, color: active || done ? "var(--color-text)" : "var(--color-text-muted)" }}>{s.label}</div>
              {s.description && <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--color-text-subtle)", marginTop: 2, lineHeight: "16px" }}>{s.description}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
