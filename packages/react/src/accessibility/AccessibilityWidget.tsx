import React from "react";

export interface AccessibilityWidgetProps {
  /** Corner to dock the launcher. @default "bottom-right" */
  position?: "bottom-right" | "bottom-left";
  /** Element the adjustments apply to. @default document.documentElement */
  target?: HTMLElement | null;
}

interface Settings {
  fontScale: number;   // 0.8 – 1.6
  spacing: number;     // 0–3 level (letter spacing)
  line: number;        // 0–3 level (line height)
  dyslexia: boolean;
  adhd: boolean;       // reading mask
  saturation: number;  // 0 normal · 1 low · 2 high · 3 none(gray)
  dark: boolean;       // dark mode (smart invert)
  invert: boolean;     // full colour inversion
  links: boolean;
  tts: boolean;        // text to speech
  cursor: boolean;     // big cursor
  pause: boolean;      // pause animation
  hideImages: boolean;
  contrast: boolean;
}

const DEFAULTS: Settings = {
  fontScale: 1, spacing: 0, line: 0, dyslexia: false, adhd: false, saturation: 0,
  dark: false, invert: false, links: false, tts: false, cursor: false, pause: false,
  hideImages: false, contrast: false,
};

const STORE_KEY = "ux4g-a11y";
const SPACING_PX = [0, 1, 2, 3];
const LINE_VAL = ["", "1.7", "2.0", "2.4"];
const LINE_CAP = ["", "Relaxed", "Loose", "Spacious"];
const SAT_FILTER = ["", "saturate(0.5)", "saturate(1.6)", "saturate(0)"];
const SAT_CAP = ["", "Low", "High", "None"];

/**
 * UX4G Accessibility Widget — the "universal access" launcher + panel. A
 * 3-column tile grid lets any visitor adjust text size & spacing, dyslexia &
 * ADHD reading aids, saturation, dark / inverted colours, link highlighting,
 * text-to-speech, cursor size, motion and images. Changes apply live to
 * `target` and persist to localStorage.
 */
