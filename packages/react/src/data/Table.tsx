import React from "react";

export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer. Defaults to row[key]. */
  render?: (row: Row) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | string;
}

export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Zebra striping. @default false */
  striped?: boolean;
  /** Highlight row on hover. @default true */
  hover?: boolean;
  /** Render when rows is empty. */
  empty?: React.ReactNode;
}

/** UX4G Table — simple data table. Provide columns + rows. */
export function Table({ columns, rows, striped = false, hover = true, empty }: TableProps) {
  return (
    <div style={{ width: "100%", overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || "left", padding: "12px 16px", width: c.width,
                fontSize: 12, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase",
                color: "var(--color-text-muted)", background: "var(--neutral-50)",
                borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap",
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: 32, textAlign: "center", color: "var(--color-text-muted)", fontSize: 14 }}>{empty || "No records"}</td></tr>
          ) : rows.map((row, ri) => (
            <tr key={ri} className={hover ? "ux-trow" : undefined}
              style={{ background: striped && ri % 2 ? "var(--neutral-50)" : "transparent", transition: "background var(--duration-fast)" }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  textAlign: c.align || "left", padding: "12px 16px", fontSize: 14, color: "var(--color-text)",
                  borderBottom: ri === rows.length - 1 ? "none" : "1px solid var(--color-divider)",
                }}>{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
