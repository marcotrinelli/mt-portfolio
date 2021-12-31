import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-awesome-reveal";
import { greeting, projectsHeader, publicationsHeader } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";

class Projects extends Component {
    render() {
        const theme = this.props.theme;
        return (
            <div className="projects-main">
                <Header theme={theme} />
                <div className="basic-projects">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="projects-heading-div">
                            <div className="projects-heading-img-div">
                                {/* <img
											src={require(`../../assets/images/${projectsHeader["avatar_image_path"]}`)}
											alt=""
										/> */}
                                <ProjectsImg theme={theme} />
                            </div>
                            <div className="projects-heading-text-div">
                                <h1
                                    className="projects-heading-text"
                                    style={{ color: theme.text }}
                                >
                                    {projectsHeader.title}
                                </h1>
                                <p
                                    className="projects-header-detail-text subTitle"
                                    style={{ color: theme.secondaryText }}
                                >
                                    {projectsHeader["description"]}
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>
                <Button
                    text={"More Projects"}
                    className="project-button"
                    to={greeting.githubProfile}
                    theme={theme}
                />

                {/* Publications  */}

                <div className="basic-projects">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="publications-heading-div">
                            <div className="publications-heading-text-div">
                                <h1
                                    className="publications-heading-text"
                                    style={{ color: theme.text }}
                                >
                                    {publicationsHeader.title}
                                </h1>
                                <p
                                    className="projects-header-detail-text subTitle"
                                    style={{ color: theme.secondaryText }}
                                >
                                    {publicationsHeader["description"]}
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>

                <Footer />
                <TopButton />
            </div>
        );
    }
}

export default Projects;
