import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PatentCard from "../../components/patentCard/PatentCard";
import Loading from "../../containers/loading/Loading";
import { Fade } from "react-awesome-reveal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { publicationsHeader, patentsHeader } from "../../portfolio";
import patentService, { Patent } from "../../utils/patentService";
import { Theme } from "../../theme/Themes";
import "./Patents.css";
import { useTheme } from "styled-components";

// Same accents as the status badges on `PatentCard`
const ISSUED_COLOR = "#4CAF50";
const PENDING_COLOR = "#FF9800";

const PatentStatItem = ({
  label,
  value,
  color,
  theme,
}: {
  label: string;
  value: number;
  color: string;
  theme: Theme;
}) => (
  <div className="patents-stats-item">
    <span className="patents-stats-dot" style={{ backgroundColor: color }} />
    <span className="patents-stats-item-value" style={{ color: theme.text }}>
      {value}
    </span>
    <span
      className="patents-stats-label"
      style={{ color: theme.secondaryText }}
    >
      {label}
    </span>
  </div>
);

interface PatentStatsProps {
  total: number;
  issued: number;
  pending: number;
  theme: Theme;
}

const PatentStats: React.FC<PatentStatsProps> = ({
  total,
  issued,
  pending,
  theme,
}) => {
  const borderColor = theme.isDark ? theme.boxShadowColor : "#e0e0e0";

  return (
    <div
      className="patents-stats"
      style={{
        backgroundColor: theme.paperbg,
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="patents-stats-total">
        <span
          className="patents-stats-total-value"
          style={{ color: theme.text }}
        >
          {total}
        </span>
        <span
          className="patents-stats-label"
          style={{ color: theme.secondaryText }}
        >
          Total patents
        </span>
      </div>
      <div
        className="patents-stats-bar"
        style={{
          backgroundColor: theme.isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "#eef0f4",
        }}
      >
        <span
          style={{
            width: `${(issued / total) * 100}%`,
            backgroundColor: ISSUED_COLOR,
          }}
        />
        <span
          style={{
            width: `${(pending / total) * 100}%`,
            backgroundColor: PENDING_COLOR,
          }}
        />
      </div>
      <div className="patents-stats-breakdown">
        <PatentStatItem
          label="Issued"
          value={issued}
          color={ISSUED_COLOR}
          theme={theme}
        />
        <span
          className="patents-stats-divider"
          style={{ backgroundColor: borderColor }}
        />
        <PatentStatItem
          label="Pending"
          value={pending}
          color={PENDING_COLOR}
          theme={theme}
        />
      </div>
    </div>
  );
};

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
                {patentsHeader.caption && (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="patents-source-tooltip">
                        {patentsHeader.caption}
                      </Tooltip>
                    }
                  >
                    <span
                      className="patents-info-icon"
                      tabIndex={0}
                      aria-label={patentsHeader.caption}
                    >
                      <i className="fas fa-circle-info"></i>
                    </span>
                  </OverlayTrigger>
                )}
              </p>
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
            {patents.length > 0 && (
              <PatentStats
                total={patents.length}
                issued={patents.filter((p) => p.isIssued).length}
                pending={patents.filter((p) => p.isPending).length}
                theme={theme}
              />
            )}
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
