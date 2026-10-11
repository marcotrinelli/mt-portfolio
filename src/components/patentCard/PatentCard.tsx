import React from "react";
import "./PatentCard.css";
import { PatentEntry } from "../../utils/patentService";
import ReactGA from "react-ga4";
import { FaArrowRight } from "react-icons/fa6";

// Patent card props
export interface PatentCardProps {
  entry: PatentEntry;
}

const PatentCard: React.FC<PatentCardProps> = ({ entry }) => {
  const { primary: patent, provisionals, title } = entry;

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      // Dates come as "YYYY-MM-DD", which parses as UTC midnight (so it's
      // formatted in UTC, or visitors west of UTC see the day before)
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
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
    if (isPending) return "#78909C"; // Blue-grey for pending
    return "#757575"; // Gray for unknown
  };

  const getStatusText = (patent: any): string => {
    if (patent.isIssued) return "Issued";
    if (patent.isPending) return "Pending";
    return patent.status || "Unknown";
  };

  const handleViewDetails = (): void => {
    ReactGA.event("patent_click", {
      patent_number: patent.patentNumber ?? patent.applicationNumber,
      patent_title: patent.title,
      link_url: patent.detailsUrl,
    });
  };

  // 12368768 to 12,368,768
  const formatPatentNumber = (number: string): string => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 20250294072 to 2025/0294072 (or whatever after date/*)
  const formatPublicationNumber = (number: string): string => {
    const match = number.match(/^(\d{4})(\d+)/);
    return match ? `${match[1]}/${match[2]}` : number;
  };

  const inventorNames = (patent.inventors ?? [])
    .map((inv) => {
      // Use inventorNameText if available, otherwise construct from firstName/lastName
      if (inv.inventorNameText) {
        return inv.inventorNameText;
      } else if (inv.firstName || inv.lastName) {
        return `${inv.firstName || ""} ${inv.lastName || ""}`.trim();
      }
      return "Unknown Inventor";
    })
    .join(", ");

  const applicantName = (() => {
    const applicant = patent.applicants?.[0];
    if (!applicant) {
      return "";
    }
    if (applicant.applicantNameText) {
      return applicant.applicantNameText;
    } else if (applicant.firstName || applicant.lastName) {
      return `${applicant.firstName || ""} ${applicant.lastName || ""}`.trim();
    }
    return "Unknown Applicant";
  })();

  const number = patent.patentNumber
    ? `US Patent ${formatPatentNumber(patent.patentNumber)}`
    : patent.publicationNumber
    ? `Pub. No. ${formatPublicationNumber(patent.publicationNumber)}`
    : null;

  const dates = [
    { label: "Filed", value: patent.filingDate },
    { label: "Issued", value: patent.grantDate },
    { label: "Published", value: patent.publicationDate },
  ].filter((d) => d.value);

  return (
    <div className="patent-card-container">
      <div className="patent-card surface-card">
        <div className="patent-badges-row">
          <span
            className="patent-status-badge"
            style={{
              backgroundColor: getStatusBadgeColor(
                patent.isIssued,
                patent.isPending
              ),
            }}
          >
            {getStatusText(patent)}
          </span>
          {patent.isContinuation && (
            <span
              className="patent-status-badge"
              style={{ backgroundColor: "#9C27B0" }}
            >
              Continuation
            </span>
          )}
          {patent.applicationType === "Provisional" && (
            <span
              className="patent-status-badge"
              style={{ backgroundColor: "#808080" }}
            >
              Provisional
            </span>
          )}
        </div>
        <div className="patent-card-body">
          <h3 className="patent-title">{title}</h3>
          {number && <p className="patent-number caps-label">{number}</p>}
          {inventorNames && (
            <div className="patent-field patent-inventors">
              <span className="patent-field-label">Inventors</span>
              <span className="patent-field-value">{inventorNames}</span>
            </div>
          )}
          {applicantName && (
            <div className="patent-field">
              <span className="patent-field-label">Applicant</span>
              <span className="patent-field-value">{applicantName}</span>
            </div>
          )}
          {provisionals.map((filing) => (
            <p key={filing.applicationNumber} className="patent-provisional">
              Provisional application filed {formatDate(filing.filingDate)}
            </p>
          ))}
          <dl className="patent-dates">
            {dates.map(({ label, value }) => (
              <div key={label} className="patent-date-item">
                <dt>{label}</dt>
                <dd>{formatDate(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
        {patent.detailsUrl && patent.detailsUrl !== "#" && (
          <div className="patent-card-footer">
            <a
              className="text-link"
              href={patent.detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleViewDetails}
            >
              View PDF
              <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatentCard;
