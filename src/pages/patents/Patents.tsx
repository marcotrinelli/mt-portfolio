import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PatentCard from "../../components/patentCard/PatentCard";
import Loading from "../../containers/loading/Loading";
import { Fade } from "react-awesome-reveal";
import { publicationsHeader, patentsHeader } from "../../portfolio";
import patentService, { Patent } from "../../utils/patentService";
import { Theme } from "../../theme/Themes";
import "./Patents.css";
import { useTheme } from "styled-components";

const Projects: React.FC = () => {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [patentsLoading, setPatentsLoading] = useState<boolean>(true);
  const [patentsError, setPatentsError] = useState<string | null>(null);

  const theme = useTheme();

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
        <Fade bottom duration={1000} distance="40px">
          <div className="projects-heading-div">
            <div className="projects-heading-text-div">
              <h1
                className="projects-heading-text"
                style={{ color: theme.text }}
              >
                {patentsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {patentsHeader.description}
              </p>
              {patentsHeader.caption && (
                <p
                  className="patents-sync-notice"
                  style={{
                    color: theme.secondaryText,
                    fontSize: "0.85rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {patentsHeader.caption}
                </p>
              )}
              {patentsError && (
                <p
                  className="patents-error-message"
                  style={{
                    color: "#FF9800",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                    backgroundColor: theme.isDark
                      ? "rgba(255, 152, 0, 0.15)"
                      : "rgba(255, 152, 0, 0.1)",
                    border: `1px solid ${
                      theme.isDark
                        ? "rgba(255, 152, 0, 0.4)"
                        : "rgba(255, 152, 0, 0.3)"
                    }`,
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
            <Loading />
          </div>
        ) : (
          <Fade bottom duration={1000} distance="40px">
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
                  <p style={{ color: theme.secondaryText }}>
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
      <Header />

      {/* Patents Section */}
      {renderPatentsSection()}

      <Footer />
    </div>
  );
};

export default Projects;
