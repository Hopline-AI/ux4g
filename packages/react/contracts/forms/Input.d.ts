import * as React from "react";

/**
 * UX4G Input — single-line text field with label, helper text and validation states.
 *
 * @startingPoint section="Forms" subtitle="Text field with label, helper & validation" viewport="700x320"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  /** @default "default" */
  size?: "small" | "default" | "large";
  /** @default "default" */
  state?: "default" | "error" | "success";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  required?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
export default Input;
