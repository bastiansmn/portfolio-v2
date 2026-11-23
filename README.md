# Portfolio — Bastian SOMON

Portfolio et blog technique de Bastian SOMON, ingénieur Cloud / DevOps / Architecture.

🌐 [www.bastian-somon.fr](https://www.bastian-somon.fr)

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, export statique)
- React 19 · TypeScript
- Tailwind CSS 4
- MDX pour les articles de blog (`next-mdx-remote`, `gray-matter`)

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est alors disponible sur [http://localhost:3000](http://localhost:3000).

## Modifier le contenu

L'essentiel du contenu est séparé du code :

| Contenu | Fichier |
| --- | --- |
| Nom, rôles, bio, certifications, liens de contact | `data/profile.ts` |
| Projets | `data/projects.ts` |
| Expériences | `data/experience.ts` |
| Compétences | `data/stack.ts` |
| Articles de blog | `content/blog/*.mdx` |

### Ajouter un article

Créer un fichier `content/blog/mon-article.mdx` avec un en-tête :

```mdx
---
title: "Titre de l'article"
date: "2026-01-01"
description: "Résumé court affiché dans la liste des articles."
tags: ["kubernetes", "devops"]
---

Contenu en Markdown / MDX…
```

Le nom du fichier sert de slug : l'article sera accessible sur `/blog/mon-article`.

## CV PDF

Le CV est généré à partir des mêmes données que le site (`data/`) : une seule source de vérité.

```bash
npx playwright install chromium   # la première fois seulement
npm run cv                        # → dist/cv/CV-Bastian-SOMON.pdf
```

Le gabarit est dans `scripts/cv/generate.ts`. Les projets sont intégrés aux expériences :
un projet qui porte le nom d'une expérience lui apporte son lien, et un projet au nom différent
s'y rattache via son champ `experience` dans `data/projects.ts`. Le script prévient si le CV
dépasse une page ou si un projet n'est rattaché à aucune expérience.

**Sur GitHub**, le workflow `.github/workflows/cv.yml` régénère le PDF à chaque modification
de `data/` (push sur `main` ou pull request). Pour le récupérer : onglet **Actions** →
**Générer le CV PDF** → dernier run → section **Artifacts**. Le bouton **Run workflow** permet
aussi de le relancer à la main.

## Build et déploiement

```bash
npm run build   # génère le site statique dans ./out
```

Le déploiement est automatique : chaque push sur `main` déclenche le workflow
`.github/workflows/nextjs.yml`, qui construit le site et le publie sur GitHub Pages
(domaine personnalisé défini dans `public/CNAME`).
