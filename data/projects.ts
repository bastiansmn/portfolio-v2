export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
  tags: string[];
  status: "production" | "beta" | "wip";
  year?: string;
}

export const projects: Project[] = [
  {
    name: "SignalIGPN",
    description:
      "Plateforme officielle de signalements citoyens et internes pour l'Inspection Générale de la Police Nationale (IGPN). Développement et déploiement en environnement souverain.",
    tags: ["Souverain", "Kubernetes", "Scaleway", "Ministère"],
    status: "production",
    year: "2022-2024",
  },
  {
    name: "MirAI",
    description:
      "Portail IA du ministère de l'intérieur. Déploiement d'API IA (LLM, OCR, transcription audio, diarization, etc). Accès unifié et sécurisé aux LLM pour les agents du ministère, incubé à beta.gouv.fr.",
    url: "https://beta.gouv.fr/startups/m-ir-ai.html",
    tags: ["IA", "LLM", "Beta.gouv", "Ministère"],
    status: "production",
    year: "2025-2026",
  },
  {
    name: "Selfim",
    description:
      "Plateforme de détection et de lutte contre la fraude documentaire et identitaire. Architecture orientée analyse et data-intensive.",
    tags: ["Anti-fraude", "Data"],
    status: "production",
    year: "2024-2025",
  },
];
