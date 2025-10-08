// All site copy lives here so you can update it without touching HTML.
// TODO: Replace placeholder text, links, and image paths with your real portfolio details.

export const SITE_DATA = {
  tagline: "Drilling engineer who codes smarter workflows.",
  bio: "Perth based drilling engineer focused on offshore wells and practical software to reduce friction in drilling workflows. Python first, now learning modern web.",
  skills: [
    "Drilling engineering",
    "Well design",
    "Python",
    "Data viz",
    "HTML",
    "CSS",
    "JavaScript"
  ],
  email: "alastair@example.com",
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    cvUrl: "assets/Alastair_Punler_CV.pdf" // TODO: Add your actual CV file.
  },
  projects: [
    {
      title: "Bit Hydraulics Calculator",
      short: "Python app that sizes nozzles and visualizes pressure losses.",
      description: "Prototype desktop tool to evaluate nozzle configurations, standpipe pressures, and hydraulic horsepower before a run.",
      tech: ["Python", "Pandas", "Matplotlib"],
      image: "assets/thumbs/project-01.svg",
      github: "https://github.com/your-handle/hydraulics",
      live: ""
    },
    {
      title: "Rig Daily Dashboard",
      short: "Automated reporting with crew facing KPIs.",
      description: "A lightweight dashboard that ingests WITSML data, surfaces planned vs actual KPIs, and emails the crew daily highlights.",
      tech: ["Python", "Plotly", "Flask"],
      image: "assets/thumbs/project-02.svg",
      github: "https://github.com/your-handle/rig-dashboard",
      live: ""
    },
    {
      title: "Mud Property Tracker",
      short: "Handheld form that syncs lab readings to the cloud.",
      description: "Progressive web app for mud engineers to capture rheology data offline and sync to the central database when back on Wi-Fi.",
      tech: ["PWA", "IndexedDB", "Chart.js"],
      image: "assets/thumbs/project-03.svg",
      github: "https://github.com/your-handle/mud-tracker",
      live: ""
    },
    {
      title: "Well Path Visualiser",
      short: "3D deviation plots straight from survey files.",
      description: "Transforms raw survey CSVs into 3D path visualisations with collision detection alerts and exportable reports.",
      tech: ["Three.js", "Python", "NumPy"],
      image: "assets/thumbs/project-04.svg",
      github: "https://github.com/your-handle/well-path-viz",
      live: "https://your-site.com/well-path-demo"
    },
    {
      title: "Permit Tracker",
      short: "Keeps approvals aligned with operations.",
      description: "Internal tooling for drilling supervisors to track environmental and safety permits, with alerts for upcoming renewals.",
      tech: ["Django", "PostgreSQL", "Bootstrap"],
      image: "assets/thumbs/project-05.svg",
      github: "https://github.com/your-handle/permit-tracker",
      live: ""
    },
    {
      title: "Crew Learning Hub",
      short: "Micro learning modules for new hires.",
      description: "Bite-sized LMS built to upskill new crew members, hosting short quizzes and animations on rig procedures.",
      tech: ["Svelte", "Firebase", "Figma"],
      image: "assets/thumbs/project-06.svg",
      github: "https://github.com/your-handle/crew-learning",
      live: "https://your-site.com/crew-learning"
    }
  ]
};
