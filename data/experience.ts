export interface Experience {
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
    company: "Ministère de l'Intérieur",
    project: "MirAI",
    role: "Ingénieur DevOps / Plateforme",
    period: "2024 — Présent",
    location: "Paris, France",
    description:
      "Déploiement, Amélioration continue, MCO et MCS de la plateforme d'IA souveraine \"MirAI\" dédiée au agents du ministère de l'intérieur",
    achievements: [
      "Conception et mise en production du portail IA MirAI",
      "Déploiement de service IA pour les agents (LLM, transcription audio, OCR, code-assistant, etc)",
      "Certification Scaleway Solution Architect",
    ],
    tags: ["Scaleway", "Kubernetes", "Terraform", "Docker", "GitLab CI", "Souverain"],
  },
  {
    company: "Ministère de l'Intérieur",
    project: "Cloud Pi Native",
    role: "Ingnieur DevOps",
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
