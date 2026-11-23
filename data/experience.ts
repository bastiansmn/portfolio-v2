export interface Employer {
  name: string;
  /** Intitulé du poste chez cet employeur. */
  title?: string;
  url?: string;
}

/** Employeurs : les expériences qui partagent un employeur sont regroupées dans le CV. */
export const employers: Employer[] = [
  {
    name: "Act-On Technology",
    title: "Expert Technique",
    url: "https://www.linkedin.com/company/act-on-technology/",
  },
];

export interface Experience {
  /** Employeur (voir `employers`), quand l'expérience est une mission pour un client. */
  employer?: string;
  /** Client ou entreprise où se déroule la mission. */
  company: string;
  project: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    employer: "Act-On Technology",
    company: "Ministère de l'Intérieur",
    project: "XPN",
    role: "Tech Lead",
    period: "Septembre 2026 — Présent",
    location: "Paris, France",
    description:
      "Tech lead du projet XPN, qui remplace LRPPN, le logiciel de rédaction des procédures de la Police nationale.",
    achievements: [
      "Encadrement de l'équipe et montée en compétences techniques et fonctionnelles des profils",
      "Garantie de la qualité du code par les revues de code",
      "Accompagnement des profils juniors vers un usage massif de l'IA dans le développement (création d'agents, MCP, skills, commandes, etc.)",
    ],
    tags: ["Tech Lead", "Encadrement", "Code review", "IA générative", "Agents IA", "MCP"],
  },
  {
    employer: "Act-On Technology",
    company: "Ministère de l'Intérieur",
    project: "MirAI",
    role: "Ingénieur DevOps / Plateforme",
    period: "2025-2026",
    location: "Paris, France",
    description:
      "Déploiement, Amélioration continue, MCO et MCS de la plateforme d'IA souveraine \"MirAI\" dédiée aux agents du ministère de l'intérieur",
    achievements: [
      "Conception et mise en production du portail IA MirAI",
      "Déploiement de service IA pour les agents (LLM, transcription audio, OCR, code-assistant, etc)",
      "Certification Scaleway Solution Architect",
    ],
    tags: ["Scaleway", "Kubernetes", "Terraform", "Docker", "GitLab CI", "Souverain"],
  },
  {
    employer: "Act-On Technology",
    company: "Ministère de l'Intérieur",
    project: "Cloud Pi Native",
    role: "Ingénieur DevOps",
    period: "2024-2025",
    location: "Paris, France",
    description:
      "Référent architecture, déploiement et support technique N2/N3 sur des applications déployées sur un cloud souverain.",
    achievements: [
      "Support N2/N3 sur systèmes de production à différents niveaux de criticités",
      "Re-déploiement \"Cloud-Native\" de la plateforme Selfim",
    ],
    tags: ["Cloud-Native", "OpenShift", "GitLab CI", "DATA",]
  },
  {
    employer: "Act-On Technology",
    company: "Ministère de l'Intérieur",
    project: "SignalIGPN",
    role: "Développeur Full-stack",
    period: "2022-2024",
    location: "Paris, France",
    description: "Conception et développement d'une application pour la prise en charge et le traitement de signalement pour l'IGPN",
    achievements: [
      "Développement et déploiement de la plateforme SignalIGPN",
      "Ateliers fonctionnels avec le client",
      "Ateliers techniques interne de conception",
    ],
    tags: ["Java / Spring Boot", "Angular", "Kubernetes", "Docker", "Jenkins"]
  }
];
