import * as React from "react";

/** UX4G Toast — transient notification card with a coloured accent bar. Stack in a fixed corner viewport. */
export interface ToastProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

export declare function Toast(props: ToastProps): JSX.Element;
export default Toast;
