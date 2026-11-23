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
| Projets | `data/projects.ts` |
| Expériences | `data/experience.ts` |
| Compétences | `data/stack.ts` |
| Bio et rôles affichés en en-tête | `components/Hero.tsx` |
| Liens de contact | `components/Contact.tsx` |
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

## Build et déploiement

```bash
npm run build   # génère le site statique dans ./out
```

Le déploiement est automatique : chaque push sur `main` déclenche le workflow
`.github/workflows/nextjs.yml`, qui construit le site et le publie sur GitHub Pages
(domaine personnalisé défini dans `public/CNAME`).
