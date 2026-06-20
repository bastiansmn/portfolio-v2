export interface Skill {
  name: string;
  level: "expert" | "avancé" | "intermédiaire";
  certified?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const stack: SkillCategory[] = [
  {
    category: "Cloud & Infrastructure",
    skills: [
      { name: "Scaleway", level: "expert", certified: true },
      { name: "Kubernetes (K8s)", level: "expert" },
      { name: "OpenShift", level: "avancé" },
      { name: "Docker", level: "expert" },
      { name: "Linux", level: "expert" },
      { name: "OpenStack", level: "intermédiaire" },
      { name: "Terraform", level: "intermédiaire" },
    ],
  },
  {
    category: "Développement",
    skills: [
      { name: "TypeScript / JavaScript", level: "expert" },
      { name: "Angular", level: "expert" },
      { name: "Python", level: "expert" },
      { name: "Java / Spring Boot", level: "expert" },
      { name: "Node.js", level: "avancé" },
    ],
  },
  {
    category: "DevOps & CI/CD",
    skills: [
      { name: "GitLab CI", level: "expert" },
      { name: "ArgoCD", level: "expert" },
      { name: "GitHub Actions", level: "avancé" },
      { name: "Jenkins", level: "avancé" },
      { name: "Helm", level: "avancé" },
    ],
  },
  {
    category: "Observabilité",
    skills: [
      { name: "Grafana", level: "expert" },
      { name: "Alloy", level: "avancé" },
      { name: "Mimir", level: "avancé" },
      { name: "OpenTelemetry", level: "avancé" },
      { name: "Tempo", level: "avancé" },
    ],
  },
  {
    category: "Données & Messagerie",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "Redis", level: "avancé" },
      { name: "RabbitMQ", level: "avancé" },
      { name: "Apache Kafka", level: "intermédiaire" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "Apache Airflow", level: "expert" },
      { name: "Apache Superset", level: "avancé" },
      { name: "StarRocks", level: "avancé" },
      { name: "Apache Spark", level: "avancé" },
    ],
  },
  {
    category: "Intelligence artificielle",
    skills: [
      { name: "vLLM", level: "avancé" },
      { name: "LiteLLM", level: "avancé" },
      { name: "OpenWebUI", level: "avancé" },
      { name: "TEI", level: "avancé" },
      { name: "Nvidia H100 (MIG)", level: "avancé" },
    ],
  },
];
