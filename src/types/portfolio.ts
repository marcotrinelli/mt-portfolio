// Type definitions for portfolio configuration
import React from "react";

export interface SEO {
  title: string;
  description: string;
  og: {
    title: string;
    type: string;
    url: string;
  };
}

export interface Illustration {
  animated: boolean;
}

export interface Greeting {
  username: string;
  title: string;
  subTitle: string | React.ReactElement;
  resumeLink: string;
  githubProfile: string;
  displayGreeting: boolean;
}

export interface SocialMediaLink {
  name: string;
  link: string;
  fontAwesomeIcon: string;
  backgroundColor: string;
}

export interface SkillsSection {
  title: string;
  subTitle: string;
  skills: (string | React.ReactElement)[];
  softwareSkills: SoftwareSkill[];
  display: boolean;
}

export interface SoftwareSkill {
  skillName: string;
  fontAwesomeClassname: string;
}

export interface School {
  schoolName: string;
  logo: any; // For require() statements
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

export interface EducationInfo {
  display: boolean;
  title: string;
  subtitle: string;
  schools: School[];
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  companylogo: any; // For imported logos
  date: string;
  desc: string;
  descBullets: DescBullet[];
}

export interface DescBullet {
  desc: string;
  url?: string;
}

export interface WorkExperiences {
  display: boolean;
  experience: WorkExperience[];
}

export interface Project {
  image: any; // For require() statements
  projectName: string;
  projectDesc: string;
  footerLink?: FooterLink[];
}

export interface FooterLink {
  name: string;
  url: string;
}

export interface BigProjects {
  title: string;
  projects: Project[];
  display: boolean;
}

export interface AchievementCard {
  title: string;
  subtitle: string;
  image: any;
  footerLink: FooterLink[];
}

export interface HobbieSection {
  title: string | React.ReactElement;
  achievementsCards: AchievementCard[];
  display: boolean;
}

export interface Certification {
  title: string;
  subtitle: string;
  logo_path: string;
  certificate_link: string;
  alt_name: string;
  color_code: string;
}

export interface Certifications {
  certifications: Certification[];
}

export interface Degree {
  title: string;
  subtitle: string;
  logo_path: string;
  alt_name: string;
  duration: string;
  descriptions: string[];
  website_link: string;
}

export interface Degrees {
  degrees: Degree[];
}

export interface ContactSection {
  title: string;
  profile_image_path: string;
  description: string;
}

export interface BlogSection {
  title: string;
  subtitle: string;
  link: string;
  avatar_image_path: string;
}

export interface AddressSection {
  title: string;
  subtitle: string;
  avatar_image_path: string;
  location_map_link: string;
}

export interface PhoneSection {
  title: string;
  subtitle: string;
}

export interface ContactPageData {
  contactSection: ContactSection;
  blogSection: BlogSection;
  addressSection: AddressSection;
  phoneSection: PhoneSection;
}

export interface CompetitiveSite {
  siteName: string;
  iconifyClassname: string;
  style: {
    color: string;
  };
  profileLink: string;
}

export interface CompetitiveSites {
  competitiveSites: CompetitiveSite[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  company_url: string;
  logo_path: string;
  duration: string;
  location: string;
  description: string;
  color: string;
}

export interface ExperienceSection {
  title: string;
  experiences: ExperienceItem[];
}

export interface Experience {
  title: string;
  subtitle: string;
  description: string;
  header_image_path: string;
  sections: ExperienceSection[];
}

export interface ProjectsHeader {
  title: string;
  description: string;
  avatar_image_path: string;
}

export interface PublicationsHeader {
  title: string;
  description: string;
  avatar_image_path: string;
}

export interface PatentsHeader {
  title: string;
  description: string;
  caption?: string;
  avatar_image_path: string;
}
