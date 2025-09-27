/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import CiscoLogo from "./assets/images/ciscoLogo.svg";
import NokiaLogo from "./assets/images/nokiabelllabsLogo.svg";
import type {
  SEO,
  Illustration,
  Greeting,
  SocialMediaLink,
  SkillsSection,
  EducationInfo,
  WorkExperiences,
  BigProjects,
  HobbieSection,
  Certifications,
  Degrees,
  ContactPageData,
  CompetitiveSites,
  Experience,
  ProjectsHeader,
  PublicationsHeader,
  PatentsHeader,
} from "./types/portfolio";

//SEO Related settings
const seo: SEO = {
  title: "Marco Trinelli",
  description:
    "A passionate senior software engineer driving innovation to the next level.",
  og: {
    title: "Marco Trinelli",
    type: "website",
    url: "http://marcotrinelli.com/",
  },
};

// Summary And Greeting Section

const illustration: Illustration = {
  animated: true, // Set to false to use static SVG
};

const greeting: Greeting = {
  username: "Marco Trinelli",
  title: "Hi! I'm Marco :)",
  subTitle: emoji(
    "A passionate software engineer driving innovation to the next level."
  ),
  // resumeLink: "https://www.linkedin.com/in/marco-trinelli/", // Set to empty to hide the button
  resumeLink: "",
  githubProfile: "",
  displayGreeting: true, // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks: SocialMediaLink[] = [
  /* Your Social Media Link */
  // github: "https://github.com/ 1919",
  // linkedin: "https://www.linkedin.com/in/marco-trinelli/",
  // gmail: "  98@gmail.com",
  // gitlab: "https://gitlab.com/  98",
  // facebook: "https://www.facebook.com/l .19/",
  // twitter: "https://twitter.com/ _1919",
  // instagram: "https://www.instagram.com/ /"
  // {
  //   name: "Github",
  //   link: "https://github.com/ 1919",
  //   fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
  //   backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  // },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/marco-trinelli/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  // {
  //   name: "YouTube",
  //   link: "https://www.youtube.com/channel/UC_amoXmmxSY9KusoDczDTXQ",
  //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
  //   backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  // },
  // {
  //   name: "Gmail",
  //   link: "mailto:  98@gmail.com",
  //   fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
  //   backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  // },
  // {
  //   name: "Twitter",
  //   link: "https://twitter.com/ _1919",
  //   fontAwesomeIcon: "fa-twitter", // Reference https://fontawesome.com/icons/twitter?style=brands
  //   backgroundColor: "#1DA1F2", // Reference https://simpleicons.org/?q=twitter
  // },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/l .19/",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  // },
  // {
  //   name: "Instagram",
  //   link: "https://www.instagram.com/ /",
  //   fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
  //   backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  // },
];

// Skills Section

