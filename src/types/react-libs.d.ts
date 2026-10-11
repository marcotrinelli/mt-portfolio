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
