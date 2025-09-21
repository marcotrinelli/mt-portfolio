import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import PatentCard from "../../components/patentCard/PatentCard";
import { Fade } from "react-awesome-reveal";
import { publicationsHeader, patentsHeader } from "../../portfolio";
import patentService, { Patent } from "../../utils/patentService";
import { Theme } from "../../theme/Themes";
import "./Projects.css";

interface ProjectsProps {
  theme?: Theme;
}

const Projects: React.FC<ProjectsProps> = ({ theme = {} as Theme }) => {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [patentsLoading, setPatentsLoading] = useState<boolean>(true);
  const [patentsError, setPatentsError] = useState<string | null>(null);

  const fetchPatents = async (): Promise<void> => {
    try {
      setPatentsLoading(true);
      setPatentsError(null);
      const patentData = await patentService.fetchPatentsByInventor(
        "Marco Trinelli"
      );

      // If no patents found from API, use fallback data
      if (patentData.patents.length !== 0) {
        setPatents(patentData.patents);
      }
    } catch (error) {
      console.error("Failed to fetch patents:", error);
      setPatentsError("Failed to load patents. Please try again later.");
    } finally {
      setPatentsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatents();
  }, []);

  const renderPatentsSection = (): JSX.Element => {
    return (
      <div className="basic-projects">
        <Fade top duration={2000}>
          <div className="projects-heading-div">
            <div className="projects-heading-text-div">
              <h1
                className="projects-heading-text"
                style={{ color: theme?.text || "#000" }}
              >
                {patentsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme?.secondaryText || "#666" }}
              >
                {patentsHeader.description}
              </p>
              {patentsError && (
                <p
                  className="patents-error-message"
                  style={{
                    color: "#FF9800",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                  }}
                >
                  {patentsError}
                </p>
              )}
            </div>
          </div>
        </Fade>

        {patentsLoading ? (
          <div
            className="patents-loading"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <p style={{ color: theme?.secondaryText || "#666" }}>
              Loading patents...
            </p>
          </div>
        ) : (
          <Fade top duration={2000}>
            <div className="patents-container">
              {patents.length > 0 ? (
                patents.map((patent, index) => (
                  <PatentCard key={index} patent={patent} theme={theme} />
                ))
              ) : (
                <div
                  className="no-patents-message"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <p style={{ color: theme?.secondaryText || "#666" }}>
                    No patents found.
                  </p>
                </div>
              )}
            </div>
          </Fade>
        )}
      </div>
    );
  };

  return (
    <div className="projects-main">
      {React.createElement(Header as any, { theme })}

      {/* Patents Section */}
      {renderPatentsSection()}

      {/* Publications Section */}
      <div className="basic-projects">
        <Fade top duration={2000}>
          <div className="publications-heading-div">
            <div className="publications-heading-text-div">
              <h1
                className="publications-heading-text"
                style={{ color: theme.text || "#000" }}
              >
                {publicationsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText || "#666" }}
              >
                {publicationsHeader.description}
              </p>
            </div>
          </div>
        </Fade>
      </div>

      {React.createElement(Footer as any)}
      {React.createElement(TopButton as any)}
    </div>
  );
};

export default Projects;
