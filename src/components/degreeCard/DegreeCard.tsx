import React from "react";
import "./DegreeCard.css";
import { Fade, Slide } from "react-awesome-reveal";
import { DegreeCardProps } from "../../types/components";

const DegreeCard: React.FC<DegreeCardProps> = ({ degree, theme }) => {
  if (!theme) return null;

  return (
    <div className="degree-card">
      <Slide left duration={2000}>
        <div className="card-img">
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "scale(0.9)",
            }}
            src={require(`../../assets/images/${degree.logo_path}`)}
            alt={degree.alt_name}
          />
        </div>
      </Slide>
      <Fade right duration={2000} distance="40px">
        <div className="card-body">
          <div
            className="body-header"
            style={{ backgroundColor: theme.headerColor }}
          >
            <div className="body-header-title">
              <h2 className="card-title" style={{ color: theme.text }}>
                {degree.title}
              </h2>
              <h3 className="card-subtitle" style={{ color: theme.text }}>
                {degree.subtitle}
              </h3>
            </div>
            <div className="body-header-duration">
              <h3 className="duration" style={{ color: theme.text }}>
                {degree.duration}
              </h3>
            </div>
          </div>
          <div className="body-content">
            {degree.descriptions.map((sentence, index) => {
              return (
                <p
                  key={index}
                  className="content-list"
                  style={{ color: theme.text }}
                >
                  {sentence}
                </p>
              );
            })}
            <a
              href={degree.website_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="visit-btn"
                style={{ backgroundColor: theme.headerColor }}
              >
                <p className="btn" style={{ color: theme.text }}>
                  Visit Website
                </p>
              </div>
            </a>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default DegreeCard;
