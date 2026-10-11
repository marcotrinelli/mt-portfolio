import React, { useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import ReactGA from "react-ga4";

import { JourneyStep } from "../../types/portfolio";
import "./Timeline.scss";

// Root stretched far above the viewport and cut at its middle: a step counts as reached once its top
// crosses the middle line, and stays reached when scrolled past (so a fast jump still lands on the right step)
const REACHED_MARGIN = "100000px 0px -50% 0px";

const pad = (n: number): string => `${n}`.padStart(2, "0");

const stepState = (i: number, active: number): string => {
  if (i < active) {
    return "is-past";
  }
  return i === active ? "is-active" : "is-upcoming";
};

const handleLinkClick = (step: JourneyStep): void => {
  ReactGA.event("timeline_click", {
    step_title: step.title,
    link_url: step.link?.url,
  });
};

const StepContent = ({ step }: { step: JourneyStep }): JSX.Element => (
  <>
    <p className="timeline-step-meta">
      <span className="timeline-step-year">{step.year}</span>
      {step.place}
    </p>
    <h3 className="timeline-step-title">{step.title}</h3>
    {step.subtitle && <p className="timeline-step-subtitle">{step.subtitle}</p>}
    <p className="timeline-step-desc">{step.desc}</p>
    {step.metric && (
      <p className="timeline-metric">
        <span className="metric-value">{step.metric.value}</span>
        <span className="caps-label">{step.metric.label}</span>
      </p>
    )}
    {(step.tags || step.link) && (
      <div className="timeline-step-footer">
        {step.tags && (
          <ul className="tag-list" aria-label="Topics">
            {step.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {/* Site paths go through the hash router, everything else opens in a new tab */}
        {step.link &&
          (step.link.url.startsWith("/") ? (
            <Link
              className="text-link"
              to={step.link.url}
              onClick={() => handleLinkClick(step)}
            >
              {step.link.name}
              <FaArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <a
              className="text-link"
              href={step.link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(step)}
            >
              {step.link.name}
              <FaArrowRight aria-hidden="true" />
            </a>
          ))}
      </div>
    )}
  </>
);

export default function Timeline({
  steps,
}: {
  steps: JourneyStep[];
}): JSX.Element {
  const [active, setActive] = useState(0);
  const reached = useRef<boolean[]>([]);
  const current = steps[active];

  const handleStepChange = (i: number, inView: boolean): void => {
    reached.current[i] = inView;
    setActive(Math.max(0, reached.current.lastIndexOf(true)));
  };

  return (
    <div className="timeline">
      {/* Visual echo of the active step, the steps carry the same text for screen readers */}
      <div className="timeline-aside" aria-hidden="true">
        <div className="timeline-aside-sticky">
          {/* Keyed on the value (so the swap animation only replays when it changes) */}
          <span key={current.year} className="metric-value timeline-aside-year">
            {current.year}
          </span>
          <span key={current.place} className="timeline-aside-place">
            {current.place}
          </span>
          <span className="timeline-aside-count">
            {pad(active + 1)} / {pad(steps.length)}
          </span>
        </div>
      </div>
      <ol className="timeline-steps">
        {steps.map((step, i) => (
          <InView
            as="li"
            key={`${step.year}-${step.place}-${step.title}`}
            className={`timeline-step ${stepState(i, active)}`}
            rootMargin={REACHED_MARGIN}
            onChange={(inView) => handleStepChange(i, inView)}
          >
            <StepContent step={step} />
          </InView>
        ))}
      </ol>
    </div>
  );
}
