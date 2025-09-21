import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import PatentCard from "../../components/patentCard/PatentCard";
import { Fade } from "react-awesome-reveal";
import { greeting, projectsHeader, publicationsHeader, patentsHeader } from "../../portfolio.js";
import patentService from "../../utils/patentService";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patents: [],
            patentsLoading: true,
            patentsError: null
        };
    }

    componentDidMount() {
        this.fetchPatents();
    }

    async fetchPatents() {
        try {
            this.setState({ patentsLoading: true, patentsError: null });
            const patentData = await patentService.fetchPatentsByInventor("Marco Trinelli");
            
            // If no patents found from API, use fallback data
            if (patentData.patents.length === 0) {
                const fallbackData = patentService.getFallbackPatentData();
                this.setState({ 
                    patents: fallbackData.patents,
                    patentsLoading: false 
                });
            } else {
                this.setState({ 
                    patents: patentData.patents,
                    patentsLoading: false 
                });
            }
        } catch (error) {
            console.error("Failed to fetch patents:", error);
        }
    }

    renderPatentsSection() {
        const { patents, patentsLoading, patentsError } = this.state;
        const { theme } = this.props;

        return (
            <div className="basic-projects">
                <Fade bottom duration={2000} distance="40px">
                    <div className="projects-heading-div">
                        <div className="projects-heading-text-div">
                            <h1
                                className="projects-heading-text"
                                style={{ color: theme?.text || '#000' }}
                            >
                                {patentsHeader.title}
                            </h1>
                            <p
                                className="projects-header-detail-text subTitle"
                                style={{ color: theme?.secondaryText || '#666' }}
                            >
                                {patentsHeader.description}
                            </p>
                            {patentsError && (
                                <p
                                    className="patents-error-message"
                                    style={{ color: "#FF9800", fontStyle: "italic", marginTop: "0.5rem" }}
                                >
                                    {patentsError}
                                </p>
                            )}
                        </div>
                    </div>
                </Fade>
                
                {patentsLoading ? (
                    <div className="patents-loading" style={{ textAlign: "center", padding: "2rem" }}>
                        <p style={{ color: theme?.secondaryText || '#666' }}>Loading patents...</p>
                    </div>
                ) : (
                    <Fade bottom duration={2000} distance="40px">
                        <div className="patents-container">
                            {patents.length > 0 ? (
                                patents.map((patent, index) => (
                                    <PatentCard 
                                        key={patent.applicationNumber || index}
                                        patent={patent} 
                                        theme={theme || {}}
                                    />
                                ))
                            ) : (
                                <div className="no-patents-message" style={{ textAlign: "center", padding: "2rem" }}>
                                    <p style={{ color: theme?.secondaryText || '#666' }}>No patents found.</p>
                                </div>
                            )}
                        </div>
                    </Fade>
                )}
            </div>
        );
    }

    render() {
        const theme = this.props.theme || {};
        return (
            <div className="projects-main">
                <Header theme={theme} />
          

                {/* Patents Section */}
                {this.renderPatentsSection()}

                {/* Publications  */}
                <div className="basic-projects">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="publications-heading-div">
                            <div className="publications-heading-text-div">
                                <h1
                                    className="publications-heading-text"
                                    style={{ color: theme.text || '#000' }}
                                >
                                    {publicationsHeader.title}
                                </h1>
                                <p
                                    className="projects-header-detail-text subTitle"
                                    style={{ color: theme.secondaryText || '#666' }}
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
