import React from "react";

import "./Greeting.scss";
import Button from "../../components/button/Button";
import NoTranslate from "../../components/notranslate/notranslate";
import PageHero from "../../components/pageHero/PageHero";
import Portrait from "../../components/portrait/Portrait";
import { greeting, heroFacts } from "../../portfolio";

export default function Greeting(): JSX.Element {
  return (
    <div id="greeting">
      <PageHero
        eyebrow={greeting.role}
        title={greeting.title}
        titleAccent={<NoTranslate>{greeting.username}</NoTranslate>}
        lede={greeting.pitch.split("\n").map((line) => (
          <span key={line} className="greeting-pitch-line">
            {line}
          </span>
        ))}
        media={<Portrait />}
        mediaFirst
        eyebrowBelow
      >
        <ul className="hero-facts">
          {heroFacts.map((fact) => (
            <li key={fact.label} className="hero-fact">
              <span className="metric-value">{fact.value}</span>
              <span className="caps-label">{fact.label}</span>
            </li>
          ))}
        </ul>
        <div className="page-actions">
          <Button text="Get in touch" to="/contact" />
          <Button text="See my patents" to="/patents" variant="secondary" />
        </div>
      </PageHero>
    </div>
  );
}
