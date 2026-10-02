import React from "react";
import * as ReactDOM from "react-dom";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactGA.initialize("G-1NGH58Y3DD", {
  testMode: process.env.NODE_ENV !== "production",
  // page_view is sent per route from Main.tsx
  gtagOptions: { send_page_view: false },
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
