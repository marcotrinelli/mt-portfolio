import React from "react";
import "./Statement.scss";

// Large sentence lit up word by word as it scrolls through the viewport.
// Each word carries its index (so the stylesheet lights them up in reading order)
const Statement = ({ text }: { text: string }): JSX.Element => {
  const words = text.split(" ");

  return (
    <p
      className="statement"
      style={{ "--word-count": words.length } as React.CSSProperties}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {i > 0 && " "}
          <span style={{ "--word": i } as React.CSSProperties}>{word}</span>
        </React.Fragment>
      ))}
    </p>
  );
};

export default Statement;
