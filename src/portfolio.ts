// All site copy and data. Colours live in src/theme/Themes.ts

import {
  FaBrain,
  FaCloud,
  FaDumbbell,
  FaEarthEurope,
  FaGithub,
  FaLightbulb,
  FaLinkedinIn,
  FaMotorcycle,
  FaNetworkWired,
  FaPeopleGroup,
  FaPizzaSlice,
  FaRecordVinyl,
  FaSeedling,
} from "react-icons/fa6";
import patentsSnapshot from "./data/patents.json";
import { Patent, summarizePatents } from "./utils/patentService";
import type {
  SEO,
  Greeting,
  HeroFact,
  SocialMediaLink,
  SkillsSection,
  ProjectsSection,
  HobbieSection,
  ContactPageData,
  AboutHeader,
  Journey,
  PatentsHeader,
  PatentTopics,
} from "./types/portfolio";

const LINKEDIN_URL = "https://www.linkedin.com/in/marco-trinelli/";
const GITHUB_URL = "https://github.com/marcotrinelli";
const EDGESYS_PAPER_URL = "https://dl.acm.org/doi/10.1145/3301418.3313942";
const NOTIFICATION_PATENT_URL =
  "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12368768";
const RCA_PATENT_URL =
  "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/20250370848";
const AGNTCY_RUNTIME_URL = "https://github.com/agntcy/workflow-srv";
const GOOGLE_PATENTS_URL =
  "https://patents.google.com/?inventor=Marco+Trinelli";
const DEATHRUN_VIDEOS_URL =
  "https://www.youtube.com/results?search_query=Deathrun+V2+urban+terror";
const CISCO_START = new Date("2019-05-01");
const BIRTH_YEAR = 1994;

//SEO Related settings
const seo: SEO = {
  title: "Marco Trinelli | Senior Software Engineer & Inventor",
  description:
    "Senior software engineer and inventor at Cisco, focused on distributed systems, cloud-native software and Generative AI, with a strong foundation in networking and systems programming.",
  og: {
    title: "Marco Trinelli | Senior Software Engineer & Inventor",
    type: "website",
    url: "https://marcotrinelli.com/",
  },
};

// Summary And Greeting Section

const greeting: Greeting = {
  username: "Marco Trinelli",
  title: "Hi, I'm",
  role: "Senior Software Engineer & Inventor at Cisco",
  pitch:
    "I build distributed systems, cloud-native software and Generative AI on a strong networking and systems programming foundation. From programmable switches and edge computing to LLMs and AI agents.\nI like being early and turning new ideas into production systems and patenting what's novel.",
  resumeLink: "./marco-trinelli-cv.pdf", // Download CV button on the About page, set to empty to hide it
};

// Counted from the bundled snapshot (`npm run fetch-patents` refreshes it)
const patentSummary = summarizePatents(patentsSnapshot.patents as Patent[]);
const patentCount = patentSummary.issued + patentSummary.pending;
const firstGrantYear = Math.min(
  ...(patentsSnapshot.patents as Patent[])
    .filter((p) => p.grantDate)
    .map((p) => new Date(p.grantDate as string).getFullYear()),
);
const yearsAtCisco = Math.floor(
  (Date.now() - CISCO_START.getTime()) / (365.25 * 24 * 3600 * 1000),
);

const heroFacts: HeroFact[] = [
  {
    value: `${patentCount}`,
    label: "US patents",
  },
  { value: `${yearsAtCisco}+`, label: "Years at Cisco" },
  { value: "EdgeSys '19", label: "ACM paper, first author" },
  { value: "2", label: "Master's degrees" },
];

// Social Media Links

const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "LinkedIn",
    link: LINKEDIN_URL,
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    link: GITHUB_URL,
    icon: FaGithub,
  },
];

// Skills Section

