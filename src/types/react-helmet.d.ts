declare module "react-helmet" {
  import { Component } from "react";

  interface HelmetProps {
    children?: React.ReactNode;
  }

  class Helmet extends Component<HelmetProps> {}

  export { Helmet };
}
