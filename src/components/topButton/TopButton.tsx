import React, { useEffect } from "react";
import "./TopButton.css";
import { useTheme } from "styled-components";

const TopButton: React.FC = () => {
  const theme = useTheme();

  // to refresh colors after changing theme
  useEffect(() => {
    onMouseLeave(theme.body, theme.text);
  }, [theme]);

  function GoUpEvent(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    onMouseLeave(theme.body, theme.text);
  }

  function scrollFunction(): void {
    const topButton = document.getElementById("topButton");
    if (!topButton) return;

    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      topButton.style.visibility = "visible";
    } else {
      topButton.style.visibility = "hidden";
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };

  const onMouseEnter = (color: string, bgColor: string): void => {
    /* For the button */
    const topButton = document.getElementById("topButton");
    if (topButton) {
      topButton.style.color = color;
      topButton.style.backgroundColor = bgColor;
    }

    /* For arrow icon */
    const arrow = document.getElementById("arrow");
    if (arrow) {
      arrow.style.color = color;
      arrow.style.backgroundColor = bgColor;
    }
  };

  const onMouseLeave = (color: string, bgColor: string): void => {
    /* For the button */
    const topButton = document.getElementById("topButton");
    if (topButton) {
      topButton.style.color = color;
      topButton.style.backgroundColor = bgColor;
    }

    /* For arrow icon */
    const arrow = document.getElementById("arrow");
    if (arrow) {
      arrow.style.color = color;
      arrow.style.backgroundColor = bgColor;
    }
  };

  return (
    <div
      onClick={GoUpEvent}
      id="topButton"
      style={{
        color: theme.body,
        backgroundColor: theme.text,
        border: `solid 1px ${theme.text}`,
      }}
      title="Go up"
      onMouseEnter={() => onMouseEnter(theme.text, theme.body)}
      onMouseLeave={() => onMouseLeave(theme.body, theme.text)}
    >
      <i className="fas fa-arrow-up" id="arrow" aria-hidden="true" />
    </div>
  );
};

export default TopButton;
