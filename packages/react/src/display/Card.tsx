import React from "react";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  media?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  padding?: number;
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * UX4G Card — surface container. 1px border + soft shadow, 12px radius.
 * Compose freely, or use the optional header/media/footer props.
 */
export function Card({
  children, title, subtitle, media, footer, actions,
  padding = 20, interactive = false, className = "", style = {}, ...rest
}: CardProps) {
  return (
    <div className={`ux-card ${className}`}
      style={{
        background: "var(--color-surface)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-s)", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: interactive ? "box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)" : "none",
        cursor: interactive ? "pointer" : "default", ...style,
      }}
      {...rest}
    >
      {media && <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--neutral-100)" }}>{media}</div>}
      {(title || subtitle) && (
        <div style={{ padding: `${padding}px ${padding}px 0` }}>
          {title && <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, color: "var(--color-text)", lineHeight: "24px" }}>{title}</div>}
          {subtitle && <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--color-text-muted)", marginTop: 4, lineHeight: "20px" }}>{subtitle}</div>}
        </div>
      )}
      {children != null && <div style={{ padding }}>{children}</div>}
      {(footer || actions) && (
        <div style={{ padding: `0 ${padding}px ${padding}px`, marginTop: "auto", display: "flex", alignItems: "center", justifyContent: actions ? "flex-end" : "flex-start", gap: 8 }}>
          {footer}{actions}
        </div>
      )}
    </div>
  );
}

export default Card;