const skillsSection: SkillsSection = {
  title: "Who I am",
  subTitle:
    "An engineer who enjoys being early: I pick up new technology, find where it beats the status quo, and take it to production.",
  pillars: [
    {
      title: "Computer networks",
      icon: FaNetworkWired,
      desc: "Data-plane programming on Cisco Nexus switches (P4, Intel Tofino), edge computing research at Nokia Bell Labs, Master's degrees in networks and network security.",
    },
    {
      title: "Full-stack and cloud",
      icon: FaCloud,
      desc: "Cloud-native microservices on AWS and Kubernetes, REST/gRPC APIs, custom IAM with OPA, React/TypeScript frontends.",
    },
    {
      title: "GenAI and LLMs",
      icon: FaBrain,
      desc: "AI agents, RAG and GraphRAG in production, multi-agent runtimes with MCP, LLM serving with vLLM on multi-GPU clusters.",
    },
    {
      title: "Invention",
      icon: FaLightbulb,
      desc: "Patents in distributed systems, cloud computing and Generative AI, filed with Cisco.",
    },
    {
      title: "Leadership",
      icon: FaPeopleGroup,
      desc: "Leading full-stack architecture end to end and unblocking critical technical challenges with Product and UX.",
    },
  ],
  stack: [
    "Python",
    "Go",
    "C/C++",
    "TypeScript",
    "React",
    "Kubernetes",
    "Docker",
    "AWS",
    "gRPC",
    "P4",
    "LangGraph",
    "MCP",
    "vLLM",
  ],
  languages: [
    { name: "Italian", level: "native" },
    { name: "English", level: "fluent" },
    { name: "French", level: "fluent" },
    { name: "Portuguese", level: "fluent" },
  ],
};

// About page: a short intro up top, the long story told by the journey below it

const aboutHeader: AboutHeader = {
  title: "About",
  headline: "I take new ideas",
  headlineAccent: "from prototype to production.",
  lede: "I'm a Senior Software Engineer in Cisco's innovation group in Switzerland. I work across the stack, from backend to frontend, and I'm the main inventor of several patents in distributed systems, cloud computing and Generative AI.",
  statement:
    "I'm curious by default: vLLM, GraphRAG and AI agents didn't exist when I graduated, and today they're what I build with.",
  principles: [
    "I care about the details that decide whether something holds up in production, from the API contract to the last edge case.",
    "I do my best work in a team, with Product and UX in the room, where the win is what we ship together.",
  ],
};

