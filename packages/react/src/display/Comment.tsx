import React from "react";

export interface CommentProps {
  author: React.ReactNode;
  /** Avatar node. Omit to render an initials monogram from `author`. */
  avatar?: React.ReactNode;
  /** Time / meta line next to the author. */
  timestamp?: React.ReactNode;
  /** Comment body. */
  body: React.ReactNode;
  /** Action row (e.g. Reply, Like). */
  actions?: React.ReactNode;
  /** Nested replies — usually more <Comment> elements. */
  children?: React.ReactNode;
  /** Tint + accent for an unread / highlighted comment. */
  highlight?: boolean;
}

function monogram(name: React.ReactNode) {
  const s = typeof name === "string" ? name : "";
  return s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
}

/** UX4G Comment — a single comment / discussion entry: avatar, author + time,
 *  body, an actions row and optional nested replies. */
export function Comment({ author, avatar, timestamp, body, actions, children, highlight = false }: CommentProps) {
  return (
    <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-sans)" }}>
      <div style={{ flexShrink: 0 }}>
        {avatar || (
          <span style={{
            width: 40, height: 40, borderRadius: "var(--radius-full)", background: "var(--color-primary-subtle)",
            color: "var(--color-primary)", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 600,
          }}>{monogram(author)}</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: highlight ? "var(--color-primary-subtle)" : "var(--color-surface-subtle)",
          border: "1px solid " + (highlight ? "var(--violet-200)" : "var(--color-divider)"),
          borderRadius: "var(--radius-lg)", padding: "12px 14px",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", whiteSpace: "nowrap" }}>{author}</span>
            {timestamp && <span style={{ fontSize: 12, color: "var(--color-text-subtle)" }}>{timestamp}</span>}
          </div>
          <div style={{ fontSize: 14, color: "var(--color-text)", lineHeight: 1.55 }}>{body}</div>
        </div>
        {actions && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "8px 6px 0", fontSize: 13, color: "var(--color-text-muted)" }}>{actions}</div>
        )}
        {children && (
          <div style={{ marginTop: 16, paddingLeft: 8, borderLeft: "2px solid var(--color-divider)", display: "flex", flexDirection: "column", gap: 16 }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
