import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import "./TopButton.css";

// Scroll offset after which the button shows
const SHOW_AFTER = 30;

const TopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => setVisible(window.scrollY > SHOW_AFTER);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The root's smooth scroll-behavior animates this (and the reduced-motion rule turns it off)
  return (
    <button
      type="button"
      className={`top-button${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo(0, 0)}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default TopButton;
