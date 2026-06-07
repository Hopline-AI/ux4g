import * as React from "react";

/** UX4G Checkbox — square selection control. Requires Material Symbols for the tick. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
export default Checkbox;
