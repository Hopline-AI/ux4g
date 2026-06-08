import React from "react";

export interface AccessibilityWidgetProps {
  /** Corner to dock the launcher. @default "bottom-right" */
  position?: "bottom-right" | "bottom-left";
  /** Element the adjustments apply to. @default document.documentElement */
  target?: HTMLElement | null;
}

interface Settings {
  fontScale: number;      // 1 = 100%
  lineHeight: number;     // multiplier
  letterSpacing: number;  // px
  contrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  pauseMotion: boolean;
  readingGuide: boolean;
}

const DEFAULTS: Settings = {
  fontScale: 1, lineHeight: 1, letterSpacing: 0,
  contrast: false, grayscale: false, highlightLinks: false,
  readableFont: false, bigCursor: false, pauseMotion: false, readingGuide: false,
};

const STORE_KEY = "ux4g-a11y";

/**
 * UX4G Accessibility Widget — the "universal access" launcher + panel that lets
 * any visitor adjust text size, spacing, contrast, motion and more. Adjustments
 * are applied live to `target` and persisted to localStorage.
 */
export function AccessibilityWidget({ position = "bottom-right", target }: AccessibilityWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [s, setS] = React.useState<Settings>(DEFAULTS);
  const [guideY, setGuideY] = React.useState(0);

  // Load persisted settings
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setS({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch (e) { /* ignore */ }
  }, []);

  const root = () => target || (typeof document !== "undefined" ? document.documentElement : null);

  // Apply settings to the target + persist
  React.useEffect(() => {
    const el = root();
    if (!el) return;
    const st = el.style;
    st.setProperty("--ux-a11y-font-scale", String(s.fontScale));
    el.style.fontSize = s.fontScale === 1 ? "" : `${s.fontScale * 100}%`;
    st.setProperty("--ux-a11y-line", String(s.lineHeight));
    el.style.setProperty("letter-spacing", s.letterSpacing ? `${s.letterSpacing}px` : "");
    el.style.lineHeight = s.lineHeight === 1 ? "" : String(1.5 * s.lineHeight);
    el.style.filter = [s.contrast ? "contrast(1.2)" : "", s.grayscale ? "grayscale(1)" : ""].filter(Boolean).join(" ");
    el.style.cursor = s.bigCursor
      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23613AF5' stroke='white' stroke-width='1'%3E%3Cpath d='m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/%3E%3C/svg%3E\") 4 4, auto"
      : "";
    el.toggleAttribute("data-ux-a11y-links", s.highlightLinks);
    el.toggleAttribute("data-ux-a11y-readable", s.readableFont);
    el.toggleAttribute("data-ux-a11y-nomotion", s.pauseMotion);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }, [s, target]);

  // Reading guide follows the pointer
  React.useEffect(() => {
    if (!s.readingGuide) return;
    const onMove = (e: MouseEvent) => setGuideY(e.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [s.readingGuide]);

  const set = (patch: Partial<Settings>) => setS((cur) => ({ ...cur, ...patch }));
  const reset = () => setS(DEFAULTS);
  const dock = position === "bottom-left" ? { left: 24 } : { right: 24 };
  const activeCount = Object.keys(s).filter((k) => (s as any)[k] !== (DEFAULTS as any)[k]).length;

  return (
    <>
      <button type="button" aria-label="Accessibility options" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: 24, ...dock, zIndex: 1100, width: 52, height: 52,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-full)", border: "none", background: "var(--color-primary)",
          color: "var(--white)", boxShadow: "var(--shadow-l)", cursor: "pointer",
        }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="4" r="1" /><path d="m18 19 1-7-6 1" /><path d="m5 8 3-3 5.5 3-2.36 3.5" /><path d="M4.24 14.5a5 5 0 0 0 6.88 6" /><path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </svg>
      </button>

      {s.readingGuide && (
        <div aria-hidden="true" style={{ position: "fixed", left: 0, right: 0, top: guideY - 22, height: 44, zIndex: 1090, pointerEvents: "none", background: "rgba(97,58,245,0.10)", borderTop: "2px solid var(--violet-500)", borderBottom: "2px solid var(--violet-500)" }} />
      )}

      {open && (
        <div role="dialog" aria-label="Accessibility options"
          style={{
            position: "fixed", bottom: 88, ...dock, zIndex: 1100, width: 320, maxHeight: "calc(100vh - 120px)", overflowY: "auto",
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)", padding: 18,
          }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>Accessibility</h2>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)}
              style={{ display: "inline-flex", width: 30, height: 30, alignItems: "center", justifyContent: "center", border: "none", borderRadius: "var(--radius-md)", background: "var(--neutral-100)", color: "var(--neutral-700)", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          {/* Steppers */}
          <Stepper label="Text size" value={`${Math.round(s.fontScale * 100)}%`}
            onDec={() => set({ fontScale: Math.max(0.8, +(s.fontScale - 0.1).toFixed(2)) })}
            onInc={() => set({ fontScale: Math.min(1.6, +(s.fontScale + 0.1).toFixed(2)) })} />
          <Stepper label="Line spacing" value={`${s.lineHeight.toFixed(1)}×`}
            onDec={() => set({ lineHeight: Math.max(1, +(s.lineHeight - 0.2).toFixed(1)) })}
            onInc={() => set({ lineHeight: Math.min(2.4, +(s.lineHeight + 0.2).toFixed(1)) })} />
          <Stepper label="Letter spacing" value={`${s.letterSpacing}px`}
            onDec={() => set({ letterSpacing: Math.max(0, s.letterSpacing - 1) })}
            onInc={() => set({ letterSpacing: Math.min(6, s.letterSpacing + 1) })} />

          <div style={{ height: 1, background: "var(--color-divider)", margin: "12px 0" }} />

          {/* Toggles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Toggle label="Contrast" icon="contrast" on={s.contrast} onClick={() => set({ contrast: !s.contrast })} />
            <Toggle label="Grayscale" icon="gray" on={s.grayscale} onClick={() => set({ grayscale: !s.grayscale })} />
            <Toggle label="Highlight links" icon="link" on={s.highlightLinks} onClick={() => set({ highlightLinks: !s.highlightLinks })} />
            <Toggle label="Readable font" icon="font" on={s.readableFont} onClick={() => set({ readableFont: !s.readableFont })} />
            <Toggle label="Big cursor" icon="cursor" on={s.bigCursor} onClick={() => set({ bigCursor: !s.bigCursor })} />
            <Toggle label="Pause motion" icon="pause" on={s.pauseMotion} onClick={() => set({ pauseMotion: !s.pauseMotion })} />
            <Toggle label="Reading guide" icon="guide" on={s.readingGuide} onClick={() => set({ readingGuide: !s.readingGuide })} />
          </div>

          <button type="button" onClick={reset} disabled={activeCount === 0}
            style={{
              width: "100%", marginTop: 14, height: 40, border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-md)", background: "var(--white)", cursor: activeCount ? "pointer" : "not-allowed",
              fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
              color: activeCount ? "var(--color-primary)" : "var(--neutral-400)",
            }}>
            Reset all{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>
      )}

      {/* Set via dangerouslySetInnerHTML so the raw CSS (with quotes) is not
          HTML-escaped during SSR, which would otherwise trip React hydration. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        [data-ux-a11y-links] a { text-decoration: underline !important; text-underline-offset: 2px; outline: 1px dashed currentColor; outline-offset: 2px; }
        [data-ux-a11y-readable], [data-ux-a11y-readable] * { font-family: Verdana, Tahoma, "Trebuchet MS", sans-serif !important; }
        [data-ux-a11y-nomotion], [data-ux-a11y-nomotion] * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
      `,
        }}
      />
    </>
  );
}

function Stepper({ label, value, onDec, onInc }: { label: string; value: string; onDec: () => void; onInc: () => void }) {
  const btn: React.CSSProperties = { width: 34, height: 34, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--white)", color: "var(--color-text)", cursor: "pointer", fontSize: 18, fontWeight: 600 };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button type="button" aria-label={`Decrease ${label}`} onClick={onDec} style={btn}>−</button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--violet-700)", minWidth: 44, textAlign: "center" }}>{value}</span>
        <button type="button" aria-label={`Increase ${label}`} onClick={onInc} style={btn}>+</button>
      </div>
    </div>
  );
}

const GLYPHS: Record<string, React.ReactNode> = {
  contrast: <><circle cx="12" cy="12" r="10" /><path d="M12 18a6 6 0 0 0 0-12v12z" fill="currentColor" /></>,
  gray: <><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  font: <><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" x2="15" y1="20" y2="20" /><line x1="12" x2="12" y1="4" y2="20" /></>,
  cursor: <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />,
  pause: <><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></>,
  guide: <><path d="M3 12h18" /><path d="M3 6h18" opacity="0.4" /><path d="M3 18h18" opacity="0.4" /></>,
};

function Toggle({ label, icon, on, onClick }: { label: string; icon: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "12px 6px", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "center",
        border: `1.5px solid ${on ? "var(--color-primary)" : "var(--color-border)"}`,
        background: on ? "var(--violet-50)" : "var(--white)", color: on ? "var(--violet-700)" : "var(--color-text-muted)",
      }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{GLYPHS[icon]}</svg>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 500, lineHeight: 1.2 }}>{label}</span>
    </button>
  );
}

export default AccessibilityWidget;
