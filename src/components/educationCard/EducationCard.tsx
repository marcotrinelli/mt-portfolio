import React, { createRef } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import "./EducationCard.scss";
import { useTheme } from "styled-components";

interface School {
  schoolName: string;
  logo: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

interface EducationCardProps {
  school: School;
}

const EducationCard: React.FC<EducationCardProps> = ({ school }) => {
  const imgRef = createRef<HTMLImageElement>();
  const theme = useTheme();

  if (!school.logo) {
    console.error(
      `Image of ${school.schoolName} is missing in education section`
    );
  }

  return (
    <div>
      <Fade left duration={1000}>
        <div className="education-card">
          <div className="education-card-left">
            <img
              crossOrigin="anonymous"
              ref={imgRef}
              className="education-roundedimg"
              style={{
                boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`,
              }}
              src={school.logo}
              alt={school.schoolName}
            />
          </div>
          <div className="education-card-right">
            <h5 className="education-text-school">{school.schoolName}</h5>

            <div className="education-text-details">
              <h5
                className="education-text-subHeader"
                style={{ color: theme.text }}
              >
                {school.subHeader}
              </h5>
              <p
                className="education-text-duration"
                style={{ color: theme.text }}
              >
                {school.duration}
              </p>
              <p className="education-text-desc">{school.desc}</p>
              <div className="education-text-bullets">
                <ul>
                  {school.descBullets?.map((item, i) => (
                    <li key={i} className="subTitle">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <Slide left duration={2000}>
        <div className="education-card-border"></div>
      </Slide>
    </div>
  );
};

export default EducationCard;
