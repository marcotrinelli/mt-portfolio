// Type definitions for React components and their props
import React from "react";
import { Theme as StyledTheme } from "../theme/Themes";

export interface Theme extends StyledTheme {}

export interface ErrorPageProps {
  title: string;
  subtitle: string;
  description: string;
}

export interface TypewriterOptions {
  onInit?: (typewriter: any) => void;
}

export interface FadeProps {
  children: React.ReactNode;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  duration?: number;
  distance?: string;
}

export interface DisplayLottieProps {
  animationData: any;
}

export interface SocialMediaProps {
  theme: Theme;
}

export interface GoToTopProps {
  children: React.ReactNode;
}

export interface NoTranslateProps {
  children: React.ReactNode;
}

// Route configuration types
export interface RouteConfig {
  title: string;
  subtitle: string;
  description: string;
}