const skillsSection: SkillsSection = {
  title: "Who I am",
  subTitle:
    "As a senior software engineer, I have consistently worked on innovative projects using cutting-edge technology.",
  skills: [
    "I bring a multi-disciplinary background in:",
    emoji("- computer networks 🌐"),
    emoji("- security 🛡️"),
    emoji("- artificial intelligence 🤖"),
    emoji("- cloud computing ☁️"),
    emoji("- full-stack development 👨‍💻"),
    "Throughout my professional experience, I have:",
    emoji(
      "- delivered production-ready and innovative solutions, from conception to deployment 🚀"
    ),
    emoji(
      "- taken responsibility in projects, led young talented engineers, and collaborated effectively with cross-functional teams 🤝"
    ),
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
  https://fontawesome.com/icons?d=gallery */
  softwareSkills: [],
  //   softwareSkills: [
  //     {
  //       skillName: "html-5",
  //       fontAwesomeClassname: "fab fa-html5"
  //     },
  //     {
  //       skillName: "css3",
  //       fontAwesomeClassname: "fab fa-css3-alt"
  //     },
  //     {
  //       skillName: "sass",
  //       fontAwesomeClassname: "fab fa-sass"
  //     },
  //     {
  //       skillName: "JavaScript",
  //       fontAwesomeClassname: "fab fa-js"
  //     },
  //     {
  //       skillName: "reactjs",
  //       fontAwesomeClassname: "fab fa-react"
  //     },
  //     {
  //       skillName: "nodejs",
  //       fontAwesomeClassname: "fab fa-node"
  //     },
  //     {
  //       skillName: "swift",
  //       fontAwesomeClassname: "fab fa-swift"
  //     },
  //     {
  //       skillName: "npm",
  //       fontAwesomeClassname: "fab fa-npm"
  //     },
  //     {
  //       skillName: "sql-database",
  //       fontAwesomeClassname: "fas fa-database"
  //     },
  //     {
  //       skillName: "aws",
  //       fontAwesomeClassname: "fab fa-aws"
  //     },
  //     {
  //       skillName: "firebase",
  //       fontAwesomeClassname: "fas fa-fire"
  //     },
  //     {
  //       skillName: "python",
  //       fontAwesomeClassname: "fab fa-python"
  //     },
  //     {
  //       skillName: "docker",
  //       fontAwesomeClassname: "fab fa-docker"
  //     }
  //   ],
  display: true, // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo: EducationInfo = {
  display: true, // Set false to hide this section, defaults to true
  title: "Education",
  subtitle:
    "I hold two Master's degrees from the following top European universities",
  schools: [
    {
      schoolName: "Polytechnic University of Turin",
      logo: require("./assets/images/politoLogo.png"),
      subHeader: "Master's Degree in Computer Engineering - Networks",
      duration: "Sept. 2016 - Apr. 2019",
      desc: "Focus on Computer Networks and Data Centers, Cloud Computing, System Programming",
      descBullets: ["Grade: Summa cum laude"],
    },
    {
      schoolName: "Eurecom - Telecom ParisTech",
      logo: require("./assets/images/telecomparisLogo.png"),
      subHeader:
        "Master of Science in Engineering (M.S.E.) in Communication System Security",
      duration: "Sept. 2017 - Jan. 2019",
      desc: "Focus on Security (Communication, System and Network), Big Data & Cloud Computing, Network Softwarization",
      // descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    },
  ],
};
// Work experience section

const workExperiences: WorkExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Senior Software Engineer, Inventor",
      company: "Cisco",
      location: "San Jose (CA) – Lausanne (CH)",
      companylogo: CiscoLogo,
      date: "May 2019 – Present",
      desc: "As a Full-Stack, DevOps, and IT engineer in the Outshift organization, I drive innovative projects in Generative AI and Edge Computing, leading key initiatives and securing Intellectual Property through patents",
      descBullets: [
        {
          desc: "Responsible for leading projects while collaborating with other teams (UX, Product)",
        },
        {
          desc: "Pioneered a Generative AI-based project leveraging LLM Agents for automated Root Cause Analysis and online retrieval, laying the foundation for a new venture in Outshift – Python, LangChain",
        },
        {
          desc: "Designed, implemented and deployed microservices at the cloud/edge - Go, React/TS, Docker, K8s, Jenkins, ArgoCD",
        },
        {
          desc: "Setting up and maintaining Corporate Lab (DMZ, vSphere/ESXi, Routing and Switching)",
        },
      ],
    },
    {
      role: "Software Engineer - Intern",
      company: "Nokia Bell Labs",
      location: "Paris (FR)",
      companylogo: NokiaLogo,
      date: "July 2018 – Jan. 2019",
      desc: "At Bell Labs, I designed, implemented and validated a modular, transparent and programmable network framework that allows legacy hardware to run AR/VR services at the Edge infrastructure using Machine Learning techniques",
      descBullets: [
        {
          desc: "Publication: Transparent AR Processing Acceleration at the Edge, Marco Trinelli et al., EdgeSys ’19",
          url: "https://dl.acm.org/doi/10.1145/3301418.3313942",
        },
      ],
    },
  ],
};

// Some big projects you have worked on

