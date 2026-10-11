import React from "react";
import * as ReactDOM from "react-dom";
import ReactGA from "react-ga4";
import "./index.css";
import "./theme/design.scss";
import App from "./App";

ReactGA.initialize("G-1NGH58Y3DD", {
  testMode: process.env.NODE_ENV !== "production",
  // page_view is sent per route from Main.tsx
  gtagOptions: { send_page_view: false },
});

ReactDOM.render(<App />, document.getElementById("root"));
