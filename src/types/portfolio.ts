// Type definitions for portfolio configuration
import { IconType } from "react-icons";

export interface SEO {
  title: string;
  description: string;
  og: {
    title: string;
    type: string;
    url: string;
  };
}

export interface Greeting {
  username: string;
  title: string; // the username follows it in the accent gradient
  role: string;
  pitch: string;
  resumeLink: string;
}

// One proof point in the hero
export interface HeroFact {
  value: string;
  label: string;
}

export interface ExternalLink {
  name: string;
  url: string;
}

export interface SocialMediaLink {
  name: string;
  link: string;
  icon: IconType;
}

export interface Pillar {
  title: string;
  icon: IconType;
  desc: string;
}

export interface SpokenLanguage {
  name: string;
  level: string;
}

export interface SkillsSection {
  title: string;
  subTitle: string;
  pillars: Pillar[];
  stack: string[];
  languages: SpokenLanguage[];
}

export interface Project {
  name: string;
  desc: string;
  image?: any; // For require() statements
  imageFit?: "cover" | "contain"; // "contain" for logos and diagrams, defaults to full-bleed "cover"
  year?: string; // e.g. "2008" for early work
  tags?: string[];
  links?: ExternalLink[];
}

// Rendered in order on the home page (e.g. "Projects", "Open source", "Early work")
export interface ProjectsSection {
  title: string;
  subtitle?: string;
  subtitleUrl?: string; // rendered as a link icon after the subtitle
  projects: Project[];
}

// One hobby chip on the About page
export interface HobbyCard {
  label: string;
  icon: IconType;
  subtitle: string; // shown when the chip is selected
}

export interface HobbieSection {
  title: string;
  hobbiesCards: HobbyCard[];
}

// A second way to reach me, for visitors who'd rather not use the form
export interface ContactAlternative {
  lead: string; // e.g. "Prefer LinkedIn?", the link follows it
  link: ExternalLink;
  icon: IconType; // leads the line, ahead of the lead text
}

export interface ContactPageData {
  title: string;
  headline: string;
  headlineAccent: string; // end of the headline, rendered in the accent gradient
  subtitle: string;
  alternative?: ContactAlternative; // under the subtitle, remove to hide it
}

export interface AboutHeader {
  title: string;
  headline: string;
  headlineAccent: string; // end of the headline, rendered in the accent gradient
  lede: string;
  statement: string; // lit up word by word as it scrolls through the viewport
  principles: string[];
}

export interface JourneyMetric {
  value: string; // e.g. "~20x"
  label: string;
}

// One step of the About page journey
export interface JourneyStep {
  year: string;
  place: string;
  title: string;
  subtitle?: string;
  desc: string;
  metric?: JourneyMetric;
  tags?: string[];
  link?: ExternalLink; // a url starting with "/" is a site page, opened in the same tab
}

export interface Journey {
  title: string;
  subtitle: string;
  steps: JourneyStep[]; // oldest first, so it reads as a story and ends on the present
}

export interface PatentsHeader {
  title: string;
  headline: string;
  headlineAccent: string; // end of the headline, rendered in the accent gradient
  caption?: string; // where the data comes from, shown under the headline
  googlePatentsLink?: string; // Set to empty to hide the button
}

export interface PatentTopic {
  name: string;
  cpcPrefixes: string[]; // Matched against the CPC codes USPTO assigns, e.g. "H04L67"
}

export interface PatentTopics {
  topics: PatentTopic[]; // In display order
  overrides: Record<string, string>; // Lowercased title to topic name, for filings whose CPC codes miss how I present them
  fallback: string; // Topic for filings no prefix matches (or not classified yet)
}
