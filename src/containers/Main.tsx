import React, { Suspense, lazy, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  HashRouter,
  useLocation,
} from "react-router-dom";
import Header from "../components/header/Header";
import Home from "../pages/home/HomeComponent";
import Error from "../pages/error/Error";
import GoToTop from "../components/goToTop/goToTop";
import Loading from "./loading/Loading";
import ReactGA from "react-ga4";

// Split per route so the home page does not ship reCAPTCHA, Formspree and Bootstrap;
// prefetched once the browser is idle, so the first visit doesn't wait on the network
const ContactComponent = lazy(
  () => import(/* webpackPrefetch: true */ "../pages/contact/ContactComponent")
);
const AboutComponent = lazy(
  () => import(/* webpackPrefetch: true */ "../pages/about/AboutComponent")
);
const Patents = lazy(
  () => import(/* webpackPrefetch: true */ "../pages/patents/Patents")
);

export interface RouteConfig {
  code: string;
  title: string;
  titleAccent: string; // end of the title, in the accent gradient
  description: string;
}
const notfound: RouteConfig = {
  code: "404",
  title: "Whoops,",
  titleAccent: "page not found.",
  description: "The requested page is unavailable.",
};

function PageViewTracker(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const path = `${pathname}${search}`;
    // HashRouter routes live in the fragment, which GA4 drops from the page path
    const url = new URL(path, window.location.origin);
    // UTM/gclid params sit before the hash and drive campaign attribution
    new URLSearchParams(window.location.search).forEach((value, key) =>
      url.searchParams.set(key, value)
    );
    ReactGA.send({
      hitType: "pageview",
      page: path,
      location: url.href,
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
        {/* Outside the routes and Suspense, so the bar stays put while pages swap and load */}
        <Header />
        <GoToTop>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Old links and bookmarks, so home has one address (and its nav link highlights) */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<AboutComponent />} />
              <Route path="/contact" element={<ContactComponent />} />
              <Route path="/patents" element={<Patents />} />
              <Route path="*" element={<Error {...notfound} />} />
            </Routes>
          </Suspense>
        </GoToTop>
      </HashRouter>
    </>
  );
}