export function AccessibilityWidget({ position = "bottom-right", target }: AccessibilityWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [s, setS] = React.useState<Settings>(DEFAULTS);
  const [maskY, setMaskY] = React.useState(-999);

  React.useEffect(() => {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) setS({ ...DEFAULTS, ...JSON.parse(raw) }); } catch (e) { /* ignore */ }
  }, []);

  const root = () => target || (typeof document !== "undefined" ? document.documentElement : null);

  // Compose & apply visual settings
  React.useEffect(() => {
    const el = root();
    if (!el) return;
    const st = el.style;
    st.fontSize = s.fontScale === 1 ? "" : `${Math.round(s.fontScale * 100)}%`;
    st.letterSpacing = s.spacing ? `${SPACING_PX[s.spacing]}px` : "";
    st.lineHeight = s.line ? LINE_VAL[s.line] : "";
    const filter = [
      s.contrast ? "contrast(1.25)" : "",
      s.saturation ? SAT_FILTER[s.saturation] : "",
      s.dark ? "invert(1) hue-rotate(180deg)" : s.invert ? "invert(1)" : "",
    ].filter(Boolean).join(" ");
    st.filter = filter;
    st.cursor = s.cursor
      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23613AF5' stroke='white' stroke-width='1.5'%3E%3Cpath d='m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/%3E%3C/svg%3E\") 4 4, auto"
      : "";
    el.toggleAttribute("data-ux-links", s.links);
    el.toggleAttribute("data-ux-dyslexia", s.dyslexia);
    el.toggleAttribute("data-ux-nomotion", s.pause);
    el.toggleAttribute("data-ux-hideimg", s.hideImages);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }, [s, target]);

  // Reading mask (ADHD mode) follows the pointer
  React.useEffect(() => {
    if (!s.adhd) return;
    const onMove = (e: MouseEvent) => setMaskY(e.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [s.adhd]);

  // Text to speech
  React.useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth) return;
    if (!s.tts) { synth.cancel(); return; }
    const speak = (text: string) => {
      const t = (text || "").trim();
      if (!t) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(t.slice(0, 4000));
      u.rate = 1; u.lang = document.documentElement.lang || "en-IN";
      synth.speak(u);
    };
    const el = root();
    const main = (el?.querySelector("main, article, [role=main]") as HTMLElement) || (typeof document !== "undefined" ? document.body : null);
    speak(main?.innerText || "");
    const onUp = () => { const sel = window.getSelection()?.toString(); if (sel && sel.trim()) speak(sel); };
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mouseup", onUp); synth.cancel(); };
  }, [s.tts]);

  const set = (patch: Partial<Settings>) => setS((c) => ({ ...c, ...patch }));
  const reset = () => setS(DEFAULTS);
  const dock = position === "bottom-left" ? { left: 24 } : { right: 24 };
  const activeCount = (Object.keys(s) as (keyof Settings)[]).filter((k) => s[k] !== DEFAULTS[k]).length;

  // Counter-filter keeps the widget legible while the page is dark/inverted
  const counter = s.dark ? "invert(1) hue-rotate(180deg)" : s.invert ? "invert(1)" : "";

  return (
    <>
      <button type="button" aria-label="Accessibility options" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: 24, ...dock, zIndex: 1100, width: 52, height: 52,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-full)", border: "none", background: "var(--color-primary)",
          color: "var(--white)", boxShadow: "var(--shadow-l)", cursor: "pointer", filter: counter,
        }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.6" /><path d="M3.5 8.5c2.5 1.2 5.3 1.8 8.5 1.8s6-.6 8.5-1.8" /><path d="M12 10.3V15" /><path d="m8.5 21 3.5-6 3.5 6" />
        </svg>
      </button>

      {/* ADHD reading mask */}
      {s.adhd && (
        <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 1090, pointerEvents: "none", filter: counter }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: Math.max(0, maskY - 60), background: "rgba(10,8,30,0.62)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: maskY + 60, bottom: 0, background: "rgba(10,8,30,0.62)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: Math.max(0, maskY - 60), height: 120, borderTop: "2px solid var(--violet-400)", borderBottom: "2px solid var(--violet-400)" }} />
        </div>
      )}

      {open && (
        <div role="dialog" aria-label="Accessibility options"
          style={{
            position: "fixed", bottom: 88, ...dock, zIndex: 1100, width: 348, maxHeight: "calc(100vh - 120px)", overflowY: "auto",
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)", padding: 18, filter: counter,
          }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>Accessibility</h2>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)}
              style={{ display: "inline-flex", width: 30, height: 30, alignItems: "center", justifyContent: "center", border: "none", borderRadius: "var(--radius-md)", background: "var(--neutral-100)", color: "var(--neutral-700)", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--color-text-muted)", margin: "0 0 14px" }}>
            Adjust this page to suit your needs. Settings are remembered on this device.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <Tile label="Bigger Text" disabled={s.fontScale >= 1.6} active={s.fontScale > 1}
              icon={<TypeIcon big />} onClick={() => set({ fontScale: Math.min(1.6, +(s.fontScale + 0.1).toFixed(2)) })}
              caption={s.fontScale !== 1 ? `${Math.round(s.fontScale * 100)}%` : undefined} />
            <Tile label="Smaller Text" disabled={s.fontScale <= 0.8} active={s.fontScale < 1}
              icon={<TypeIcon />} onClick={() => set({ fontScale: Math.max(0.8, +(s.fontScale - 0.1).toFixed(2)) })}
              caption={s.fontScale !== 1 ? `${Math.round(s.fontScale * 100)}%` : undefined} />
            <Tile label="Text Spacing" active={s.spacing > 0} icon={<SpacingIcon />}
              onClick={() => set({ spacing: (s.spacing + 1) % 4 })} caption={s.spacing ? `+${SPACING_PX[s.spacing]}px` : undefined} />

            <Tile label="Line Height" active={s.line > 0} icon={<LineIcon />}
              onClick={() => set({ line: (s.line + 1) % 4 })} caption={LINE_CAP[s.line] || undefined} />
            <Tile label="Dyslexia Friendly" active={s.dyslexia} icon={<GlyphIcon text="Df" />}
              onClick={() => set({ dyslexia: !s.dyslexia })} />
            <Tile label="ADHD Mode" active={s.adhd} icon={<AdhdIcon />} onClick={() => set({ adhd: !s.adhd })} />

            <Tile label="Saturation" active={s.saturation > 0} icon={<DropIcon />}
              onClick={() => set({ saturation: (s.saturation + 1) % 4 })} caption={SAT_CAP[s.saturation] || undefined} />
            <Tile label="Light-Dark" active={s.dark} icon={<MoonIcon />} onClick={() => set({ dark: !s.dark, invert: false })} />
            <Tile label="Invert Colors" active={s.invert} icon={<InvertIcon />} onClick={() => set({ invert: !s.invert, dark: false })} />

            <Tile label="Highlight Links" active={s.links} icon={<LinkIcon />} onClick={() => set({ links: !s.links })} />
            <Tile label="Text to Speech" active={s.tts} icon={<SpeechIcon />} onClick={() => set({ tts: !s.tts })} />
            <Tile label="Cursor" active={s.cursor} icon={<CursorIcon />} onClick={() => set({ cursor: !s.cursor })} />

            <Tile label="Pause Animation" active={s.pause} icon={<PauseIcon />} onClick={() => set({ pause: !s.pause })} />
            <Tile label="Hide Images" active={s.hideImages} icon={<HideImgIcon />} onClick={() => set({ hideImages: !s.hideImages })} />
            <Tile label="Contrast" active={s.contrast} icon={<ContrastIcon />} onClick={() => set({ contrast: !s.contrast })} />
          </div>

          <button type="button" onClick={reset} disabled={activeCount === 0}
            style={{
              width: "100%", marginTop: 14, height: 42, border: "1.5px solid var(--color-border)",
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
        [data-ux-links] a { text-decoration: underline !important; text-underline-offset: 2px; outline: 1px dashed currentColor; outline-offset: 2px; }
        [data-ux-dyslexia], [data-ux-dyslexia] * { font-family: "Comic Sans MS","OpenDyslexic",Verdana,Tahoma,sans-serif !important; letter-spacing: .03em !important; word-spacing: .14em !important; line-height: 1.75 !important; }
        [data-ux-nomotion], [data-ux-nomotion] * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        [data-ux-hideimg] img, [data-ux-hideimg] picture, [data-ux-hideimg] video, [data-ux-hideimg] [style*="background-image"] { opacity: 0 !important; }
      `,
        }}
      />
    </>
  );
}

/* ---------- Tile ---------- */
function Tile({ label, icon, active, onClick, caption, disabled }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void; caption?: string; disabled?: boolean }) {
  return (
    <button type="button" aria-pressed={active} disabled={disabled} onClick={onClick} title={label}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: 6,
        padding: "13px 4px 11px", borderRadius: "var(--radius-lg)", cursor: disabled ? "not-allowed" : "pointer", textAlign: "center",
        border: `1.5px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
        background: active ? "var(--violet-50)" : "var(--white)", color: active ? "var(--violet-700)" : "var(--color-text-muted)",
        opacity: disabled ? 0.45 : 1, minHeight: 100, transition: "border-color var(--duration-fast), background var(--duration-fast)",
      }}>
      <span style={{ height: 26, display: "inline-flex", alignItems: "center", color: active ? "var(--color-primary)" : "var(--neutral-700)" }}>{icon}</span>
      <span style={{ minHeight: 29, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 500, lineHeight: 1.2, color: active ? "var(--violet-700)" : "var(--color-text)" }}>{label}</span>
      {caption && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, color: "var(--color-primary)" }}>{caption}</span>}
    </button>
  );
}

