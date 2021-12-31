import React from "react";
import "./Talks.css";

export default function Talks(): JSX.Element {
  // TODO: Add talks data when available
  const talkSection = {
    title: "Talks",
    subtitle: "Presentations and speaking engagements",
    talks: [] as any[],
  };

  return (
    <div className="main" id="talks">
      <div className="talk-header">
        <h1 className="talk-header-title">{talkSection.title}</h1>
        <p className="subTitle talk-header-subtitle">{talkSection.subtitle}</p>
        {talkSection.talks.length > 0 ? (
          talkSection.talks.map((talk: any, index: number) => {
            return (
              <div key={index} className="talk-card">
                <h3>{talk.title}</h3>
                <p>{talk.description}</p>
              </div>
            );
          })
        ) : (
          <p>No talks available</p>
        )}
      </div>
    </div>
  );
}
