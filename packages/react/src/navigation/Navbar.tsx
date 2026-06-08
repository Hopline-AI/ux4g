import React from "react";

export interface NavLink {
  label: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavbarProps {
  /** Site / department title shown next to the mark. */
  title: React.ReactNode;
  /** Optional second line under the title. */
  subtitle?: React.ReactNode;
  /** Brand mark. Defaults to the UX4G wordmark. */
  logo?: React.ReactNode;
  /** Primary navigation links. */
  links?: NavLink[];
  /** Right-aligned slot — buttons, login, language, etc. */
  actions?: React.ReactNode;
  /** Government utility strip above the bar. `true` renders the default
   *  "Government of India" strip; pass a node to customise. */
  topStrip?: React.ReactNode | boolean;
  /** Stick to the top of the viewport on scroll. @default false */
  sticky?: boolean;
}

const UX4GMark = (
  <svg viewBox="0 0 55 15" height="22" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0.296 0.436)" fill="#1937B2"><path d="M 8.145 0 L 11.882 0 L 11.882 8.945 C 11.882 10.009 11.631 10.93 11.129 11.707 C 10.632 12.48 9.937 13.077 9.046 13.5 C 8.154 13.918 7.119 14.127 5.941 14.127 C 4.754 14.127 3.714 13.918 2.823 13.5 C 1.931 13.077 1.237 12.48 0.739 11.707 C 0.246 10.93 0 10.009 0 8.945 L 0 0 L 3.737 0 L 3.737 8.618 C 3.737 9.05 3.831 9.436 4.019 9.777 C 4.207 10.114 4.467 10.377 4.798 10.568 C 5.134 10.759 5.515 10.855 5.941 10.855 C 6.371 10.855 6.752 10.759 7.083 10.568 C 7.415 10.377 7.675 10.114 7.863 9.777 C 8.051 9.436 8.145 9.05 8.145 8.618 L 8.145 0 Z M 17.663 0 L 19.921 4.064 L 20.029 4.064 L 22.313 0 L 26.48 0 L 22.367 6.982 L 26.641 13.964 L 22.367 13.964 L 20.029 9.818 L 19.921 9.818 L 17.582 13.964 L 13.335 13.964 L 17.555 6.982 L 13.469 0 L 17.663 0 Z" fillRule="nonzero" /></g>
    <g transform="translate(28.28 0.245)" fill="#A066CC"><path d="M 0 11.973 L 0 9.027 L 5.538 0.191 L 8.172 0.191 L 8.172 4.118 L 6.667 4.118 L 3.683 8.918 L 3.683 9.027 L 11.855 9.027 L 11.855 11.973 L 0 11.973 Z M 6.694 14.155 L 6.694 11.073 L 6.774 9.791 L 6.774 0.191 L 10.269 0.191 L 10.269 14.155 L 6.694 14.155 Z M 22.334 4.8 C 22.275 4.559 22.184 4.348 22.058 4.166 C 21.933 3.98 21.776 3.823 21.588 3.695 C 21.404 3.564 21.189 3.466 20.943 3.402 C 20.701 3.334 20.434 3.3 20.143 3.3 C 19.516 3.3 18.98 3.452 18.537 3.757 C 18.098 4.061 17.762 4.5 17.529 5.073 C 17.3 5.645 17.186 6.336 17.186 7.145 C 17.186 7.964 17.296 8.664 17.515 9.245 C 17.735 9.827 18.062 10.273 18.496 10.582 C 18.931 10.891 19.471 11.045 20.116 11.045 C 20.685 11.045 21.158 10.961 21.534 10.793 C 21.915 10.625 22.199 10.386 22.387 10.077 C 22.576 9.768 22.67 9.405 22.67 8.986 L 23.315 9.055 L 20.17 9.055 L 20.17 6.355 L 26.272 6.355 L 26.272 8.291 C 26.272 9.564 26.005 10.652 25.472 11.557 C 24.943 12.457 24.213 13.148 23.281 13.63 C 22.354 14.107 21.29 14.345 20.089 14.345 C 18.749 14.345 17.573 14.057 16.561 13.48 C 15.548 12.902 14.758 12.08 14.189 11.011 C 13.624 9.943 13.342 8.673 13.342 7.2 C 13.342 6.045 13.514 5.023 13.859 4.132 C 14.209 3.241 14.693 2.489 15.311 1.875 C 15.929 1.257 16.644 0.791 17.455 0.477 C 18.266 0.159 19.135 0 20.062 0 C 20.878 0 21.635 0.118 22.334 0.355 C 23.037 0.586 23.658 0.918 24.195 1.35 C 24.737 1.777 25.174 2.284 25.506 2.87 C 25.837 3.457 26.039 4.1 26.111 4.8 L 22.334 4.8 Z" fillRule="nonzero" /></g>
  </svg>
);

