import React from "react";
import "./ToggleSwitch.css";

interface ToggleSwitchProps {
  theme: string;
  toggleTheme: () => void;
}

const SUN_RAYS: [number, number, number, number][] = [
  [12, 1, 12, 3],
  [12, 21, 12, 23],
  [4.22, 4.22, 5.64, 5.64],
  [18.36, 18.36, 19.78, 19.78],
  [1, 12, 3, 12],
  [21, 12, 23, 12],
  [4.22, 19.78, 5.64, 18.36],
  [18.36, 5.64, 19.78, 4.22],
];

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`toggle-button${isDark ? " toggle-button-dark" : ""}`}
      onClick={toggleTheme}
    >
      <span className="toggle-thumb">
        {/* One icon morphs sun -> moon: the core grows, the rays spin away, a cut-out slides in */}
        <svg className="toggle-icon" viewBox="0 0 24 24" aria-hidden>
          <mask
            id="toggle-moon-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="white" />
            <circle className="toggle-moon-cut" cx="33" cy="8" r="8" />
          </mask>
          <g mask="url(#toggle-moon-mask)">
            <circle className="toggle-core" cx="12" cy="12" r="5" />
          </g>
          <g className="toggle-rays">
            {SUN_RAYS.map(([x1, y1, x2, y2]) => (
              <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
            ))}
          </g>
        </svg>
      </span>
    </button>
  );
};

export default ToggleSwitch;
