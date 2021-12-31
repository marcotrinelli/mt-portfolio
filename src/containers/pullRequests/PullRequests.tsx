import React from "react";
import "./PullRequests.css";
import { Fade } from "react-awesome-reveal";
import PullRequestCard from "../../components/pullRequestCard/PullRequestCard";
import { useTheme } from "styled-components";

export default function PullRequests(): JSX.Element {
  const theme = useTheme();
  // TODO: Add pull requests data when available
  const pullRequestsData: any[] = [];

  return (
    <div>
      <div className="pull-requests-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="pull-requests-header" style={{ color: theme.text }}>
            Pull Requests
          </h1>
        </Fade>
      </div>
      <div className="pull-request-body-div">
        {pullRequestsData.length > 0 ? (
          pullRequestsData.map((pullRequest: any, index: number) => {
            return <PullRequestCard key={index} pullRequest={pullRequest} />;
          })
        ) : (
          <p>No pull requests data available</p>
        )}
      </div>
    </div>
  );
}