const DefaultStrip = (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 14, height: 10, borderRadius: 1, overflow: "hidden", display: "inline-flex", flexDirection: "column", boxShadow: "0 0 0 0.5px var(--color-border)" }}>
      <span style={{ flex: 1, background: "#FF9933" }} />
      <span style={{ flex: 1, background: "#fff" }} />
      <span style={{ flex: 1, background: "#138808" }} />
    </span>
    <span>Government of India</span>
  </div>
);

/** UX4G Navbar — government website header: optional gov utility strip,
 *  brand lockup, primary nav and an actions slot. */
export function Navbar({ title, subtitle, logo, links = [], actions, topStrip, sticky = false }: NavbarProps) {
  return (
    <header style={{
      fontFamily: "var(--font-sans)", background: "var(--color-surface)",
      borderBottom: "1px solid var(--color-border)", position: sticky ? "sticky" : "relative",
      top: sticky ? 0 : undefined, zIndex: 50, width: "100%",
    }}>
      {/* Accessible skip link: visually hidden (clipped) until it receives
          keyboard focus, so it stays hidden wherever the header sits on the
          page (a top:-48px offset only hides it when the bar is page-top). */}
      <a href="#main" style={{
        position: "absolute", left: 12, top: 8, zIndex: 60,
        width: 1, height: 1, padding: 0, overflow: "hidden", clipPath: "inset(50%)",
        background: "var(--color-primary)", color: "#fff", borderRadius: "var(--radius-md)",
        fontSize: 14, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap",
      }}
        onFocus={(e) => { const s = e.currentTarget.style; s.width = "auto"; s.height = "auto"; s.padding = "8px 16px"; s.overflow = "visible"; s.clipPath = "none"; }}
        onBlur={(e) => { const s = e.currentTarget.style; s.width = "1px"; s.height = "1px"; s.padding = "0"; s.overflow = "hidden"; s.clipPath = "inset(50%)"; }}>Skip to main content</a>

      {topStrip ? (
        <div style={{
          background: "var(--color-surface-subtle)", borderBottom: "1px solid var(--color-divider)",
          fontSize: 12.5, color: "var(--color-text-muted)", letterSpacing: 0.2,
        }}>
          <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "7px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            {topStrip === true ? DefaultStrip : topStrip}
          </div>
        </div>
      ) : null}

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", gap: 28 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ display: "inline-flex" }}>{logo || UX4GMark}</span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>{title}</span>
            {subtitle && <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{subtitle}</span>}
          </span>
        </a>

        {links.length > 0 && (
          <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
            {links.map((l, i) => (
              <a key={i} href={l.href || "#"} onClick={l.onClick} aria-current={l.active ? "page" : undefined}
                style={{
                  position: "relative", padding: "8px 14px", minHeight: 44, display: "inline-flex", alignItems: "center",
                  fontSize: 15, fontWeight: l.active ? 600 : 500, borderRadius: "var(--radius-md)",
                  color: l.active ? "var(--color-primary)" : "var(--color-text)",
                  background: l.active ? "var(--color-primary-subtle)" : "transparent",
                  textDecoration: "none", transition: "background var(--duration-fast), color var(--duration-fast)", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!l.active) (e.currentTarget as HTMLElement).style.background = "var(--neutral-100)"; }}
                onMouseLeave={(e) => { if (!l.active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {actions}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
