import * as React from "react";

/** UX4G Select — native dropdown styled to match Input. Needs the Material Symbols font for its chevron. */
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  placeholder?: string;
  /** Options as strings or {value,label}. Or pass <option> children. */
  options?: (string | SelectOption)[];
  /** @default "default" */
  size?: "small" | "default" | "large";
  /** @default "default" */
  state?: "default" | "error" | "success";
  required?: boolean;
}

export declare function Select(props: SelectProps): JSX.Element;
export default Select;
