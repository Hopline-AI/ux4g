import * as React from "react";

export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  render?: (row: Row) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | string;
}

/**
 * UX4G Table — simple, scannable data table from `columns` + `rows`.
 *
 * @startingPoint section="Data" subtitle="Column-driven data table with header" viewport="700x320"
 */
export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  rows: Row[];
  striped?: boolean;
  hover?: boolean;
  empty?: React.ReactNode;
}

export declare function Table<Row = any>(props: TableProps<Row>): JSX.Element;
export default Table;