const bigProjects: BigProjects = {
  title: "Projects and Patents",
  // subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/minotourLogo.png"),
      projectName: "Minotour",
      projectDesc:
        "Conversational agent for tourism exploiting the Semantic Web as a knowledge base",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://minotour.eurecom.fr/",
        },
        //  you can add extra buttons here.
      ],
    },
    {
      image: require("./assets/images/near.png"),
      projectName: "NEAR",
      projectDesc:
        "A modular and programmable network proxy used to speed up AI applications at the edge",
      footerLink: [
        {
          name: "See Paper",
          url: "https://dl.acm.org/doi/10.1145/3301418.3313942",
        },
      ],
    },
    {
      image: require("./assets/patents/12368768.png"),
      projectName: "US Patent 12,368,768",
      projectDesc:
        "High Scalability and End-to-End Consistency for Web Applications in Distributed Environments",
      footerLink: [
        {
          name: "See Patent",
          url: "https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12368768",
        },
      ],
    },
  ],
  display: true, // Set false to hide this section, defaults to true
};

// Hobbies Section

const hobbieSection: HobbieSection = {
  title: "Hobbies and Passions",
  subtitle:
    "When I'm not coding, you'll find me exploring these exciting activities that keep me balanced and inspired!",

  hobbiesCards: [
    {
      title: "✈️ Traveling & Cultural Exploration",
      subtitle:
        "I was born in Italy 🇮🇹, but then moved to France 🇫🇷, California (US) 🇺🇸, and now Switzerland 🇨🇭. Each country has enriched my perspective and taught me to appreciate diverse cultures, cuisines, and ways of life. I love exploring new places and connecting with locals.",
      image: require("./assets/lottie/travel.json"),
      footerLink: [
        {
          name: "My Travel Stories",
          url: "#",
        },
      ],
    },
    {
      title: "🌱 Gardening & Nature",
      subtitle:
        "There's something deeply satisfying about nurturing plants and watching them grow. From herbs for my cooking to beautiful flowers, gardening connects me with nature and provides a peaceful escape from the digital world.",
      image: require("./assets/lottie/gardening.json"),
      footerLink: [
        {
          name: "Garden Gallery",
          url: "#",
        },
      ],
    },
    {
      title: "🍝 Italian Cooking & Culinary Adventures",
      subtitle:
        "Born and raised in Italy, I have a deep passion for traditional Italian cuisine. I love making fresh pasta, risotto, and exploring regional specialties. I also enjoy discovering international flavors and fusion cooking techniques.",
      image: require("./assets/lottie/cooking.json"),
      footerLink: [
        {
          name: "My Recipes",
          url: "#",
        },
      ],
    },
    {
      title: "💪 Fitness & Gym Workouts",
      subtitle:
        "Staying physically active is essential for my well-being. I enjoy strength training, cardio workouts, and functional fitness. The gym is my place to challenge myself, build discipline, and maintain a healthy work-life balance.",
      image: require("./assets/lottie/fitness.json"),
      footerLink: [
        {
          name: "Workout Tips",
          url: "#",
        },
      ],
    },
    {
      title: "🎿 Skiing Adventures",
      subtitle:
        "Living in Switzerland has introduced me to the exhilarating world of skiing. As a newbie on the slopes, I'm constantly learning and improving my technique while enjoying the breathtaking Alpine scenery.",
      image: require("./assets/lottie/skiing.json"),
      footerLink: [
        {
          name: "Ski Adventures",
          url: "#",
        },
      ],
    },
    {
      title: "🏎️ Motors & Automotive Passion",
      subtitle:
        "I have a deep fascination with both cars and motorcycles. From appreciating Italian automotive engineering to understanding the mechanics and enjoying weekend rides, motors represent freedom, precision, and Italian craftsmanship.",
      image: require("./assets/lottie/motors.json"),
      footerLink: [
        {
          name: "Motor Collection",
          url: "#",
        },
      ],
    },
  ],
  display: true,
};

const certifications: Certifications = {
  certifications: [
    // {
    //     title: "Machine Learning",
    //     subtitle: "- Andrew Ng",
    //     logo_path: "stanford_logo.png",
    //     certificate_link:
    //         "https://www.coursera.org/account/accomplishments/verify/22MTSSC5WDTM",
    //     alt_name: "Stanford University",
    //     color_code: "#8C151599",
    // }
  ],
};

