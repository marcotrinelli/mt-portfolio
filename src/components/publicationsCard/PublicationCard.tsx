import React from "react";
import "./PublicationCard.css";
import { Fade } from "react-awesome-reveal";
import { Theme } from "../../theme/Themes";

// Publication card props
export interface PublicationCardProps {
  repo: {
    id: string;
    name: string;
    description: string;
    url: string;
    createdAt: string;
  };
  theme: Theme;
  className?: string;
}

const GithubRepoCard: React.FC<PublicationCardProps> = ({ repo, theme }) => {
  if (!theme) return null;
  function openRepoinNewTab(url: string): void {
    const win = window.open(url, "_blank");
    win?.focus();
  }

  return (
    <div>
      <Fade bottom duration={2000} distance="40px">
        <div
          className="publication-card-div"
          key={repo.id}
          onClick={() => openRepoinNewTab(repo.url)}
          style={{ backgroundColor: theme.highlight }}
        >
          <div className="publication-name-div">
            <p className="publication-name" style={{ color: theme.text }}>
              {repo.name}
            </p>
          </div>
          <p className="publication-description" style={{ color: theme.text }}>
            {repo.description}
          </p>
          <div className="publication-details">
            <p
              className="publication-creation-date subTitle"
              style={{ color: theme.secondaryText }}
            >
              Published on {repo.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default GithubRepoCard;
