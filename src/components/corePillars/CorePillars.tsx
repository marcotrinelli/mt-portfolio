import React from "react";

import { skillsSection } from "../../portfolio";
import "./CorePillars.css";

export default function CorePillars(): JSX.Element {
  return (
    <ul className="core-pillars">
      {skillsSection.pillars.map((pillar) => (
        <li key={pillar.title} className="core-pillar surface-card">
          <h3>
            <pillar.icon aria-hidden="true" />
            {pillar.title}
          </h3>
          <p>{pillar.desc}</p>
        </li>
      ))}
    </ul>
  );
}
