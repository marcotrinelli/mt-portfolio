import React from "react";

// FlippyFooter component types
export interface FlippyFooterProps {
  cards: React.ReactNode[];
  activeCardIndex?: number;
  onDotClick: (index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
}

const FlippyFooter: React.FC<FlippyFooterProps> = ({
  cards,
  activeCardIndex,
  onDotClick,
}) => (
  <div className="flippy-footer">
    {cards.map((card, index) => (
      <span
        key={`flippyFooterItem${index}`}
        className={`flippy-footer-item${
          activeCardIndex === index ? " isActive" : ""
        }`}
        onClick={(event) => onDotClick(index, event)}
      >
        *
      </span>
    ))}
  </div>
);

export default FlippyFooter;
