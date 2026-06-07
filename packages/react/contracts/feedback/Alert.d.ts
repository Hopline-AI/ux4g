import * as React from "react";

/**
 * UX4G Alert — inline status message. Requires Material Symbols for the leading icon.
 *
 * @startingPoint section="Feedback" subtitle="Info / success / warning / danger banners" viewport="700x220"
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "info" */
  variant?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  /** Override the default Material Symbols icon name. */
  icon?: string;
  /** Show a dismiss button and handle it. */
  onClose?: () => void;
  children?: React.ReactNode;
}

export declare function Alert(props: AlertProps): JSX.Element;
export default Alert;
