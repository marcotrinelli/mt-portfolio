import React from "react";
import { useTheme } from "styled-components";
import "./CardBanner.scss";

interface CardBannerProps {
  src: string;
  alt: string;
  // "cover" fills the banner edge to edge (screenshots, photos);
  // "contain" centres the image on a light band (logos, diagrams)
  fit?: "cover" | "contain";
  className?: string; // sizing from the card (height or aspect ratio)
  lazy?: boolean;
}

// Image header of a project card
const CardBanner: React.FC<CardBannerProps> = ({
  src,
  alt,
  fit = "cover",
  className,
  lazy = true,
}) => {
  const theme = useTheme();
  return (
    <div
      className={`card-banner card-banner-${fit}${
        className ? ` ${className}` : ""
      }`}
      style={{
        // Light band in both themes: logos and diagrams are dark on white
        backgroundColor: theme.isDark ? "#e9edf3" : "#f5f7fa",
        borderBottomColor: `${theme.secondaryText}26`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        decoding="async"
      />
    </div>
  );
};

export default CardBanner;