/* ---------- Icons (inline SVG / letterforms — no emoji) ---------- */
const S = (p: React.SVGProps<SVGSVGElement>) => ({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });
const TypeIcon = ({ big }: { big?: boolean }) => (
  <svg {...S({})}><text x="3" y="19" fontSize={big ? 9 : 13} fontFamily="serif" fontWeight="700" stroke="none" fill="currentColor">T</text><text x={big ? 10 : 11} y="19" fontSize={big ? 17 : 9} fontFamily="serif" fontWeight="700" stroke="none" fill="currentColor">T</text></svg>
);
const GlyphIcon = ({ text }: { text: string }) => (
  <svg {...S({})}><text x="12" y="18" fontSize="13" fontFamily="Georgia, serif" fontWeight="700" textAnchor="middle" stroke="none" fill="currentColor">{text}</text></svg>
);
const SpacingIcon = () => (<svg {...S({})}><text x="12" y="13" fontSize="11" fontWeight="700" textAnchor="middle" stroke="none" fill="currentColor">A</text><path d="M3 19h18" /><path d="m5 17-2 2 2 2M19 17l2 2-2 2" /></svg>);
const LineIcon = () => (<svg {...S({})}><path d="M10 6h11M10 12h11M10 18h11" /><path d="M4 8V4m0 0L2.5 5.5M4 4l1.5 1.5M4 16v4m0 0 1.5-1.5M4 20l-1.5-1.5" /></svg>);
const AdhdIcon = () => (<svg {...S({})}><circle cx="12" cy="12" r="9.5" /><path d="M6.5 12.5c1.2-2 2.4-2 3.6 0s2.4 2 3.6 0 2.4-2 3.6 0" /></svg>);
const DropIcon = () => (<svg {...S({})}><path d="M12 2.7s6 6.3 6 10.3a6 6 0 0 1-12 0c0-4 6-10.3 6-10.3z" /><path d="M12 3v18a6 6 0 0 0 0-12" fill="currentColor" stroke="none" opacity="0.85" /></svg>);
const MoonIcon = () => (<svg {...S({})}><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" /></svg>);
const InvertIcon = () => (<svg {...S({})}><circle cx="12" cy="12" r="9.5" /><path d="M12 2.5a9.5 9.5 0 0 0 0 19z" fill="currentColor" stroke="none" /></svg>);
const LinkIcon = () => (<svg {...S({})}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>);
const SpeechIcon = () => (<svg {...S({})}><path d="M4 11v2M8 7v10M12 4v16M16 8v8M20 11v2" /></svg>);
const CursorIcon = () => (<svg {...S({})}><path d="m4 4 7.07 16.97 2.51-7.39 7.39-2.51L4 4z" /></svg>);
const PauseIcon = () => (<svg {...S({})}><circle cx="12" cy="12" r="9.5" /><path d="M10 9v6M14 9v6" /></svg>);
const HideImgIcon = () => (<svg {...S({})}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="m6 17 4-4 3 3" /><circle cx="15.5" cy="9.5" r="1.3" /><path d="m3.5 3.5 17 17" /></svg>);
const ContrastIcon = () => (<svg {...S({})}><circle cx="12" cy="12" r="9.5" /><path d="M12 2.5v19a9.5 9.5 0 0 0 0-19z" fill="currentColor" stroke="none" /></svg>);

export default AccessibilityWidget;
