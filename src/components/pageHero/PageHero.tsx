import React from "react";
import "./PageHero.scss";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  titleAccent?: React.ReactNode; // end of the title, in the accent gradient
  lede?: React.ReactNode;
  media?: React.ReactNode; // beside the copy on desktop
  mediaFirst?: boolean; // media above the copy on phones (a portrait leads, a form follows)
  eyebrowBelow?: boolean; // eyebrow under the title instead of above it (the role under the name)
  children?: React.ReactNode; // the page's own facts and actions, below the lede
}

// Opening block of every page, so they all start with the same type scale and entrance
const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  titleAccent,
  lede,
  media,
  mediaFirst,
  eyebrowBelow,
  children,
}) => {
  const eyebrowLine = <p className="page-eyebrow">{eyebrow}</p>;

  return (
    <section
      className={`page-hero${media ? " page-hero-split" : ""}${
        mediaFirst ? " page-hero-media-first" : ""
      }${eyebrowBelow ? " page-hero-eyebrow-below" : ""}`}
    >
      <div className="page-hero-copy">
        {!eyebrowBelow && eyebrowLine}
        <h1 className="page-title">
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className="gradient-text">{titleAccent}</span>
            </>
          )}
        </h1>
        {eyebrowBelow && eyebrowLine}
        {lede && <p className="page-lede">{lede}</p>}
        {children}
      </div>
      {media && <div className="page-hero-media">{media}</div>}
    </section>
  );
};

export default PageHero;
