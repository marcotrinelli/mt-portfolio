import React from "react";
import "./Podcast.css";

export default function Podcast(): JSX.Element {
  // TODO: Add podcast data when available
  const podcastSection = {
    title: "Podcasts",
    podcast: [] as string[],
  };

  return (
    <div className="main" id="podcast">
      <div className="podcast-header">
        <h1 className="podcast-header-title">{podcastSection.title}</h1>
      </div>
      <div className="podcast-main-div">
        {podcastSection.podcast.length > 0 ? (
          podcastSection.podcast.map((podcastLink: string, index: number) => {
            return (
              <div key={index}>
                <iframe
                  title={`Podcast ${index + 1}`}
                  className="podcast"
                  src={podcastLink}
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
              </div>
            );
          })
        ) : (
          <p>No podcast episodes available</p>
        )}
      </div>
    </div>
  );
}
