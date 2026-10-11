import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./LinkIcon.scss";

interface LinkIconProps {
  url: string;
  text?: string;
  style?: React.CSSProperties;
}

const LinkIcon: React.FC<LinkIconProps> = ({ url, text, style }) => {
  return (
    <a
      className="linkicon"
      style={style}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text ? undefined : "Open source"}
    >
      <FaArrowUpRightFromSquare aria-hidden />
      {text}
    </a>
  );
};

export default LinkIcon;
