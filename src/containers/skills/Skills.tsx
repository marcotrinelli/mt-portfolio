import React from "react";

import Button from "../../components/button/Button";
import CorePillars from "../../components/corePillars/CorePillars";
import Statement from "../../components/statement/Statement";

import "./Skills.css";
import { skillsSection } from "../../portfolio";

export default function Skills(): JSX.Element {
  return (
    <section className="page-section" id="skills">
      <h2 className="page-section-title reveal-on-scroll">
        {skillsSection.title}
      </h2>
      <Statement text={skillsSection.subTitle} />
      <h3 className="caps-label skills-group-label skills-pillars-label reveal-on-scroll">
        Core strengths
      </h3>
      <div className="reveal-on-scroll">
        <CorePillars />
      </div>
      <div className="skills-groups reveal-on-scroll">
        <div>
          <h3 className="caps-label skills-group-label">Tech stack</h3>
          <ul className="tag-list skills-tags">
            {skillsSection.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="caps-label skills-group-label">Languages I speak</h3>
          <ul className="tag-list skills-tags">
            {skillsSection.languages.map(({ name, level }) => (
              <li key={name}>
                {name}
                <span className="skills-language-level">{level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="page-actions skills-actions">
        <Button text="More about me" to="/about" arrow />
      </div>
    </section>
  );
}
