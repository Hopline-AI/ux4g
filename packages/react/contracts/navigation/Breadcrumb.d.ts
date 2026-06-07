import * as React from "react";

export interface CrumbItem { label: React.ReactNode; href?: string; }

/** UX4G Breadcrumb — page hierarchy trail. Last item is the current page. Needs Material Symbols for the separator. */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: CrumbItem[];
}

export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
export default Breadcrumb;
