import React, { useState, useEffect } from "react";
import "./PatentCard.css";
import { Theme } from "../../theme/Themes";
import { Patent } from "../../utils/patentService";
import { Flippy, FrontSide, BackSide } from "../flippyCard";
import { Modal } from "react-bootstrap";

// Patent card props
export interface PatentCardProps {
  patent: Patent;
  theme: Theme;
  className?: string;
}

const PatentCard: React.FC<PatentCardProps> = ({ patent, theme }) => {
  const [hasPlaqueImage, setHasPlaqueImage] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  useEffect(() => {
    if (patent.patentNumber) {
      // Check if plaque image exists for this patent
      const img = new Image();
      img.onload = () => setHasPlaqueImage(true);
      img.onerror = () => setHasPlaqueImage(false);
      // Use import.meta.url or require context for bundled assets
      try {
        img.src = require(`../../assets/patents/${patent.patentNumber}.png`);
      } catch (error) {
        setHasPlaqueImage(false);
      }
    }
  }, [patent.patentNumber]);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadgeColor = (
    isIssued?: boolean,
    isPending?: boolean
  ): string => {
    if (isIssued) return "#4CAF50"; // Green for issued
    if (isPending) return "#FF9800"; // Orange for pending
    return "#757575"; // Gray for unknown
  };

  const getStatusText = (patent: any): string => {
    if (patent.isIssued) return "Issued";
    if (patent.isPending) return "Pending";
    return patent.status || "Unknown";
  };

  const handleViewDetails = (): void => {
    if (patent.detailsUrl && patent.detailsUrl !== "#") {
      window.open(patent.detailsUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleFlipToggle = (): void => {
    setIsFlipped(!isFlipped);
  };

  const handleImageZoom = (): void => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = (): void => {
    setShowImageModal(false);
  };

  // FontAwesome icons for the flip button
  const PlaqueIcon = () => (
    <i className="fas fa-turn-up fa-rotate-90" style={{ fontSize: "18px" }}></i>
  );

  const DetailsIcon = () => (
    <i
      className="fas fa-turn-down fa-rotate-90"
      style={{ fontSize: "18px" }}
    ></i>
  );

  // 12368768 to 12,368,768
  const formatPatentNumber = (number: string): string => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 19221048 to 19/221,408
  const formatApplicationNumber = (number: string): string => {
    const match = number.match(/^(\d{2})(\d{3})(\d{3})$/);
    return match ? `${match[1]}/${match[2]},${match[3]}` : number;
  };

  // 20250294072 to 2025/0294072 (or whatever after date/*)
  const formatPublicationNumber = (number: string): string => {
    // const match = number.match(/^(\d{4})(\d{3})(\d{4})$/);// no, this assumes only 7 digits after year, could be more
    const match = number.match(/^(\d{4})(\d+)/);
    return match ? `${match[1]}/${match[2]}` : number;
  };

  // Shared patent card content component
  const PatentCardContent = () => (
    <div
      className="patent-card"
      style={{
        backgroundColor: "#fff",
        border: `1px solid "#e0e0e0"}`,
      }}
    >
      <div className="patent-card-header">
        <div className="patent-status-container">
          <div className="patent-badges-row">
            <span
              className="patent-status-badge"
              style={{
                backgroundColor: getStatusBadgeColor(
                  patent.isIssued,
                  patent.isPending
                ),
                color: "#fff",
              }}
            >
              {getStatusText(patent)}
            </span>
            {patent.isContinuation && (
              <span
                className="patent-status-badge"
                style={{
                  backgroundColor: "#9C27B0", // Purple color for continuation
                  color: "#fff",
                }}
              >
                Continuation
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="patent-card-body">
        <h3 className="patent-title" style={{ color: theme.text || "#000" }}>
          {patent.title}
        </h3>

        {(patent.patentNumber || patent.applicationNumber) && (
          <div
            className="patent-number-subtitle"
            style={{ color: theme.secondaryText || "#666" }}
          >
            {patent.patentNumber
              ? `(US Patent ${formatPatentNumber(patent.patentNumber)})`
              : patent.publicationNumber
              ? `(Pub. No. ${formatPublicationNumber(
                  patent.publicationNumber
                )})`
              : null}
          </div>
        )}

        {patent.inventors && patent.inventors.length > 0 && (
          <div className="patent-inventors">
            <span
              className="inventors-label"
              style={{ color: theme.secondaryText || "#666" }}
            >
              Inventors:
            </span>
            <span
              className="inventors-list"
              style={{ color: theme.text || "#000" }}
            >
              {patent.inventors
                .map((inv) => {
                  // Use inventorNameText if available, otherwise construct from firstName/lastName
                  if (inv.inventorNameText) {
                    return inv.inventorNameText;
                  } else if (inv.firstName || inv.lastName) {
                    return `${inv.firstName || ""} ${
                      inv.lastName || ""
                    }`.trim();
                  }
                  return "Unknown Inventor";
                })
                .join(", ")}
            </span>
          </div>
        )}

        {patent.applicants && patent.applicants.length > 0 && (
          <div className="patent-applicant">
            <span
              className="applicant-label"
              style={{ color: theme.secondaryText || "#666" }}
            >
              Applicant:
            </span>
            <span
              className="applicant-name"
              style={{ color: theme.text || "#000" }}
            >
              {(() => {
                const applicant = patent.applicants[0];
                if (applicant.applicantNameText) {
                  return applicant.applicantNameText;
                } else if (applicant.firstName || applicant.lastName) {
                  return `${applicant.firstName || ""} ${
                    applicant.lastName || ""
                  }`.trim();
                }
                return "Unknown Applicant";
              })()}
            </span>
          </div>
        )}

        <div className="patent-dates">
          <div className="patent-date-item">
            <span
              className="date-label"
              style={{ color: theme.secondaryText || "#666" }}
            >
              Filed:
            </span>
            <span
              className="date-value"
              style={{ color: theme.text || "#000" }}
            >
              {formatDate(patent.filingDate)}
            </span>
          </div>
          {patent.grantDate && (
            <div className="patent-date-item">
              <span
                className="date-label"
                style={{ color: theme.secondaryText || "#666" }}
              >
                Issued:
              </span>
              <span
                className="date-value"
                style={{ color: theme.text || "#000" }}
              >
                {formatDate(patent.grantDate)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="patent-card-footer">
        <div className="patent-actions">
          {patent.detailsUrl && patent.detailsUrl !== "#" && (
            <button
              className="patent-action-button"
              onClick={handleViewDetails}
              style={{
                backgroundColor: "#f0f0f0",
                color: theme.text || "#000",
                border: `1px solid ${theme.highlight || "#ccc"}`,
              }}
            >
              View PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="patent-card-container">
      {hasPlaqueImage && patent.patentNumber ? (
        <div style={{ position: "relative" }}>
          <Flippy
            flipOnClick={false} // Disable click on card itself
            flipDirection="horizontal"
            style={{ width: "100%", height: "100%" }}
            isFlipped={isFlipped}
          >
            <FrontSide>
              <PatentCardContent />
            </FrontSide>

            <BackSide>
              <div
                className="patent-card patent-plaque-side"
                style={{
                  backgroundColor: "#fff",
                  border: `1px solid "#e0e0e0"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "20px",
                }}
              >
                <img
                  src={require(`../../assets/patents/${patent.patentNumber}.png`)}
                  alt={`Patent ${patent.patentNumber} Plaque`}
                  className="patent-plaque-image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onClick={handleImageZoom}
                  onError={(e) => {
                    console.error(
                      `Failed to load plaque image for patent ${patent.patentNumber}`
                    );
                  }}
                />
              </div>
            </BackSide>
          </Flippy>

          {/* Flip button */}
          <button
            className="patent-card-flip-button"
            onClick={handleFlipToggle}
            title={isFlipped ? "View patent details" : "View patent plaque"}
          >
            {isFlipped ? <DetailsIcon /> : <PlaqueIcon />}
          </button>
        </div>
      ) : (
        // Regular card without flip functionality when plaque doesn't exist
        <PatentCardContent />
      )}

      {/* Image Zoom Modal */}
      {hasPlaqueImage && patent.patentNumber && (
        <Modal
          show={showImageModal}
          onHide={handleCloseImageModal}
          centered
          size="xl"
          className="patent-image-modal"
          backdrop="static"
        >
          <Modal.Body>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseImageModal}
            ></button>
            <img
              src={require(`../../assets/patents/${patent.patentNumber}.png`)}
              alt={`Patent ${patent.patentNumber} Plaque - Enlarged View`}
              style={{ cursor: "zoom-out" }}
              onClick={handleCloseImageModal}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default PatentCard;
