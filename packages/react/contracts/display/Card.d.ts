import * as React from "react";

/**
 * UX4G Card — surface container with optional header / media / footer slots.
 *
 * @startingPoint section="Display" subtitle="Bordered surface with shadow, header & actions" viewport="700x300"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Media node rendered in a 16:9 frame at the top. */
  media?: React.ReactNode;
  footer?: React.ReactNode;
  /** Right-aligned action row (e.g. Buttons). */
  actions?: React.ReactNode;
  /** Inner padding in px. @default 20 */
  padding?: number;
  /** Adds hover affordance. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
export default Card;