const degrees: Degrees = {
  degrees: [
    // {
    //     title: "Indian Institute of Information Technology Kurnool",
    //     subtitle: "B.Tech. in Computer Engineering",
    //     logo_path: "iiitk_logo.png",
    //     alt_name: "IIITDM Kurnool",
    //     duration: "2016 - Present",
    //     descriptions: [
    //         "⚡ I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
    //         "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
    //         "⚡ I was selected for Merit cum Means Scholarship which is given to top 10% of students in college. I have received award from respected director for consistently best performance in academics.",
    //     ],
    //     website_link: "http://iiitk.ac.in",
    // },
  ],
};

const contactPageData: ContactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "",
    description: "",
  },
  blogSection: {
    title: "Blogs",
    subtitle: "",
    link: "",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "",
    avatar_image_path: "address_image.svg",
    location_map_link: "",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "",
  },
};

const competitiveSites: CompetitiveSites = {
  competitiveSites: [
    // {
    //     siteName: "HackerRank",
    //     iconifyClassname: "simple-icons:hackerrank",
    //     style: {
    //         color: "#2EC866",
    //     },
    //     profileLink: "https://www.hackerrank.com/ ",
    // },
    // {
    //     siteName: "Codechef",
    //     iconifyClassname: "simple-icons:codechef",
    //     style: {
    //         color: "#5B4638",
    //     },
    //     profileLink: "https://www.codechef.com/users/ _1919",
    // },
    // {
    //     siteName: "Codeforces",
    //     iconifyClassname: "simple-icons:codeforces",
    //     style: {
    //         color: "#1F8ACB",
    //     },
    //     profileLink: "http://codeforces.com/profile/ ",
    // },
    // {
    //     siteName: "Hackerearth",
    //     iconifyClassname: "simple-icons:hackerearth",
    //     style: {
    //         color: "#323754",
    //     },
    //     profileLink: "https://www.hackerearth.com/@ 391",
    // },
    // {
    //     siteName: "Kaggle",
    //     iconifyClassname: "simple-icons:kaggle",
    //     style: {
    //         color: "#20BEFF",
    //     },
    //     profileLink: "https://www.kaggle.com/l ",
    // },
  ],
};

