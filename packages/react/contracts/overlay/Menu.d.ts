import * as React from "react";

export interface MenuItem {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

/** UX4G Menu — a dropdown list of actions anchored to a trigger element. Click-outside and item-click close it. */
export interface MenuProps {
  trigger: React.ReactElement;
  items: MenuItem[];
  align?: "left" | "right";
}

export declare function Menu(props: MenuProps): JSX.Element;
export default Menu;
