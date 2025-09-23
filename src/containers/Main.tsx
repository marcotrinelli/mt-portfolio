import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
// import EducationComponent from "../pages/education/EducationComponent";
// import Experience from "../pages/experience/Experience";
// import Contact from "../pages/contact/ContactComponent";
import Patents from "../pages/patents/Patents";
import Error from "../pages/error/Error";
import GoToTop from "../components/goToTop/goToTop";

export interface RouteConfig {
  title: string;
  subtitle: string;
  description: string;
}
const wip: RouteConfig = {
  title: "Work in progress",
  subtitle: "",
  description: "This page is not ready yet!",
};

const notfound: RouteConfig = {
  title: "Woops",
  subtitle: "404",
  description: "The requested page is unavailable :(",
};

export default function Main(): JSX.Element {
  return (
    <>
      <HashRouter>
        <GoToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/* <Route
              path="/experience"
              element={<Error {...wip} />}
              element={<Experience theme={this.props.theme} />}
            />
            <Route
              path="/education"
              element={<Error {...wip} />}
              element={<EducationComponent theme={this.props.theme} />}
            /> */}
            <Route
              path="/contact"
              element={<Error {...wip} />}
              // element={<Contact theme={this.props.theme} />}
            />
            <Route
              path="/patents"
              element={<Patents />}
              // element={<Projects theme={this.props.theme} />}
            />
            <Route
              path="/hobbies"
              element={<Error {...wip} />}
              // element={<Projects theme={this.props.theme} />}
            />
            <Route path="*" element={<Error {...notfound} />} />
          </Routes>
        </GoToTop>
      </HashRouter>
    </>
  );
}
