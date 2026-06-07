import React from "react";

export interface CarouselProps {
  /** Each child is a slide (image, card, banner). */
  children: React.ReactNode;
  /** Pixel height of the viewport. @default 280 */
  height?: number;
  /** Auto-advance interval in ms (0 = off). @default 0 */
  interval?: number;
  /** Show prev/next arrows. @default true */
  arrows?: boolean;
  /** Show dot indicators. @default true */
  dots?: boolean;
}

/** UX4G Carousel — swipeable slide deck for hero banners and galleries. */
export function Carousel({ children, height = 280, interval = 0, arrows = true, dots = true }: CarouselProps) {
  const slides = React.Children.toArray(children);
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = (next: number) => setI(((next % n) + n) % n);

  React.useEffect(() => {
    if (!interval || n < 2) return;
    const t = setInterval(() => setI((c) => (c + 1) % n), interval);
    return () => clearInterval(t);
  }, [interval, n]);

  return (
    <div style={{ position: "relative", width: "100%", height, borderRadius: "var(--radius-2xl)", overflow: "hidden", background: "var(--neutral-100)" }}>
      <div style={{ display: "flex", height: "100%", width: `${n * 100}%`, transform: `translateX(-${i * (100 / n)}%)`, transition: "transform var(--duration-slow) var(--ease-emphasized)" }}>
        {slides.map((s, idx) => (
          <div key={idx} style={{ width: `${100 / n}%`, height: "100%", flex: "none", overflow: "hidden" }}>{s}</div>
        ))}
      </div>

      {arrows && n > 1 && (["prev", "next"] as const).map((dir) => (
        <button key={dir} type="button" aria-label={dir} onClick={() => go(dir === "prev" ? i - 1 : i + 1)}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)", [dir === "prev" ? "left" : "right"]: 12,
            width: 38, height: 38, display: "inline-flex", alignItems: "center", justifyContent: "center",
            borderRadius: "var(--radius-full)", border: "none", background: "rgba(255,255,255,0.92)", color: "var(--neutral-900)",
            boxShadow: "var(--shadow-md)", cursor: "pointer",
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}</svg>
        </button>
      ))}

      {dots && n > 1 && (
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 7 }}>
          {slides.map((_, idx) => (
            <button key={idx} type="button" aria-label={`Go to slide ${idx + 1}`} onClick={() => go(idx)}
              style={{ width: idx === i ? 22 : 8, height: 8, borderRadius: "var(--radius-full)", border: "none", padding: 0, cursor: "pointer", background: idx === i ? "var(--white)" : "rgba(255,255,255,0.55)", transition: "width var(--duration-base) var(--ease-standard)" }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
