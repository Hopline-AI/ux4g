/* UX4G e-Visa — shared government chrome (utility strip, emblem masthead,
   primary nav, accessible notices ticker, portal footer). Composed from
   @hopline/ux4g-react primitives + design tokens only. */
import React from "react";
import { Button, Footer } from "@hopline/ux4g-react";
import { Icon } from "./icons";

/* Official Government of India e-Visa marks live under /evisa/assets when
   supplied; until then LogoSlot shows a labelled placeholder. */
const LOGOS = {
  boi: "/evisa/assets/boi-logo.png",
  emblem: "/evisa/assets/emblem.png",
  evisa: "/evisa/assets/evisa-logo.png",
};

/* ---------- logo with placeholder fallback ----------
   Checks naturalWidth on mount as well as onError: under SSR the 404 can fire
   before React attaches its onError handler, so the mount check is what
   actually catches a missing logo. Drop real PNGs into /evisa/assets and the
   <img> loads instead, no code change. */
function LogoSlot({ src, alt, label, height }: { src: string; alt: string; label: string; height: number }) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        style={{
          height, minWidth: height, padding: "0 10px", display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: "1px dashed var(--color-border-strong)", borderRadius: 6, background: "var(--color-surface-subtle)",
          fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        {label}
      </span>
    );
  }
  return <img ref={ref} src={src} alt={alt} height={height} onError={() => setFailed(true)} style={{ height, width: "auto", flexShrink: 0 }} />;
}

/* ---------- footer trust badge (logo with text fallback) ----------
   Same mount + onError fallback pattern as LogoSlot: fixed 150x54 white box
   showing the official mark, or the text label if the PNG is missing. */
function TrustBadge({ src, label }: { src: string; label: string }) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <span style={{ width: 150, height: 54, border: "1px solid var(--color-border)", borderRadius: 8, background: "var(--color-surface)", display: "grid", placeItems: "center" }}>
      {failed ? (
        <span style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", padding: "0 8px" }}>{label}</span>
      ) : (
        <img ref={ref} src={src} alt={label} onError={() => setFailed(true)} style={{ maxHeight: 38, maxWidth: 126, objectFit: "contain" }} />
      )}
    </span>
  );
}

