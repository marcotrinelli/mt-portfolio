import React from "react";
import "./IssueCard.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

// Issue card props
export interface IssueCardProps {
  issue: {
    title: string;
    url: string;
    number: number;
    closed: boolean;
    createdAt: string;
    assignees: {
      nodes: Array<{
        name: string;
        url: string;
        avatarUrl: string;
      }>;
    };
    repository: {
      name: string;
      url: string;
      owner: {
        login: string;
        url: string;
        avatarUrl: string;
      };
    };
  };
  theme?: any;
  className?: string;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const iconPR =
    issue.closed === false
      ? {
          iconifyClass: "octicon:issue-opened",
          style: { color: "#28a745" },
        }
      : {
          iconifyClass: "octicon:issue-closed",
          style: { color: "#d73a49" },
        };

  const bgColor = issue.closed === false ? "#dcffe4" : "#ffdce0";
  const subtitleString =
    "#" + issue.number + " opened on " + issue.createdAt.split("T")[0];

  let assignee: React.ReactNode;
  if (issue.assignees.nodes.length > 0) {
    const assigneeData = issue.assignees.nodes[0];
    assignee = (
      <OverlayTrigger
        key={assigneeData.name}
        placement={"top"}
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>{`Assigned to ${assigneeData.name}`}</strong>
          </Tooltip>
        }
      >
        <a href={assigneeData.url} target="_blank" rel="noopener noreferrer">
          <img
            className="assigned-to-img"
            src={assigneeData.avatarUrl}
            alt=""
          />
        </a>
      </OverlayTrigger>
    );
  } else {
    assignee = null;
  }

  return (
    <Fade bottom duration={2000} distance="40px">
      <div
        className="issue-card"
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${iconPR.style.color}`,
        }}
      >
        <div className="issue-top">
          <div className="issue-header">
            <span
              className="iconify issue-icons"
              data-icon={iconPR.iconifyClass}
              style={iconPR.style}
              data-inline="false"
            ></span>
            <div className="issue-title-header">
              <p className="issue-title">
                <a href={issue.url} target="_blank" rel="noopener noreferrer">
                  {issue.title}
                </a>
              </p>
              <p className="issue-subtitle">{subtitleString}</p>
            </div>
          </div>
        </div>
        <div className="issue-down">
          <div className="assignee-repo">
            <p className="parent-repo">
              Repository:{" "}
              <a
                style={{ color: iconPR.style.color }}
                href={issue.repository.url}
              >
                {issue.repository.owner.login}/{issue.repository.name}
              </a>
            </p>
            <div className="assignee-info">{assignee}</div>
          </div>
          <div className="owner-img-div">
            <a
              href={issue.repository.owner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="owner-img"
                src={issue.repository.owner.avatarUrl}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default IssueCard;
