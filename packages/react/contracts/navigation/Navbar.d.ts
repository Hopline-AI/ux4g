import * as React from "react";

/**
 * UX4G Navbar — government website header. Renders an optional Government of
 * India utility strip, a brand lockup (UX4G mark by default), primary
 * navigation with an active state, and a right-aligned actions slot. Includes a
 * keyboard skip-link and 44px nav targets.
 *
 * @startingPoint section="Navigation" subtitle="Government website header with utility strip + nav" viewport="1280x140"
 */
export interface NavbarProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  /** `true` = default gov strip; or pass custom node. */
  topStrip?: React.ReactNode | boolean;
  sticky?: boolean;
}

export interface NavLink {
  label: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export declare function Navbar(props: NavbarProps): JSX.Element;
export default Navbar;
