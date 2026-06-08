import * as React from "react";

export interface ListItemData {
  leading?: React.ReactNode;
  overline?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
}

/**
 * UX4G List — a vertical list of rows, each with optional leading/trailing
 * slots and one to three lines of text (overline / title / description).
 * Supports dividers, hover interactivity, an active row and a trailing chevron.
 *
 * @startingPoint section="Data" subtitle="Row list with leading icon, text and trailing meta" viewport="560x360"
 */
export interface ListProps {
  items: ListItemData[];
  dividers?: boolean;
  interactive?: boolean;
  bordered?: boolean;
  chevron?: boolean;
}

export declare function List(props: ListProps): JSX.Element;
export default List;
