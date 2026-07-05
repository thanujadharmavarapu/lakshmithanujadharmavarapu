export interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  github?: string;
  image?: string;
}

export interface Experience {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
}

export const defaultSkills: Skill[] = [
  { name: "Python", category: "Programming", level: 85 },
  { name: "JavaScript", category: "Programming", level: 78 },
  { name: "HTML", category: "Web Development", level: 90 },
  { name: "CSS", category: "Web Development", level: 88 },
  { name: "Power BI", category: "Data Analysis", level: 85 },
  { name: "Data Analysis", category: "Data Analysis", level: 82 },
  { name: "Data Visualization", category: "Data Analysis", level: 84 },
  { name: "Excel / DAX", category: "Data Analysis", level: 78 },
  { name: "Arduino", category: "IoT & Hardware", level: 88 },
  { name: "Raspberry Pi", category: "IoT & Hardware", level: 82 },
  { name: "ESP32", category: "IoT & Hardware", level: 90 },
  { name: "Sensors", category: "IoT & Hardware", level: 85 },
  { name: "Embedded Systems", category: "IoT & Hardware", level: 80 },
  { name: "YOLO / AI Detection", category: "AI", level: 75 },
  { name: "Lovable", category: "AI Tools", level: 88 },
  { name: "Cursor", category: "AI Tools", level: 82 },
  { name: "Claude", category: "AI Tools", level: 85 },
  { name: "Antigravity", category: "AI Tools", level: 78 },
];

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "SentinelX",
    subtitle: "Smart IoT-Based Intrusion Detection and Automated Defense System",
    description:
      "Designed and developed an IoT-based intrusion detection system integrating ESP32-CAM, PIR, and ultrasonic sensors with AI-powered human detection for accurate, real-time threat response.",
    features: [
      "IoT intrusion detection using ESP32-CAM, PIR and ultrasonic sensors",
      "AI (YOLO) human detection to reduce false alarms",
      "Real-time alerts and automated defense activation",
      "Cloud image storage integrated with Google Drive",
      "Web dashboard for remote monitoring and control",
    ],
    techStack: ["ESP32-CAM", "PIR Sensor", "Ultrasonic Sensor", "YOLO", "Python", "Google Drive API", "Web Dashboard"],
    github: "https://github.com/",
  },
];

export const defaultExperience: Experience[] = [
  {
    id: "1",
    year: "02/2026 – 03/2026",
    title: "Power BI Intern",
    organization: "Microsoft Elevate",
    description:
      "Designed and developed Power BI dashboards for data insights and visualization. Performed data transformation, modeling, and trend analysis. Created interactive and optimized dashboards for better usability, strengthening skills in data analytics, visualization, and business intelligence tools.",
  },
  {
    id: "2",
    year: "2025 – 2028",
    title: "B.Tech in IoT and Cybersecurity with Blockchain Technology",
    organization: "Sagi Rama Krishnam Raju Engineering College, Bhimavaram",
    description:
      "Pursuing engineering degree focused on IoT systems, cybersecurity, and blockchain technologies with hands-on project development.",
  },
  {
    id: "3",
    year: "2022 – 2025",
    title: "Diploma in Computer Science and Engineering",
    organization: "A.A.N.M & V.V.R.S.R Polytechnic, Gudlavalleru",
    description:
      "Completed diploma in Computer Science and Engineering with core focus on programming, systems, and software fundamentals.",
  },
];

export const defaultCertificates: Certificate[] = [
  {
    id: "1",
    title: "Microsoft Elevate — Power BI Internship",
    organization: "Microsoft",
    date: "2026",
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: "1",
    title: "SentinelX — IoT Security System",
    organization: "SRKR Engineering College",
    description:
      "Designed and deployed an end-to-end AI + IoT intrusion detection system with cloud integration and web dashboard.",
  },
  {
    id: "2",
    title: "Microsoft Elevate Internship Completion",
    organization: "Microsoft",
    description:
      "Successfully completed Power BI internship with hands-on experience in data visualization and dashboard development.",
  },
];

export function getData<T>(key: string, defaults: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaults;
}

export function setData<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
