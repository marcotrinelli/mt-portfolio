import React from "react";
import "./Skills.css";
import { illustration, skillsSection } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import codingPersonDark from "../../assets/lottie/codingPersonDark.json";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import { useTheme } from "styled-components";

export default function Skills(): JSX.Element | null {
  const theme = useTheme();

  if (!skillsSection.display) {
    return null;
  }
  return (
    <div className={"main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={codingPersonDark} />
            ) : (
              <img
                alt="Man Working"
                src={require("../../assets/images/developerActivity.svg")}
              ></img>
            )}
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-text-div">
            <h1 className={"skills-heading"} style={{ color: theme.title }}>
              {skillsSection.title}{" "}
            </h1>
            <p
              className={"subTitle skills-text-subtitle"}
              style={{ color: theme.text }}
            >
              {skillsSection.subTitle}
            </p>
            <div>
              {skillsSection.skills.map((skills, i: number) => {
                return (
                  <p
                    key={i}
                    className={"subTitle skills-text"}
                    style={{ color: theme.text }}
                  >
                    {skills}
                  </p>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
