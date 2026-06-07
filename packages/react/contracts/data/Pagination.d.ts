import * as React from "react";

/** UX4G Pagination — 1-indexed page navigation for tables/lists, with truncation (…). */
export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  siblings?: number;
}

export declare function Pagination(props: PaginationProps): JSX.Element;
export default Pagination;
