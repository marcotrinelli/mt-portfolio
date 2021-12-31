import React from "react";
import "./SoftwareSkill.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Software skill props
export interface SoftwareSkillListProps {
  logos: Array<{
    skillName: string;
    fontAwesomeClassname: string;
    style?: React.CSSProperties;
  }>;
  theme?: any;
  className?: string;
}

const SoftwareSkill: React.FC<SoftwareSkillListProps> = ({ logos }) => {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {logos.map((logo) => {
            return (
              <OverlayTrigger
                key={logo.skillName}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>{logo.skillName}</strong>
                  </Tooltip>
                }
              >
                <li
                  className="software-skill-inline"
                  data-name={logo.skillName}
                >
                  <span
                    className="iconify"
                    data-icon={logo.fontAwesomeClassname}
                    style={logo.style}
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

export default SoftwareSkill;
