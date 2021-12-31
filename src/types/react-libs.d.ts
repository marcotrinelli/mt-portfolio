declare module "react-headroom" {
  import { Component } from "react";

  interface HeadroomProps {
    style?: React.CSSProperties;
    onPin?: () => void;
    onUnpin?: () => void;
    children?: React.ReactNode;
  }

  class Headroom extends Component<HeadroomProps> {}

  export default Headroom;
}

declare module "react-awesome-reveal" {
  import { Component } from "react";

  interface FadeProps {
    children?: React.ReactNode;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    duration?: number;
    distance?: string;
    delay?: number;
    cascade?: boolean;
  }

  interface SlideProps {
    children?: React.ReactNode;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    duration?: number;
    distance?: string;
    delay?: number;
    cascade?: boolean;
  }

  class Fade extends Component<FadeProps> {}
  class Slide extends Component<SlideProps> {}

  export { Fade, Slide };
}

declare module "colorthief" {
  class ColorThief {
    getColor(img: HTMLImageElement): number[];
    getPalette(img: HTMLImageElement, colorCount?: number): number[][];
  }

  export default ColorThief;
}
