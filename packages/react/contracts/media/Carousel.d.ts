import * as React from "react";

/**
 * UX4G Carousel — slide deck for hero banners and image galleries. Each child is a slide.
 *
 * @startingPoint section="Media" subtitle="Banner / gallery carousel with arrows & dots" viewport="700x320"
 */
export interface CarouselProps {
  children: React.ReactNode;
  height?: number;
  interval?: number;
  arrows?: boolean;
  dots?: boolean;
}

export declare function Carousel(props: CarouselProps): JSX.Element;
export default Carousel;
