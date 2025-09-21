import React from "react";
import "./OrganizationList.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import { OrganizationListProps } from "../../types/components";

const OrganizationList: React.FC<OrganizationListProps> = ({ logos }) => {
  return (
    <div className="organizations-main-div">
      <ul className="dev-icons-orgs">
        {logos.map((logo) => {
          return (
            <OverlayTrigger
              key={logo.login}
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  <strong>{logo.login}</strong>
                </Tooltip>
              }
            >
              <li className="organizations-inline" data-name={logo.login}>
                <Fade bottom duration={2000} distance="40px">
                  <img
                    className="organizations-img"
                    src={logo.avatarUrl}
                    alt={logo.login}
                  />
                </Fade>
              </li>
            </OverlayTrigger>
          );
        })}
      </ul>
    </div>
  );
};

export default OrganizationList;
