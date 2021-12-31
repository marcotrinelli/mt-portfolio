import React from "react";

// Flippy component types
export interface FlippyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  flipDirection?: "horizontal" | "vertical";
  flipOnHover?: boolean;
  flipOnClick?: boolean;
  isFlipped?: boolean;
  showNavigation?: boolean;
  usePrettyStyle?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface FlippyState {
  isFlipped: boolean;
  isTouchDevice: boolean;
  activeCardIndex?: number;
}
