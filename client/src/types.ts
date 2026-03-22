export type Project = {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  role: string;
  liveDemo: string;
  github: string;
  note?: string;
  internalDemo?: boolean;
  primaryActionLabel?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type PortfolioContent = {
  name: string;
  title: string;
  intro: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  heroStats: { label: string; value: string }[];
  skills: SkillGroup[];
  projects: Project[];
};
