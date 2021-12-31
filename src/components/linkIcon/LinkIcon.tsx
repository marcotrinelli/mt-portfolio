import React from "react";
import "./LinkIcon.scss";

interface LinkIconProps {
  url: string;
  text?: string;
  style?: React.CSSProperties;
}

const LinkIcon: React.FC<LinkIconProps> = ({ url, text, style }) => {
  return (
    <a
      className="fas fa-external-link-alt linkicon"
      style={style}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export default LinkIcon;
