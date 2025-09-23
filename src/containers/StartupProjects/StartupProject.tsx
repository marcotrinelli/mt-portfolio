import React from "react";
import "./StartupProjects.scss";
import { bigProjects } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import Button from "../../components/button/Button";
import { useTheme } from "styled-components";
import NoTranslate from "../../components/notranslate/notranslate";

export default function StartupProject(): JSX.Element | null {
  const theme = useTheme();

  function openUrlInNewTab(url: string): void {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank");
    win?.focus();
  }

  if (!bigProjects.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading" style={{ color: theme.title }}>
            {bigProjects.title}
          </h1>

          <div className="projects-container">
            {bigProjects.projects.map((project, i: number) => {
              return (
                <div
                  key={i}
                  className={"project-card"}
                  style={{
                    backgroundColor: theme.paperbg,
                    boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`,
                  }}
                >
                  {project.image ? (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="card-image"
                      ></img>
                    </div>
                  ) : null}
                  <div className="project-detail">
                    <NoTranslate>
                      <h5
                        className={"card-title"}
                        style={{ color: theme.text }}
                      >
                        {project.projectName}
                      </h5>
                    </NoTranslate>
                    <p
                      className={"card-subtitle"}
                      style={{ color: theme.text }}
                    >
                      {project.projectDesc}
                    </p>
                    {project.footerLink ? (
                      <div className="project-card-footer">
                        {project.footerLink?.map((link, i: number) => {
                          return (
                            <span
                              key={i}
                              className={"project-tag"}
                              style={{ color: theme.text }}
                              onClick={() => openUrlInNewTab(link.url)}
                            >
                              {link.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <Button text="See more" to="/patents" theme={theme} />
      </div>
    </Fade>
  );
}