const journey: Journey = {
  title: "Journey",
  subtitle: "From Italy to Switzerland, through France and California.",
  steps: [
    {
      year: `${BIRTH_YEAR + 12}`,
      place: "Enna, Italy",
      title: "First lines of code",
      subtitle: "Visual Basic 6 (VB6)",
      desc: "I started coding in Visual Basic 6 at the age of 12.",
    },
    {
      year: `${BIRTH_YEAR + 14}`,
      place: "Enna, Italy",
      title: "Early innovation",
      subtitle: "New game modes and levels",
      desc: "I started inventing at the age of 14, creating new game modes and levels in GtkRadiant. I pioneered the deathrun game mode in Urban Terror, a Quake III-based FPS, and it became an established game type in the community.",
      tags: ["Game design", "Level design", "GtkRadiant", "Quake III"],
      link: { name: "Community videos", url: DEATHRUN_VIDEOS_URL },
    },
    {
      year: "2016",
      place: "Turin, Italy",
      title: "Polytechnic University of Turin",
      subtitle: "M.Sc. Computer Engineering, Computer Networks",
      desc: "My studies focused on computer networks, data centers, cloud computing and systems programming, and graduated summa cum laude.",
      tags: ["Networks", "Cloud computing", "Systems programming"],
    },
    {
      year: "2017",
      place: "Sophia Antipolis, France",
      title: "EURECOM",
      subtitle: "M.Sc. Computer Engineering, Communication System Security",
      desc: "My second Master's degree, in network security, distributed systems, cloud computing and software-defined networking.",
      tags: ["Security", "Distributed systems", "SDN"],
    },
    {
      year: "2018",
      place: "Paris, France",
      title: "Nokia Bell Labs",
      subtitle: "R&D Intern, Software Engineer",
      desc: "I built NEAR, a DPDK-based network proxy in C++ that lets legacy devices offload AR processing to the edge, and published it as first author at EdgeSys '19.",
      metric: { value: "20x", label: "frame rate" },
      tags: ["C++", "FFmpeg", "Edge computing"],
      link: { name: "Paper", url: EDGESYS_PAPER_URL },
    },
    {
      year: "2019",
      place: "San Jose, California",
      title: "Cisco",
      subtitle: "Software Engineer Intern",
      desc: "I programmed data-plane features on Nexus switches in P4 (traffic monitoring and IPv4-to-IPv6 transition) for a major US telecom operator, and wired them into the NX-OS control plane.",
      tags: ["P4", "Intel Tofino", "C++", "Python"],
    },
    {
      year: "2019",
      place: "Rolle, Switzerland",
      title: "Cisco",
      subtitle: "Senior Software Engineer, Inventor",
      desc: "In Cisco's innovation group I take new ideas from prototype to production and own them end to end, from React frontends to Go microservices on Kubernetes, shipped with Jenkins, GitHub Actions and ArgoCD. I've built edge and cloud computing solutions for AI use cases, and identity and authorization for cloud-native services. I've also led a team of three junior engineers, and partnered with Product and UX to shape what we ship.",
      tags: ["Go", "React", "Kubernetes", "AWS", "ArgoCD", "OPA"],
    },
    {
      year: `${firstGrantYear}`,
      place: "Rolle, Switzerland",
      title: "First US patent granted",
      desc: "The first of several patents in distributed systems, cloud computing and Generative AI.",
      metric: { value: `${patentCount}`, label: "US patents" },
      link: { name: "See my patents", url: "/patents" },
    },
    {
      year: "2025",
      place: "Rolle, Switzerland",
      title: "Notification Service",
      subtitle: "US Patent 12,368,768",
      desc: "A config-driven Go service that scales real-time updates from stateless backends to web applications. Reused across Cisco.",
      metric: { value: "10x", label: "throughput" },
      tags: ["Go", "Distributed systems", "gRPC"],
      link: { name: "Patent", url: NOTIFICATION_PATENT_URL },
    },
    {
      year: "2025",
      place: "Rolle, Switzerland",
      title: "(AGNTCY) Linux Foundation",
      subtitle: "Multi-agent runtime for the Internet of Agents (IoA) ",
      desc: "I architected and contributed to an open-source multi-agent runtime. It's framework-agnostic and handles communication between agents.",
      tags: ["Python", "AI agents", "LangGraph", "Open source"],
      link: { name: "GitHub", url: AGNTCY_RUNTIME_URL },
    },
    {
      year: "2025",
      place: "Rolle, Switzerland",
      title: "Agentic root-cause analysis",
      subtitle: "Foundation of a new venture at Cisco",
      desc: "I prototyped an agent-driven RCA system that is now being integrated into Cisco's main AI platform.",
      tags: ["AI agents", "GraphRAG", "MCP"],
      link: { name: "Patent application", url: RCA_PATENT_URL },
    },
    {
      year: "Now",
      place: "Rolle, Switzerland",
      title: "Security and cognition of AI agents",
      subtitle: "Real-time derailment detection",
      desc: "I'm working on the security and cognitive side of AI agents. I'm building a system that detects agent derailment as it happens and remediates in time.",
      tags: ["AI agents", "AI security", "vLLM", "Real-time"],
    },
  ],
};

// Project sections, rendered in order on the home page

