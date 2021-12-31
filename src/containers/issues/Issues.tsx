import React from "react";
import "./Issues.css";
import { Fade } from "react-awesome-reveal";
import IssueCard from "../../components/issueCard/IssueCard";
import { useTheme } from "styled-components";

export default function Issues(): JSX.Element {
  const theme = useTheme();
  // TODO: Add issues data when available
  const issuesData: any[] = [];

  return (
    <div>
      <div className="issues-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="issues-header" style={{ color: theme.text }}>
            Issues
          </h1>
        </Fade>
      </div>
      <div className="issues-body-div">
        {issuesData.length > 0 ? (
          issuesData.map((issue, index: number) => {
            return <IssueCard key={index} issue={issue} />;
          })
        ) : (
          <p>No issues data available</p>
        )}
      </div>
    </div>
  );
}
