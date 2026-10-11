import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHero from "../../components/pageHero/PageHero";
import Button from "../../components/button/Button";
import { RouteConfig } from "../../containers/Main";
import "./Error.css";

export default function Error({
  code,
  title,
  titleAccent,
  description,
}: RouteConfig): JSX.Element {
  return (
    <div className="error-page">
      <Header pageTitle="Page not found" />
      <PageHero
        eyebrow={`Error ${code}`}
        title={title}
        titleAccent={titleAccent}
        lede={description}
        media={
          <span className="metric-value error-code" aria-hidden="true">
            {code}
          </span>
        }
        mediaFirst
      >
        <div className="page-actions">
          <Button text="Back to home" to="/" />
          <Button text="Get in touch" to="/contact" variant="secondary" />
        </div>
      </PageHero>
      <Footer />
    </div>
  );
}
