import React from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard";
import { degrees } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "styled-components";

export default function Educations(): JSX.Element {
  const theme = useTheme();
  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="educations-header" style={{ color: theme.text }}>
            Degrees Received
          </h1>
        </Fade>
      </div>
      <div className="educations-body-div">
        {degrees.degrees.map((degree, index: number) => {
          return <DegreeCard key={index} degree={degree} theme={theme} />;
        })}
      </div>
    </div>
  );
}
