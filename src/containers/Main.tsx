import React, { useEffect } from "react";
import { Route, Routes, HashRouter, useLocation } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import EducationComponent from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import ContactComponent from "../pages/contact/ContactComponent";
import Patents from "../pages/patents/Patents";
import HobbiesComponent from "../pages/hobbies/HobbiesComponent";
import Error from "../pages/error/Error";
import GoToTop from "../components/goToTop/goToTop";
import ReactGA from "react-ga4";

export interface RouteConfig {
  title: string;
  subtitle: string;
  description: string;
}
const notfound: RouteConfig = {
  title: "Woops",
  subtitle: "404",
  description: "The requested page is unavailable :(",
};

function PageViewTracker(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const path = `${pathname}${search}`;
    // HashRouter routes live in the fragment, which GA4 drops from the page path
    ReactGA.send({
      hitType: "pageview",
      page: path,
      location: `${window.location.origin}${path}`,
      title: document.title,
    });
  }, [pathname, search]);

  return null;
}

export default function Main(): JSX.Element {
  return (
    <>
      <HashRouter>
        <PageViewTracker />
        <GoToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/education" element={<EducationComponent />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/patents" element={<Patents />} />
            <Route path="/hobbies" element={<HobbiesComponent />} />
            <Route path="*" element={<Error {...notfound} />} />
          </Routes>
        </GoToTop>
      </HashRouter>
    </>
  );
}
