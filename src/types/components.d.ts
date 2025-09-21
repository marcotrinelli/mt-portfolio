// Common interfaces for component props
import React from "react";
import { Theme } from "../theme/Themes";
import { Patent } from "../utils/patentService";
import * as PortfolioTypes from "./portfolio";

// Base component props
export interface BaseComponentProps {
  theme?: Theme;
  className?: string;
}

// Button component props
export interface ButtonProps extends BaseComponentProps {
  text: string;
  to: string;
}

// Header component props
export interface HeaderProps {
  // Header has no props, uses hooks for theme
}

// Footer component props
export interface FooterProps {
  // Footer has no props, uses hooks for theme
}

// Patent card props
export interface PatentCardProps extends BaseComponentProps {
  patent: Patent;
}

// Achievement card props
export interface AchievementCardProps extends BaseComponentProps {
  cardInfo: PortfolioTypes.AchievementCard;
}

// Blog card props
export interface BlogCardProps extends BaseComponentProps {
  blog: {
    title: string;
    description: string;
    url: string;
    image?: string;
  };
}

// Certification card props
export interface CertificationCardProps extends BaseComponentProps {
  certificate: PortfolioTypes.Certification;
}

// Degree card props
export interface DegreeCardProps extends BaseComponentProps {
  degree: PortfolioTypes.Degree;
}

// Education card props
export interface EducationCardProps extends BaseComponentProps {
  school: PortfolioTypes.School;
}

// Experience card props
export interface ExperienceCardProps extends BaseComponentProps {
  cardInfo: PortfolioTypes.ExperienceItem;
}

// Issue card props
export interface IssueCardProps extends BaseComponentProps {
  issue: {
    title: string;
    url: string;
    number: number;
    closed: boolean;
    createdAt: string;
    assignees: {
      nodes: Array<{
        name: string;
        url: string;
        avatarUrl: string;
      }>;
    };
    repository: {
      name: string;
      url: string;
      owner: {
        login: string;
        url: string;
        avatarUrl: string;
      };
    };
  };
}

// Pull request card props
export interface PullRequestCardProps extends BaseComponentProps {
  pullRequest: {
    title: string;
    url: string;
    number: number;
    state: "OPEN" | "MERGED" | "CLOSED";
    createdAt: string;
    changedFiles: number;
    additions: number;
    deletions: number;
    mergedBy: {
      login: string;
      url: string;
      avatarUrl: string;
    } | null;
    baseRepository: {
      name: string;
      url: string;
      owner: {
        login: string;
        url: string;
        avatarUrl: string;
      };
    };
  };
}

// Publication card props
export interface PublicationCardProps extends BaseComponentProps {
  publication: {
    title: string;
    authors: string;
    journal: string;
    year: string;
    url?: string;
  };
}

// Competitive sites props
export interface CompetitiveSitesProps extends BaseComponentProps {
  logos: PortfolioTypes.CompetitiveSite[];
}

// Display Lottie props
export interface DisplayLottieProps extends BaseComponentProps {
  animationData: any;
  width?: string;
  height?: string;
}

// Link icon props
export interface LinkIconProps extends BaseComponentProps {
  iconName: string;
  link: string;
  iconifyClass?: string;
}

// Loader logo props
export interface LoaderLogoProps extends BaseComponentProps {
  // No specific props beyond base
}

// Organization list props
export interface OrganizationListProps extends BaseComponentProps {
  organizations: Array<{
    name: string;
    logo: string;
    url: string;
  }>;
}

// Project languages props
export interface ProjectLanguagesProps extends BaseComponentProps {
  logos: Array<{
    name: string;
    iconifyClass: string;
    style?: React.CSSProperties;
  }>;
}

// SEO header props
export interface SeoHeaderProps extends BaseComponentProps {
  // No specific props beyond base
}

// Social media props
export interface SocialMediaProps extends BaseComponentProps {
  socialMediaLinks: PortfolioTypes.SocialMediaLink[];
}

// Software skill props
export interface SoftwareSkillProps extends BaseComponentProps {
  skillName: string;
  fontAwesomeClassname: string;
}

// Toggle switch props
export interface ToggleSwitchProps extends BaseComponentProps {
  onToggle: () => void;
  checked: boolean;
}

// Top button props
export interface TopButtonProps extends BaseComponentProps {
  // No specific props beyond base
}

// Go to top props
export interface GoToTopProps extends BaseComponentProps {
  // No specific props beyond base
}

// No translate props
export interface NoTranslateProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Competitive sites props
export interface CompetitiveSitesProps extends BaseComponentProps {
  logos: Array<{
    siteName: string;
    iconifyClassname: string;
    style: React.CSSProperties;
    profileLink: string;
  }>;
}

// Degree card props
export interface DegreeCardProps extends BaseComponentProps {
  degree: {
    title: string;
    subtitle: string;
    logo_path: string;
    alt_name: string;
    duration: string;
    descriptions: string[];
    website_link: string;
  };
  theme: Theme;
}

// Display lottie props
export interface DisplayLottieProps {
  animationData: any;
}

// Organization list props
export interface OrganizationListProps extends BaseComponentProps {
  logos: Array<{
    login: string;
    avatarUrl: string;
  }>;
}

// Publication card props
export interface PublicationCardProps extends BaseComponentProps {
  repo: {
    id: string;
    name: string;
    description: string;
    url: string;
    createdAt: string;
  };
  theme: Theme;
}

// Software skill props
export interface SoftwareSkillListProps extends BaseComponentProps {
  logos: Array<{
    skillName: string;
    fontAwesomeClassname: string;
    style?: React.CSSProperties;
  }>;
}