const projectSections: ProjectsSection[] = [
  {
    title: "Selected work",
    projects: [
      {
        image: require("./assets/images/myStyleGen.webp"),
        imageFit: "contain",
        name: "My Style – Agent Skill",
        year: "2026",
        desc: "Agent skill that reads material you authored (repos, specs, decks, notes), works out how you work and write, and installs a personal my-style skill, so every future agent session produces work in your idiom and decodes your shorthand.",
        tags: ["Agent skills", "Claude Code", "LLMs", "Python"],
        links: [
          {
            name: "GitHub",
            url: "https://github.com/marcotrinelli/my-style-gen",
          },
          {
            name: "skills.sh",
            url: "https://www.skills.sh/marcotrinelli/my-style-gen",
          },
          {
            name: "Agensi",
            url: "https://www.agensi.io/skills/my-style",
          },
        ],
      },
      {
        image: require("./assets/images/vllmInspector.webp"),
        name: "vLLM Inspector",
        year: "2026",
        desc: "Live dashboard for a vLLM server, built only from its /metrics: batch and queue, token throughput, KV cache, preemptions, latency percentiles over time, and the deployment layout (data, tensor and pipeline parallel).",
        tags: ["vLLM", "LLM serving", "Observability", "TypeScript"],
        links: [
          {
            name: "GitHub",
            url: "https://github.com/marcotrinelli/vllm-inspector",
          },
        ],
      },
      {
        image: require("./assets/images/notificationService.webp"),
        imageFit: "contain",
        name: "Notification Service",
        year: "2025",
        desc: "Distributed microservice that brings real-time updates to web applications from stateless backends (REST, gRPC), improving throughput by ~10x in multi-tenant environments. Reused across products.",
        tags: ["Go", "Distributed systems", "gRPC"],
        links: [
          {
            name: "US Patent 12,368,768",
            url: NOTIFICATION_PATENT_URL,
          },
        ],
      },
      {
        name: "Agentic Root-Cause Analysis",
        desc: "Production-grade system using AI agents and RAG for real-time enterprise knowledge retrieval and automated root-cause analysis. Laid the foundation for a new venture at Cisco.",
        tags: ["AI agents", "RAG", "LangGraph", "Python"],
        links: [
          {
            name: "Patent application",
            url: RCA_PATENT_URL,
          },
        ],
      },
      {
        image: require("./assets/images/near.webp"),
        imageFit: "contain",
        name: "NEAR",
        year: "2018",
        desc: "A modular, programmable network proxy that lets legacy hardware run AR/VR services at the edge, with ~20x the frame rate. Built at Nokia Bell Labs.",
        tags: ["Edge computing", "Networking", "C++"],
        links: [{ name: "Paper", url: EDGESYS_PAPER_URL }],
      },
      {
        image: require("./assets/images/minotourLogo.webp"),
        imageFit: "contain",
        name: "Minotour",
        desc: "Conversational agent for tourism that uses the Semantic Web as its knowledge base.",
        tags: ["Conversational AI", "Semantic Web"],
        links: [{ name: "Website", url: "https://minotour.eurecom.fr/" }],
      },
      {
        name: "OS161",
        year: "2017",
        desc: "Unix-like teaching operating system: implemented system calls, the file system, virtual memory management and locks.",
        tags: ["C", "Operating systems"],
      },
    ],
  },
  {
    title: "Early innovation",
    subtitle:
      "I started inventing at the age of 14, creating new game modes and levels in GtkRadiant.",
    projects: [
      {
        image: require("./assets/images/deathrunMap.webp"),
        name: "Deathrun for Urban Terror",
        desc: "I pioneered the deathrun game mode in Urban Terror, a Quake III-based FPS where one team triggers traps while the other runs the obstacle course. My deathrun maps were the first of their kind in the game. Other mappers picked up the format and built their own, and deathrun became an established game type in the community. I followed up in 2012 with Deathrun Space.",
        tags: ["Game design", "Level design", "GtkRadiant", "Quake III"],
        links: [
          {
            name: "Gameplay videos",
            url: DEATHRUN_VIDEOS_URL,
          },
          {
            name: "Deathrun Space trailer",
            url: "https://www.youtube.com/watch?v=YP0IB4PD4Ho",
          },
          {
            name: "Forum thread",
            url: "https://www.urbanterror.info/forums/topic/28787-ut4-deathrun-space/",
          },
        ],
      },
      {
        image: require("./assets/images/museoMap.webp"),
        name: "Museo",
        desc: "Urban Terror map set around a city museum, built for competitive play and used in gaming competitions.",
        tags: ["Level design", "GtkRadiant", "Competitive play"],
      },
    ],
  },
];

