import React from "react";
import "./ToggleSwitch.css";
import DarkModeToggle from "react-dark-mode-toggle";

interface ToggleSwitchProps {
  theme: string;
  toggleTheme: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ theme, toggleTheme }) => {
  return (
    <div className={"toggle-button"}>
      <DarkModeToggle
        onChange={toggleTheme}
        checked={theme === "dark"}
        size={80}
      />
    </div>
  );
};

export default ToggleSwitch;
