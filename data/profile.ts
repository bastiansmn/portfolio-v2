// Informations personnelles partagées par le site (en-tête, contact)
// et par le CV PDF (scripts/cv/generate.ts).

export type Highlight = "amber" | "cyan" | "green";

/** Une ligne de bio : du texte simple et des passages mis en évidence. */
export type BioLine = (string | { text: string; highlight: Highlight })[];

export interface Profile {
  name: string;
  /** Rôles qui défilent dans l'en-tête du site. */
  roles: string[];
  location: string;
  /** Photo affichée dans le CV : chemin depuis la racine du dépôt, par ex. "assets/photo.jpg" (jpg, png ou webp). */
  photo?: string;
  bio: BioLine[];
  certifications: string[];
  email: string;
  website: { label: string; url: string };
  github: { label: string; url: string };
  linkedin: { label: string; url: string };
}

export const profile: Profile = {
  name: "Bastian SOMON",
  roles: [
    "Tech Lead",
    "Ingénieur en informatique",
    "Architecte cloud souverain",
    "Ingénieur DevOps / SRE",
    "Développeur full-stack",
  ],
  location: "Paris, France",
  photo: "assets/photo.jpg",
  bio: [
    [
      "4+ ans de conception de systèmes en environnements ",
      { text: "souverains", highlight: "amber" },
      " et complexes",
    ],
    ["Certifié ", { text: "Scaleway Solution Architect", highlight: "cyan" }],
    [
      "Spécialiste ",
      { text: "Cloud · DevOps · Architecture - Développement", highlight: "green" },
    ],
  ],
  certifications: ["Scaleway Solution Architect"],
  email: "bastian.somon@gmail.com",
  website: { label: "bastian-somon.fr", url: "https://www.bastian-somon.fr" },
  github: { label: "github.com/bastiansmn", url: "https://github.com/bastiansmn" },
  linkedin: {
    label: "linkedin.com/in/bastian-somon",
    url: "https://www.linkedin.com/in/bastian-somon-ba7673203/",
  },
};

/** Texte brut d'une ligne de bio (sans mise en forme). */
export function bioLineText(line: BioLine): string {
  return line.map((part) => (typeof part === "string" ? part : part.text)).join("");
}
