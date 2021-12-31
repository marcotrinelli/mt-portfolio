import React from "react";
import "./Project.css";
import Button from "../../components/button/Button";
import { bigProjects, greeting } from "../../portfolio";
import { useTheme } from "styled-components";

export default function Projects(): JSX.Element {
  const theme = useTheme();

  return (
    <div className="main" id="projects">
      <h1 className="project-title" style={{ color: theme.text }}>
        {bigProjects.title}
      </h1>
      <div className="repo-cards-div-main">
        {bigProjects.projects.map((project, index: number) => {
          return (
            <div key={index} className="project-card">
              <h3>{project.projectName}</h3>
              <p>{project.projectDesc}</p>
              {project.footerLink?.map((link, linkIndex: number) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          );
        })}
      </div>
      <Button
        text={"More Projects"}
        className="project-button"
        to={greeting.githubProfile || "/projects"}
        theme={theme}
      />
    </div>
  );
}