/* ---------- e-Visa brand wordmark (original mark) ---------- */
export function EVisaMark({ size = 40 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span style={{ width: size, height: size, borderRadius: 11, flexShrink: 0, background: "var(--color-primary)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-s)" }}>
        <Icon name="plane" size={Math.round(size * 0.55)} color="#fff" stroke={2} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontSize: 19, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.2px" }}>
          e‑Visa <span style={{ color: "var(--color-primary)" }}>India</span>
        </span>
        <span style={{ fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.3px" }}>Official Government Portal</span>
      </span>
    </span>
  );
}

/* ---------- Tricolour chip ---------- */
export function Tricolour({ w = 18, h: hh = 12 }: { w?: number; h?: number }) {
  return (
    <span aria-hidden="true" style={{ width: w, height: hh, borderRadius: 2, overflow: "hidden", display: "inline-flex", flexDirection: "column", boxShadow: "0 0 0 0.5px var(--color-border)" }}>
      <span style={{ flex: 1, background: "#FF9933" }} />
      <span style={{ flex: 1, background: "#fff", display: "grid", placeItems: "center" }}>
        <span style={{ width: 3, height: 3, borderRadius: 999, background: "#0A3A8B" }} />
      </span>
      <span style={{ flex: 1, background: "#138808" }} />
    </span>
  );
}

/* ---------- Tier 1: government utility strip ---------- */
export function UtilityStrip() {
  const [scale, setScale] = React.useState<number>(() => (typeof window === "undefined" ? 1 : Number(localStorage.getItem("ev-font-scale") || 1)));
  const [lang, setLang] = React.useState<string>(() => (typeof window === "undefined" ? "en" : localStorage.getItem("ev-lang") || "en"));
  React.useEffect(() => {
    document.documentElement.style.setProperty("--user-font-scale", String(scale));
    localStorage.setItem("ev-font-scale", String(scale));
  }, [scale]);
  const setL = (l: string) => { setLang(l); localStorage.setItem("ev-lang", l); };
  const clamp = (v: number) => Math.min(1.24, Math.max(0.88, Math.round(v * 100) / 100));

  const linkStyle: React.CSSProperties = { color: "var(--color-text-muted)", textDecoration: "none", fontSize: 12.5, fontWeight: 500, whiteSpace: "nowrap" };
  const sizeBtn = (label: string, aria: string, onClick: () => void, active: boolean) => (
    <button
      onClick={onClick}
      aria-label={aria}
      aria-pressed={active || undefined}
      style={{
        minWidth: 28, height: 28, padding: "0 7px", borderRadius: 6, cursor: "pointer",
        border: "1px solid var(--color-border)", background: active ? "var(--color-primary-subtle)" : "var(--color-surface)",
        color: active ? "var(--color-primary)" : "var(--color-text)", fontFamily: "var(--font-sans)",
        fontSize: 12.5, fontWeight: 600, lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ background: "var(--color-surface-subtle)", borderBottom: "1px solid var(--color-divider)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "6px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Tricolour />
          <span style={{ fontSize: 12.5, color: "var(--color-text)", fontWeight: 600 }}>Government of India</span>
          <span style={{ fontSize: 12.5, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>भारत सरकार</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, rowGap: 6, flexWrap: "wrap" }}>
          <a href="#main" style={linkStyle} className="ev-util-link">Skip to main content</a>
          <span style={{ width: 1, height: 16, background: "var(--color-border)" }} />
          <a href="#" style={linkStyle} className="ev-util-link">Screen reader access</a>
          <span style={{ width: 1, height: 16, background: "var(--color-border)" }} />
          <div role="group" aria-label="Text size" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {sizeBtn("A−", "Decrease text size", () => setScale((s) => clamp(s - 0.08)), false)}
            {sizeBtn("A", "Reset text size", () => setScale(1), Math.abs(scale - 1) < 0.001)}
            {sizeBtn("A+", "Increase text size", () => setScale((s) => clamp(s + 0.08)), false)}
          </div>
          <span style={{ width: 1, height: 16, background: "var(--color-border)" }} />
          <div role="group" aria-label="Language" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon name="globe" size={15} color="var(--color-text-muted)" style={{ marginRight: 4 }} />
            {["en", "hi"].map((l) => (
              <button
                key={l}
                onClick={() => setL(l)}
                aria-pressed={lang === l}
                style={{
                  border: "none", background: "none", cursor: "pointer", padding: "2px 6px", borderRadius: 5,
                  fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: lang === l ? 700 : 500,
                  color: lang === l ? "var(--color-primary)" : "var(--color-text-muted)",
                }}
              >
                {l === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tier 2: emblem masthead ---------- */
export function Masthead({ applyHref = "/examples/evisa/apply" }: { applyHref?: string }) {
  return (
    <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
      <div className="ev-masthead" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        {/* left — Bureau of Immigration */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <LogoSlot src={LOGOS.boi} alt="Bureau of Immigration" label="BOI" height={50} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.18, minWidth: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.2px" }}>Bureau of Immigration</span>
            <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>गृह मंत्रालय · Ministry of Home Affairs</span>
          </div>
        </div>
        {/* centre — State Emblem of India */}
        <div className="ev-emblem ev-hide-sm" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, margin: "0 auto" }}>
          <LogoSlot src={LOGOS.emblem} alt="State Emblem of India" label="Emblem" height={52} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--color-text)", letterSpacing: "0.2px" }}>Government of India</span>
        </div>
        {/* right — e-Visa mark + apply */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <LogoSlot src={LOGOS.evisa} alt="Indian e-Visa" label="e-Visa" height={46} />
          <span className="ev-hide-sm" style={{ width: 1, height: 38, background: "var(--color-border)" }} />
          <a href={applyHref} className="ev-hide-sm" style={{ textDecoration: "none" }}>
            <Button variant="primary" iconLeft={<Icon name="plane" size={18} color="#fff" />}>Apply now</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

interface NavLink { label: string; href: string; key: string; }

/* ---------- Tier 3: primary navigation ---------- */
export function PrimaryNav({ active, links }: { active?: string; links?: NavLink[] }) {
  const [open, setOpen] = React.useState(false);
  const items: NavLink[] = links || [
    { label: "Home", href: "/examples/evisa", key: "home" },
    { label: "Eligibility", href: "#eligibility", key: "eligibility" },
    { label: "Visa types", href: "#visa-types", key: "visa-types" },
    { label: "How it works", href: "#how-it-works", key: "how" },
    { label: "Track application", href: "#track", key: "track" },
    { label: "Help & FAQs", href: "#help", key: "help" },
  ];
  const linkEl = (l: NavLink) => {
    const isActive = l.key === active;
    return (
      <a
        key={l.key}
        href={l.href}
        aria-current={isActive ? "page" : undefined}
        className="ev-nav-link"
        style={{
          position: "relative", padding: "0 16px", height: 52, display: "inline-flex", alignItems: "center",
          fontSize: 15, fontWeight: isActive ? 600 : 500, whiteSpace: "nowrap", textDecoration: "none",
          color: isActive ? "var(--color-primary)" : "var(--color-text)",
          boxShadow: isActive ? "inset 0 -3px 0 var(--color-primary)" : "none",
        }}
      >
        {l.label}
      </a>
    );
  };
  return (
    <nav aria-label="Primary" style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", boxShadow: "var(--shadow-xs)", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="ev-nav-desktop" style={{ display: "flex", alignItems: "center" }}>{items.map(linkEl)}</div>
        <button
          className="ev-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          style={{ display: "none", alignItems: "center", gap: 8, height: 52, padding: "0 4px", border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--color-text)" }}
        >
          <Icon name={open ? "x" : "menu"} size={22} />
          Menu
        </button>
        <a href="#track" className="ev-nav-quick" style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 52, paddingLeft: 16, textDecoration: "none", fontSize: 14.5, fontWeight: 600, color: "var(--color-primary)" }}>
          <Icon name="search" size={17} color="var(--color-primary)" />
          Track your application
        </a>
      </div>
      {open && (
        <div className="ev-nav-mobile" style={{ borderTop: "1px solid var(--color-divider)", padding: "8px 16px 14px" }}>
          {items.map((l) => (
            <a
              key={l.key}
              href={l.href}
              style={{
                display: "block", padding: "12px 8px", borderRadius: 8, textDecoration: "none", fontSize: 16,
                fontWeight: l.key === active ? 600 : 500,
                color: l.key === active ? "var(--color-primary)" : "var(--color-text)",
                background: l.key === active ? "var(--color-primary-subtle)" : "transparent",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

interface Notice { text: string; href: string; cta: string; }

/* ---------- Accessible notices ticker (tasteful marquee) ---------- */
export function NoticesTicker({ notices }: { notices?: Notice[] }) {
  const [paused, setPaused] = React.useState(false);
  const data: Notice[] = notices || [
    { text: "Afghanistan nationals may now apply on the new AFGHAN portal.", href: "#", cta: "Open portal" },
    { text: "Foreigners and OCI card holders can submit the e-Arrival card within 72 hours before arrival.", href: "#", cta: "e-Arrival card" },
    { text: "Beware of fraudulent websites — this is the only official Government of India e-Visa portal.", href: "#", cta: "Learn more" },
  ];
  const item = (n: Notice, i: React.Key) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, paddingRight: 48, flexShrink: 0, whiteSpace: "nowrap" }}>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--color-primary)", flexShrink: 0 }} />
      <span style={{ fontSize: 14, color: "var(--color-text)" }}>{n.text}</span>
      <a href={n.href} style={{ fontSize: 14, fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>
        {n.cta}
        <Icon name="chevronRight" size={14} color="var(--color-primary)" />
      </a>
    </span>
  );

  return (
    <section aria-label="Important notices" className="ev-ticker" style={{ background: "var(--color-primary-subtle)", borderBottom: "1px solid var(--color-divider)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, flexShrink: 0, background: "var(--color-primary)", color: "#fff", padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", margin: "8px 0" }}>
          <Icon name="info" size={15} color="#fff" />
          Notices
        </span>
        <div className="ev-ticker-viewport" style={{ flex: 1, overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)" }}>
          <div className={"ev-ticker-track" + (paused ? " is-paused" : "")} style={{ display: "inline-flex", alignItems: "center" }}>
            {data.map((n, i) => item(n, i))}
            {data.map((n, i) => item(n, "b" + i))}
          </div>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume notices" : "Pause notices"}
          style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 7, border: "1px solid var(--color-border)", background: "var(--color-surface)", cursor: "pointer", display: "grid", placeItems: "center", color: "var(--color-text-muted)" }}
        >
          <Icon name={paused ? "play" : "pause"} size={15} />
        </button>
        <a href="#notices" className="ev-hide-sm" style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: "var(--color-text-muted)", textDecoration: "none", whiteSpace: "nowrap" }}>All notices</a>
      </div>
    </section>
  );
}

/* ---------- Government header (disclaimer + all three tiers + ticker) ---------- */
export function GovHeader({ active, withTicker = true }: { active?: string; withTicker?: boolean }) {
  return (
    <>
      <div role="note" style={{ background: "var(--color-warning-subtle)", borderBottom: "1px solid var(--color-divider)", color: "var(--color-text)", fontSize: 12.5, textAlign: "center", padding: "5px 16px" }}>
        Unofficial redesign concept · built on the UX4G design system · not affiliated with the Government of India
      </div>
      <UtilityStrip />
      <Masthead />
      <PrimaryNav active={active} />
      {withTicker && <NoticesTicker />}
    </>
  );
}

/* ---------- Portal footer ---------- */
export function PortalFooter() {
  const trust = [
    { label: "Digital India", src: "/evisa/assets/trust-digital-india.png" },
    { label: "Swachh Bharat", src: "/evisa/assets/trust-swachh-bharat.png" },
    { label: "india.gov.in", src: "/evisa/assets/trust-india-gov.png" },
    { label: "MyGov", src: "/evisa/assets/trust-mygov.png" },
    { label: "150 Years of the Mahatma", src: "/evisa/assets/trust-mahatma.png" },
  ];
  return (
    <>
      {/* trust badge band */}
      <div style={{ background: "var(--color-surface-subtle)", borderTop: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
          {trust.map((t, i) => (
            <TrustBadge key={i} src={t.src} label={t.label} />
          ))}
        </div>
      </div>
      <Footer
        logo={<LogoSlot src={LOGOS.evisa} alt="Indian e-Visa" label="e-Visa" height={40} />}
        tagline="The official Government of India portal to apply for an electronic visa (e-Visa) to travel to India."
        columns={[
          { title: "Apply", links: [
            { label: "Apply for e-Visa", href: "/examples/evisa/apply" }, { label: "Complete a saved application", href: "#" },
            { label: "Re-upload documents", href: "#" }, { label: "Sample application", href: "#" } ] },
          { title: "Manage", links: [
            { label: "Track application status", href: "#" }, { label: "Verify payment", href: "#" },
            { label: "Print e-Visa (ETA)", href: "#" }, { label: "Pay visa fee", href: "#" } ] },
          { title: "Help", links: [
            { label: "Instructions for applicants", href: "#" }, { label: "Frequently asked questions", href: "#" },
            { label: "Eligible countries", href: "#" }, { label: "Contact helpdesk", href: "#help" } ] },
          { title: "About", links: [
            { label: "Ministry of Home Affairs", href: "#" }, { label: "Bureau of Immigration", href: "#" },
            { label: "Ministry of External Affairs", href: "#" }, { label: "Ministry of Tourism", href: "#" } ] },
        ]}
        copyright="Content managed by Bureau of Immigration, Ministry of Home Affairs. Designed & developed by NIC."
        policyLinks={[
          { label: "Privacy policy", href: "#" }, { label: "Terms of use", href: "#" },
          { label: "Accessibility statement", href: "#" }, { label: "Sitemap", href: "#" } ]}
      />
    </>
  );
}
