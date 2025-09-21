import React from "react";
import "./PatentCard.css";

const PatentCard = ({ patent, theme = {} }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch (error) {
            return dateString;
        }
    };

    const getStatusBadgeColor = (isIssued, isPending) => {
        if (isIssued) return "#4CAF50"; // Green for issued
        if (isPending) return "#FF9800"; // Orange for pending
        return "#757575"; // Gray for unknown
    };

    const getStatusText = (patent) => {
        if (patent.isIssued) return "Issued";
        if (patent.isPending) return "Pending";
        return patent.status || "Unknown";
    };

    const handleViewDetails = () => {
        if (patent.detailsUrl && patent.detailsUrl !== "#") {
            window.open(patent.detailsUrl, "_blank", "noopener,noreferrer");
        }
    };

    const handleViewFrontPage = () => {
        if (patent.frontPageUrl) {
            window.open(patent.frontPageUrl, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="patent-card-container">
            <div 
                className="patent-card" 
                style={{ 
                    backgroundColor: theme.projectCard || '#fff',
                    border: `1px solid ${theme.border || '#e0e0e0'}`
                }}
            >
                <div className="patent-card-header">
                    <div className="patent-status-container">
                        <span 
                            className="patent-status-badge"
                            style={{ 
                                backgroundColor: getStatusBadgeColor(patent.isIssued, patent.isPending),
                                color: "#fff"
                            }}
                        >
                            {getStatusText(patent)}
                        </span>
                        {patent.isContinuation && (
                            <span 
                                className="patent-continuation-badge"
                                style={{ 
                                    backgroundColor: "#9C27B0", // Purple color for continuation
                                    color: "#fff"
                                }}
                            >
                                Continuation
                            </span>
                        )}
                        {patent.patentNumber && (
                            <span 
                                className="patent-number"
                                style={{ color: theme.secondaryText || '#666' }}
                            >
                                Patent #{patent.patentNumber}
                            </span>
                        )}
                    </div>
                    {patent.applicationNumber && (
                        <span 
                            className="application-number"
                            style={{ color: theme.secondaryText || '#666' }}
                        >
                            App. #{patent.applicationNumber}
                        </span>
                    )}
                </div>

                <div className="patent-card-body">
                    <h3 
                        className="patent-title"
                        style={{ color: theme.text || '#000' }}
                    >
                        {patent.title}
                    </h3>
                    
                    <div className="patent-dates">
                        <div className="patent-date-item">
                            <span 
                                className="date-label"
                                style={{ color: theme.secondaryText || '#666' }}
                            >
                                Filed:
                            </span>
                            <span 
                                className="date-value"
                                style={{ color: theme.text || '#000' }}
                            >
                                {formatDate(patent.filingDate)}
                            </span>
                        </div>
                        {patent.grantDate && (
                            <div className="patent-date-item">
                                <span 
                                    className="date-label"
                                    style={{ color: theme.secondaryText || '#666' }}
                                >
                                    Granted:
                                </span>
                                <span 
                                    className="date-value"
                                    style={{ color: theme.text || '#000' }}
                                >
                                    {formatDate(patent.grantDate)}
                                </span>
                            </div>
                        )}
                    </div>

                    {patent.inventors && patent.inventors.length > 0 && (
                        <div className="patent-inventors">
                            <span 
                                className="inventors-label"
                                style={{ color: theme.secondaryText || '#666' }}
                            >
                                Inventors:
                            </span>
                            <span 
                                className="inventors-list"
                                style={{ color: theme.text || '#000' }}
                            >
                                {patent.inventors.map(inv => {
                                    // Use inventorNameText if available, otherwise construct from firstName/lastName
                                    if (inv.inventorNameText) {
                                        return inv.inventorNameText;
                                    } else if (inv.firstName || inv.lastName) {
                                        return `${inv.firstName || ''} ${inv.lastName || ''}`.trim();
                                    }
                                    return 'Unknown Inventor';
                                }).join(", ")}
                            </span>
                        </div>
                    )}

                    {patent.applicants && patent.applicants.length > 0 && (
                        <div className="patent-applicant">
                            <span 
                                className="applicant-label"
                                style={{ color: theme.secondaryText || '#666' }}
                            >
                                Applicant:
                            </span>
                            <span 
                                className="applicant-name"
                                style={{ color: theme.text || '#000' }}
                            >
                                {(() => {
                                    const applicant = patent.applicants[0];
                                    if (applicant.applicantNameText) {
                                        return applicant.applicantNameText;
                                    } else if (applicant.firstName || applicant.lastName) {
                                        return `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim();
                                    }
                                    return 'Unknown Applicant';
                                })()}
                            </span>
                        </div>
                    )}
                </div>

                <div className="patent-card-footer">
                    <div className="patent-actions">
                        {patent.frontPageUrl && (
                            <button
                                className="patent-action-button front-page-button"
                                onClick={handleViewFrontPage}
                                style={{
                                    backgroundColor: theme.highlightLight || '#f0f0f0',
                                    color: theme.text || '#000',
                                    border: `1px solid ${theme.highlight || '#ccc'}`
                                }}
                            >
                                View Front Page
                            </button>
                        )}
                        {patent.detailsUrl && patent.detailsUrl !== "#" && (
                            <button
                                className="patent-action-button details-button"
                                onClick={handleViewDetails}
                                style={{
                                    backgroundColor: theme.highlight || '#007bff',
                                    color: "#fff"
                                }}
                            >
                                View Details
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatentCard;