import * as React from "react";

export interface FeedbackRating { value: number; label: string; }

/**
 * UX4G Feedback Widget — a corner launcher that opens a short feedback form: a
 * 1–5 face rating, optional category chips, a comment field and submit, with a
 * thank-you confirmation. Faces are inline SVG (no emoji), per UX4G
 * iconography. Set `inline` to embed it in flow instead of fixing to a corner.
 *
 * @startingPoint section="Feedback" subtitle="Floating feedback launcher + rating form" viewport="420x520"
 */
export interface FeedbackWidgetProps {
  position?: "bottom-right" | "bottom-left";
  triggerLabel?: string;
  title?: string;
  prompt?: string;
  ratings?: FeedbackRating[];
  categories?: string[];
  placeholder?: string;
  onSubmit?: (data: { rating: number | null; category?: string; message: string }) => void;
  inline?: boolean;
  defaultOpen?: boolean;
}

export declare function FeedbackWidget(props: FeedbackWidgetProps): JSX.Element;
export default FeedbackWidget;
