import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
import CompetitiveSites from "../../components/competitiveSites/CompetitiveSites";
import EducationImg from "./EducationImg";
import { competitiveSites } from "../../portfolio";
import "./EducationComponent.css";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "styled-components";

export default function EducationComponent(): JSX.Element {
  const theme = useTheme();
  
  return (
    <div className="education-main">
      <Header />
      <div className="basic-education">
        <Fade bottom duration={2000} distance="40px">
          <div className="heading-div">
            <div className="heading-img-div">
              <EducationImg />
            </div>
            <div className="heading-text-div">
              <h1 className="heading-text" style={{ color: theme.text }}>
                Education
              </h1>
              <h3 className="heading-sub-text" style={{ color: theme.text }}>
                Basic Qualification and Certifications
              </h3>
              <CompetitiveSites logos={competitiveSites["competitiveSites"]} />
            </div>
          </div>
        </Fade>
        <Educations />
        <Certifications />
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}