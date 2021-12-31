import React from "react";
import "./ProjectLanguages.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Project languages props
export interface ProjectLanguagesProps {
  logos: Array<{
    name: string;
    iconifyClass: string;
    style?: React.CSSProperties;
  }>;
  theme?: any;
  className?: string;
}

const ProjectLanguages: React.FC<ProjectLanguagesProps> = ({ logos }) => {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons-languages">
          {logos.map((logo) => {
            return (
              <OverlayTrigger
                key={logo.name}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>{logo.name}</strong>
                  </Tooltip>
                }
              >
                <li
                  className="software-skill-inline-languages"
                  data-name={logo.name}
                >
                  <span
                    className="iconify"
                    data-icon={logo.iconifyClass}
                    style={logo.style || {}}
                    data-inline="false"
                  ></span>
                </li>
              </OverlayTrigger>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectLanguages;
