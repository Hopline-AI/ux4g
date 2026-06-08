import React from "react";

export interface FeedbackRating { value: number; label: string; }

export interface FeedbackWidgetProps {
  /** Corner for the floating launcher. @default "bottom-right" */
  position?: "bottom-right" | "bottom-left";
  /** Launcher label. @default "Feedback" */
  triggerLabel?: string;
  title?: string;
  prompt?: string;
  /** Rating scale (1–5 faces by default). */
  ratings?: FeedbackRating[];
  /** Optional category chips. */
  categories?: string[];
  placeholder?: string;
  onSubmit?: (data: { rating: number | null; category?: string; message: string }) => void;
  /** Render in flow instead of fixed to a corner (for embedding / demos). */
  inline?: boolean;
  defaultOpen?: boolean;
}

const DEFAULT_RATINGS: FeedbackRating[] = [
  { value: 1, label: "Very poor" }, { value: 2, label: "Poor" },
  { value: 3, label: "Okay" }, { value: 4, label: "Good" }, { value: 5, label: "Excellent" },
];

const MOUTHS: Record<number, string> = {
  1: "M8.5 16.4 Q12 12.6 15.5 16.4", 2: "M8.5 15.7 Q12 13.9 15.5 15.7",
  3: "M8.5 15 L15.5 15", 4: "M8.5 14 Q12 16.2 15.5 14", 5: "M8 13.4 Q12 17.6 16 13.4",
};
const Face = ({ level, on }: { level: number; on: boolean }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={on ? "var(--color-primary)" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.2" fill={on ? "var(--color-primary-subtle)" : "none"} />
    <circle cx="9" cy="10" r="0.6" fill={on ? "var(--color-primary)" : "currentColor"} stroke="none" />
    <circle cx="15" cy="10" r="0.6" fill={on ? "var(--color-primary)" : "currentColor"} stroke="none" />
    <path d={MOUTHS[level] || MOUTHS[3]} />
  </svg>
);

/** UX4G Feedback Widget — a corner launcher that opens a short feedback form:
 *  a face rating, optional category, a comment and submit, with a thank-you
 *  state. Faces are inline SVG (no emoji), per UX4G iconography. */
export function FeedbackWidget({
  position = "bottom-right", triggerLabel = "Feedback", title = "Share your feedback",
  prompt = "How was your experience?", ratings = DEFAULT_RATINGS, categories,
  placeholder = "Tell us what worked or what we can improve…", onSubmit, inline = false, defaultOpen = false,
}: FeedbackWidgetProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [rating, setRating] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState<string | undefined>();
  const [message, setMessage] = React.useState("");
  const [done, setDone] = React.useState(false);

  const submit = () => { onSubmit?.({ rating, category, message }); setDone(true); };
  const reset = () => { setOpen(false); setTimeout(() => { setDone(false); setRating(null); setCategory(undefined); setMessage(""); }, 200); };

  const left = position === "bottom-left";
  const wrap: React.CSSProperties = inline
    ? { position: "relative", display: "inline-block", fontFamily: "var(--font-sans)" }
    : { position: "fixed", bottom: 24, [left ? "left" : "right"]: 24, zIndex: 70, fontFamily: "var(--font-sans)" } as any;

  return (
    <div style={wrap}>
      {(!open || inline === false) && (
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
          style={{
            display: open && !inline ? "none" : "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ui)",
            fontWeight: 500, fontSize: 14, color: "#fff", background: "var(--color-primary)", border: "none",
            padding: "11px 18px", borderRadius: "var(--radius-full)", boxShadow: "var(--shadow-l)", cursor: "pointer", minHeight: 44,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          {triggerLabel}
        </button>
      )}

      {open && (
        <div role="dialog" aria-label={title} style={{
          width: 320, background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-xl)", padding: 20,
          position: inline ? "static" : "absolute", bottom: inline ? undefined : 0, right: inline || left ? undefined : 0, left: left ? 0 : undefined,
        }}>
          {!done ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text)" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>{prompt}</div>
                </div>
                <button onClick={reset} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: 2, lineHeight: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              <div role="radiogroup" aria-label={prompt} style={{ display: "flex", justifyContent: "space-between", gap: 4, margin: "16px 0 6px" }}>
                {ratings.map((r) => (
                  <button key={r.value} role="radio" aria-checked={rating === r.value} aria-label={r.label} title={r.label}
                    onClick={() => setRating(r.value)}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: rating === r.value ? "var(--color-primary)" : "var(--neutral-500)", padding: "4px 0", transition: "color var(--duration-fast)" }}>
                    <Face level={r.value} on={rating === r.value} />
                  </button>
                ))}
              </div>
              {rating != null && <div style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--color-primary)", marginBottom: 10 }}>{ratings.find((r) => r.value === rating)?.label}</div>}

              {categories && categories.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {categories.map((c) => (
                    <button key={c} onClick={() => setCategory((x) => (x === c ? undefined : c))}
                      style={{ fontSize: 12, padding: "5px 11px", borderRadius: "var(--radius-full)", cursor: "pointer",
                        border: "1px solid " + (category === c ? "var(--color-primary)" : "var(--color-border)"),
                        background: category === c ? "var(--color-primary-subtle)" : "var(--color-surface)",
                        color: category === c ? "var(--violet-700)" : "var(--color-text-muted)", fontWeight: category === c ? 600 : 400 }}>{c}</button>
                  ))}
                </div>
              )}

              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={placeholder} rows={3}
                style={{ width: "100%", resize: "vertical", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text)",
                  padding: "9px 11px", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.boxShadow = "var(--focus-ring)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.boxShadow = "none"; }} />

              <button onClick={submit} disabled={rating == null}
                style={{ width: "100%", marginTop: 12, fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 15, color: "#fff",
                  background: rating == null ? "var(--neutral-400)" : "var(--color-primary)", border: "none", padding: "11px", borderRadius: "var(--radius-md)",
                  cursor: rating == null ? "not-allowed" : "pointer", minHeight: 44, transition: "background var(--duration-fast)" }}>Send feedback</button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <span style={{ width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-success-subtle)", color: "var(--color-success)", display: "inline-grid", placeItems: "center", marginBottom: 12 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text)" }}>Thank you</div>
              <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4 }}>Your feedback helps us improve this service.</div>
              <button onClick={reset} style={{ marginTop: 16, fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 14, color: "var(--color-primary)", background: "var(--color-primary-subtle)", border: "none", padding: "9px 18px", borderRadius: "var(--radius-md)", cursor: "pointer" }}>Done</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackWidget;
