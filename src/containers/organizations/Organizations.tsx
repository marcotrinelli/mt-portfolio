import React from "react";
import "./Organizations.css";
import { Fade } from "react-awesome-reveal";
import OrganizationList from "../../components/organizationList/OrganizationList";
import { useTheme } from "styled-components";

export default function Organizations(): JSX.Element {
  const theme = useTheme();
  // TODO: Add organizations data when available
  const organizationsData: any[] = [];

  return (
    <div id="organizations">
      <div className="organizations-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="organizations-header" style={{ color: theme.text }}>
            Organizations
          </h1>
        </Fade>
      </div>
      <div className="organizations-body-div">
        {organizationsData.length > 0 ? (
          <OrganizationList logos={organizationsData} />
        ) : (
          <p>No organizations data available</p>
        )}
      </div>
    </div>
  );
}
