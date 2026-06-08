import * as React from "react";

/**
 * UX4G Comment — a single comment / discussion entry: avatar (or initials
 * monogram), author + timestamp, body, an optional actions row, and nested
 * replies passed as children.
 *
 * @startingPoint section="Display" subtitle="Comment / thread entry with avatar, body and replies" viewport="560x300"
 */
export interface CommentProps {
  author: React.ReactNode;
  avatar?: React.ReactNode;
  timestamp?: React.ReactNode;
  body: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  highlight?: boolean;
}

export declare function Comment(props: CommentProps): JSX.Element;
export default Comment;
