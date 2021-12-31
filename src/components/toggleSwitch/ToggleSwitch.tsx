import React, { useEffect, useRef } from "react";
import "./ToggleSwitch.css";
import DarkModeToggle from "react-dark-mode-toggle";

interface ToggleSwitchProps {
  theme: string;
  toggleTheme: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ theme, toggleTheme }) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure proper positioning after component mounts and renders
    if (toggleRef.current) {
      // Force a reflow to ensure positioning is calculated correctly
      toggleRef.current.style.position = "fixed";
      toggleRef.current.style.bottom = "15px";
      toggleRef.current.style.left = "15px";
      toggleRef.current.style.zIndex = "1000";

      // On mobile, apply safe area insets
      if (window.innerWidth <= 768) {
        toggleRef.current.style.bottom =
          "calc(15px + env(safe-area-inset-bottom))";
        toggleRef.current.style.left = "calc(15px + env(safe-area-inset-left))";
      }
    }
  }, []);

  return (
    <div className={"toggle-button"} ref={toggleRef}>
      <DarkModeToggle
        onChange={toggleTheme}
        checked={theme === "dark"}
        size={80}
      />
    </div>
  );
};

export default ToggleSwitch;
