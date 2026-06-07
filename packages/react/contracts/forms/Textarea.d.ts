import * as React from "react";

/** UX4G Textarea — multi-line text field with label, helper & validation. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  /** @default "default" */
  state?: "default" | "error" | "success";
  required?: boolean;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
export default Textarea;
