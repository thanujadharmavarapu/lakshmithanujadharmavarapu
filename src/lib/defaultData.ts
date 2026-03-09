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
  { name: "C", category: "Programming", level: 75 },
  { name: "JavaScript", category: "Programming", level: 80 },
  { name: "HTML", category: "Web Development", level: 90 },
  { name: "CSS", category: "Web Development", level: 85 },
  { name: "React", category: "Web Development", level: 78 },
  { name: "ESP32", category: "IoT & Embedded", level: 88 },
  { name: "Arduino", category: "IoT & Embedded", level: 85 },
  { name: "Sensors", category: "IoT & Embedded", level: 82 },
  { name: "Embedded C", category: "IoT & Embedded", level: 76 },
  { name: "Computer Vision", category: "AI", level: 72 },
  { name: "Human Detection", category: "AI", level: 70 },
  { name: "Git", category: "Tools", level: 80 },
  { name: "Cloud Tools", category: "Tools", level: 68 },
];

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "SentinelX",
    subtitle: "Smart IoT-Based Intrusion Detection and Automated Defense System",
    description: "An advanced IoT security system that combines sensor arrays with AI-powered human detection for automated intrusion response.",
    features: [
      "Motion detection using PIR and Ultrasonic sensors",
      "ESP32-CAM image capture",
      "AI human verification",
      "Automated defense activation",
      "GSM alerts",
      "Cloud storage integration",
    ],
    techStack: ["ESP32", "Python", "Computer Vision", "Arduino", "GSM Module", "Cloud"],
    github: "https://github.com",
  },
];

export const defaultExperience: Experience[] = [
  {
    id: "1",
    year: "2026",
    title: "IoT Security Project Development",
    organization: "SRKR Engineering College",
    description: "Developed intelligent IoT-based security systems integrating embedded hardware with AI-powered threat detection and automated response mechanisms.",
  },
];

export const defaultCertificates: Certificate[] = [
  {
    id: "1",
    title: "IoT Fundamentals",
    organization: "Cisco Networking Academy",
    date: "2025",
  },
  {
    id: "2",
    title: "Python for Data Science",
    organization: "IBM",
    date: "2025",
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: "1",
    title: "SAMAGRA 2026 National Level Technical Event",
    organization: "SRKR Engineering College",
    description: "Project Presentation — Showcased SentinelX IoT security system.",
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