// Hobbies Section

const hobbieSection: HobbieSection = {
  title: "Outside work",
  hobbiesCards: [
    {
      label: "Traveling",
      icon: FaEarthEurope,
      subtitle:
        "I grew up in Italy, then lived in France and California before settling in Switzerland. Each move changed how I see things, from the way people work to the way they eat. I still travel whenever I can, and the best part is always the people I meet along the way.",
    },
    {
      label: "Gardening",
      icon: FaSeedling,
      subtitle:
        "Technically, I have a garden. In practice, it belongs to my cat Felix, who patrols it, naps in the best spots and keeps an eye on every visitor. I've planted a few herbs, and he still lets me pick them. So far, the arrangement works.",
    },
    {
      label: "Cooking",
      icon: FaPizzaSlice,
      subtitle:
        "My signature dishes are parmigiana di melanzane, lasagna and homemade pizza. They've won over colleagues and friends, including the most demanding Italians in the group, who are the toughest critics I know.",
    },
    {
      label: "Fitness",
      icon: FaDumbbell,
      subtitle:
        "I train regularly with a mix of strength, cardio and functional work. It keeps me healthy, and it's the best way I know to switch off after a long day at the desk.",
    },
    {
      label: "Motors",
      icon: FaMotorcycle,
      subtitle:
        "I love cars and motorcycles, both how they're engineered and how they feel on the road. My favorite way to spend a free weekend is a long ride.",
    },
    {
      label: "Music",
      icon: FaRecordVinyl,
      subtitle:
        "I have a turntable at home and a soft spot for '80s music. There's a special feeling in pulling out an old LP, dropping the needle and listening while watching the big cover art.",
    },
  ],
};

const contactPageData: ContactPageData = {
  title: "Contact",
  headline: "Get in",
  headlineAccent: "touch.",
  subtitle:
    "Questions about my work, a collaboration or an opportunity? Send me a message and I'll get back to you.",
  alternative: {
    lead: "Prefer LinkedIn?",
    link: { name: "Message me there", url: LINKEDIN_URL },
    icon: FaLinkedinIn,
  },
};

const patentsHeader: PatentsHeader = {
  title: "Patents",
  headline: "Patented and patent pending",
  headlineAccent: "inventions.",
  caption:
    "Live data from the US Patent and Trademark Office, via the USPTO Open Data Portal APIs.",
  googlePatentsLink: GOOGLE_PATENTS_URL,
};

// New filings land in a topic from their USPTO CPC codes, no edit needed
const patentTopics: PatentTopics = {
  topics: [
    { name: "AI / ML", cpcPrefixes: ["G06N"] },
    {
      name: "Distributed Systems",
      cpcPrefixes: ["H04L67", "H04L41", "H04L43", "G06F16/27", "G06F9/50"],
    },
    {
      name: "Security & Identity",
      cpcPrefixes: ["H04L63", "H04W12", "G06F21"],
    },
    { name: "Observability", cpcPrefixes: ["G06F11"] },
  ],
  overrides: {
    // Classified as fault diagnosis (G06F11/079), but the invention is LLM-based
    "root-cause detection based on automated resolution of dependencies between heterogeneous issues":
      "AI / ML",
  },
  fallback: "Other",
};

export {
  seo,
  greeting,
  heroFacts,
  socialMediaLinks,
  skillsSection,
  aboutHeader,
  journey,
  projectSections,
  hobbieSection,
  contactPageData,
  patentsHeader,
  patentTopics,
};
