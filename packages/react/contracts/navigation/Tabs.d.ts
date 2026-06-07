import * as React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Optional leading icon node (e.g. an inline SVG). */
  icon?: React.ReactNode;
  /** Count/badge shown after the label. */
  badge?: React.ReactNode;
  disabled?: boolean;
}

/** UX4G Tabs — underline tab bar. Controlled (`value`) or uncontrolled (`defaultValue`). */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Items as strings or {value,label,icon,badge}. */
  tabs: (string | TabItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
}

export declare function Tabs(props: TabsProps): JSX.Element;
export default Tabs;
