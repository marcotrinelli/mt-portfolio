import React, { useState } from "react";
import ReactGA from "react-ga4";

import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import PageHero from "../../components/pageHero/PageHero";
import Portrait from "../../components/portrait/Portrait";
import Statement from "../../components/statement/Statement";
import CorePillars from "../../components/corePillars/CorePillars";
import Timeline from "../../components/timeline/Timeline";
import Footer from "../../components/footer/Footer";
import { aboutHeader, greeting, hobbieSection, journey } from "../../portfolio";
import "./About.scss";

const Hobbies = (): JSX.Element => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="page-section reveal-on-scroll" id="hobbies">
      <h2 className="page-section-title">{hobbieSection.title}</h2>
      <div className="chip-list">
        {hobbieSection.hobbiesCards.map((card, i) => (
          <button
            key={card.label}
            type="button"
            className="chip"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            <card.icon aria-hidden="true" />
            {card.label}
          </button>
        ))}
      </div>
      {/* All stacked in one grid cell (so switching never shifts the footer) */}
      <div className="about-hobby-details" aria-live="polite">
        {hobbieSection.hobbiesCards.map((card, i) => (
          <p
            key={card.label}
            className={`about-hobby-detail${
              i === selected ? " is-active" : ""
            }`}
            aria-hidden={i !== selected}
          >
            {card.subtitle}
          </p>
        ))}
      </div>
    </section>
  );
};

const AboutComponent = (): JSX.Element => {
  return (
    <div>
      <Header pageTitle={aboutHeader.title} />
      <PageHero
        eyebrow={aboutHeader.title}
        title={aboutHeader.headline}
        titleAccent={aboutHeader.headlineAccent}
        lede={aboutHeader.lede}
        media={<Portrait />}
        mediaFirst
      >
        <div className="page-actions">
          {greeting.resumeLink && (
            <Button
              text="Download CV"
              to={greeting.resumeLink}
              external
              onClick={() => ReactGA.event("cv_download", { source: "about" })}
            />
          )}
          <Button text="Get in touch" to="/contact" variant="secondary" />
        </div>
      </PageHero>
      <section className="page-section">
        <Statement text={aboutHeader.statement} />
        <div className="about-principles reveal-on-scroll">
          {aboutHeader.principles.map((principle) => (
            <p key={principle}>{principle}</p>
          ))}
        </div>
      </section>
      <section className="page-section" id="journey">
        <header className="page-section-header reveal-on-scroll">
          <h2 className="page-section-title">{journey.title}</h2>
          <p className="page-section-subtitle">{journey.subtitle}</p>
        </header>
        <Timeline steps={journey.steps} />
      </section>
      <section className="page-section reveal-on-scroll" id="strengths">
        <h2 className="page-section-title">Core strengths</h2>
        <CorePillars />
      </section>
      <Hobbies />
      <Footer />
    </div>
  );
};

export default AboutComponent;
