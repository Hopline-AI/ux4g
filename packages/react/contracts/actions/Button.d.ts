import * as React from "react";

/**
 * UX4G Button — primary call-to-action.
 *
 * @startingPoint section="Actions" subtitle="Filled / outlined / text / tonal in 3 colourways" viewport="700x220"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Colourway. @default "primary" */
  variant?: "primary" | "success" | "danger";
  /** Fill treatment. @default "filled" */
  appearance?: "filled" | "outlined" | "text" | "tonal";
  /** @default "default" */
  size?: "small" | "default" | "large";
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Leading icon node (e.g. a Material Symbols <span>). */
  iconLeft?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
export default Button;