const experience: Experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description: "",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "Associate AI Engineer",
          company: "Legato Health Technology",
          company_url: "https://legatohealthtech.com/",
          logo_path: "legato_logo.png",
          duration: "June 2020 - PRESENT",
          location: "Hyderabad, Telangana",
          description:
            "I am working on automating healthcare products. The projects involve automation for process improvements and for significantly enhancing the profits. I am currently working on Cancer Survival and Reoccurence Prediction. Our goal is to make AI system which scales and removes doctor dependency as much as possible.",
          color: "#0879bf",
        },
        {
          title: "Android and ML Developer",
          company: "Muffito Incorporation",
          company_url: "https://www.linkedin.com/company/muffito-inc/about/",
          logo_path: "muffito_logo.png",
          duration: "May 2018 - Oct 2018",
          location: "Pune, Maharashtra",
          description:
            "I have created complete Android Application for locating Pub, Bar and beverage shops around you. I have also worked on implementation of algorithms for Face Detection, Text extraction from Image. I was involved in a team for creating complete software architecure of mobile and web application as well as admin panel for company.",
          color: "#9b1578",
        },
        {
          title: "Android Developer",
          company: "FreeCopy Pvt. Ltd.",
          company_url: "https://www.linkedin.com/company/freecopy/about/",
          logo_path: "freecopy_logo.png",
          duration: "Nov 2017 - Dec 2017",
          location: "Ahmedabad, Gujarat",
          description:
            "FreeCopy is the Start up from Indian Institute of Management, Ahmedabad. I have changed the integration of the whole app from Google to Firebase. I learnt the efﬁcient ways of Data communications like Retroﬁt, Eventbus etc. I experienced the real time start up. I learnt the Design thinking of UI on perspective of People.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Data Science Research Intern",
          company: "Delhivery Pvt. Ltd.",
          company_url: "https://www.delhivery.com/",
          logo_path: "delhivery_logo.png",
          duration: "May 2019 - Sept 2019",
          location: "Gurgaon, Haryana",
          description:
            "I have worked on project of predicting freight rates based on previous data. There were two objectives: (1) To build a forecasting engine to predict daily freight rates. (2) To embed feature in the model which can explain the seasonal major changes in freight rate based on regions and locations. I have closely worked with deep learning models in combination with statistical methods to create solution for this. At the end of internship, I had created model deployed on AWS EC2 with the use of Kafka stream jobs, ElasticSearch and PostgreSQL.",
          color: "#ee3c26",
        },
        {
          title: "Data Science Intern",
          company: "Intel Indexer LLC",
          company_url:
            "https://opencorporates.com/companies/us_dc/EXTUID_4170286",
          logo_path: "intel_logo.jpg",
          duration: "Nov 2018 - Dec 2018",
          location: "Work From Home",
          description:
            "This is financial Solution Company. I have made Supervised Learning model for the company which can perform time series analysis on Stock price data for 32 companies. I have built LSTM Neural Networks Model and trained the data of 32 companies for last 2 years. This model is also used for forecasting.",
          color: "#0071C5",
        },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Google Explore ML Facilitator",
          company: "Google",
          company_url: "https://about.google/",
          logo_path: "google_logo.png",
          duration: "June 2019 - April 2020",
          location: "Hyderabad, Telangana",
          description:
            "Explore Machine Learning (ML) is a Google-sponsored program for university students to get started with Machine Learning. The curriculum offers 3 tracks of ML Content (Beginner, Intermediate, Advanced) and relies on university student facilitators to train other students on campus and to build opensource projects under this program.",
          color: "#4285F4",
        },
        {
          title: "Microsoft Student Partner",
          company: "Microsoft",
          company_url: "https://www.microsoft.com/",
          logo_path: "microsoft_logo.png",
          duration: "Aug 2019 - May 2020",
          location: "Hyderabad, Telangana",
          description:
            "Microsoft Student Partner is a program for university students to lead the awareness and use of Cloud especially Azure tools in the development of their projects and startups. Under this program, I have organised hands on workshops and seminars to teach Cloud Computing concepts to students.",
          color: "#D83B01",
        },
        {
          title: "Mozilla Campus Captain",
          company: "Mozilla",
          company_url: "https://www.mozilla.org/",
          logo_path: "mozilla_logo.png",
          duration: "Oct 2019 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "My responsibility for this program was to create opensource environment in college and in the city. We have organised multiple hackathons on the problems collected by ordinary people from Kurnool city. We have build opensource community of our own college. The community is available at dsc_iiitdmk on github.",
          color: "#000000",
        },
        {
          title: "Developer Students Club Member",
          company: "DSC IIITDM Kurnool",
          company_url:
            "https://www.linkedin.com/company/developer-students-club-iiitdm-kurnool",
          logo_path: "dsc_logo.png",
          duration: "Jan 2018 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "We have well established developer club in college which is directly associated with Google Developers. We have developed many interdisciplinary projects under the membership of this club. We have organised workshops and activities on Android Application Development, Flutter and React JS.",
          color: "#0C9D58",
        },
        {
          title: "Developer Program Member",
          company: "Github",
          company_url: "https://github.com/",
          logo_path: "github_logo.png",
          duration: "July 2019 - PRESENT",
          location: "Work From Home",
          description:
            "I am actively contributing to many opensource projects. I have contributed to projects of organisations like Tensorflow, Uber, Facebook, Google, Scikit-learn, Kiwix, Sympy, Python, NVLabs, Fossasia, Netrack, Keras etc. These contributions include bug fixes, feature requests and formulating proper documentation for project.",
          color: "#181717",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader: ProjectsHeader = {
  title: "Projects",
  description: "",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader: PublicationsHeader = {
  title: "Publications",
  description:
    "I have worked on and published a few research papers and publications of my own.",
  avatar_image_path: "projects_image.svg",
};

const patentsHeader: PatentsHeader = {
  title: "Patents",
  description: "Patented and patent pending inventions*",
  caption:
    "*Showing live results from the US Patent Office by means of the USPTO Open Data Portal APIs.",
  avatar_image_path: "projects_image.svg",
};

export {
  seo,
  illustration,
  greeting,
  socialMediaLinks,
  skillsSection,
  educationInfo,
  workExperiences,
  bigProjects,
  hobbieSection,
  certifications,
  degrees,
  contactPageData,
  competitiveSites,
  experience,
  projectsHeader,
  publicationsHeader,
  patentsHeader,
};
