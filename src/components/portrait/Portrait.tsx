import React from "react";

import { greeting } from "../../portfolio";
import profilePic from "../../assets/images/marcoProfile.webp";
import "./Portrait.scss";

const PORTRAIT_SIZE = 300;
const TILT_MAX_ANGLE = 10;

// Pointer position drives CSS variables (so the stylesheet owns the transform and the reduced-motion opt-out)
const handlePortraitMove = (e: React.PointerEvent<HTMLDivElement>): void => {
  if (e.pointerType === "touch") {
    return;
  }
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  el.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * TILT_MAX_ANGLE}deg`);
  el.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * TILT_MAX_ANGLE}deg`);
  el.style.setProperty("--glare-x", `${x * 100}%`);
  el.style.setProperty("--glare-y", `${y * 100}%`);
};

const handlePortraitLeave = (e: React.PointerEvent<HTMLDivElement>): void => {
  ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"].forEach((prop) =>
    e.currentTarget.style.removeProperty(prop)
  );
};

// Profile photo in a spinning accent ring, tilting towards the pointer
const Portrait = (): JSX.Element => (
  <div
    className="portrait"
    onPointerMove={handlePortraitMove}
    onPointerLeave={handlePortraitLeave}
  >
    <div className="portrait-glow" aria-hidden="true" />
    <div className="portrait-frame">
      <img
        alt={greeting.username}
        src={profilePic}
        width={PORTRAIT_SIZE}
        height={PORTRAIT_SIZE}
        className="portrait-image"
      />
    </div>
  </div>
);

export default Portrait;
