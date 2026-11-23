/**
 * Génère le CV PDF à partir des données du portfolio (dossier data/).
 *
 *   npm run cv
 *
 * Sortie : dist/cv/CV-<Nom>.pdf (+ le HTML intermédiaire, utile pour ajuster la mise en page).
 * Navigateur : Chromium de Playwright (`npx playwright install chromium`),
 * ou un Chrome installé (variable CHROME_PATH, ou Chrome détecté automatiquement).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium, type Browser } from "playwright";

import { profile, bioLineText } from "../../data/profile";
import { experiences, employers, type Experience } from "../../data/experience";
import { projects } from "../../data/projects";
import { stack, type Skill } from "../../data/stack";

/* ------------------------------------------------------------------ */
/* Réglages                                                            */
/* ------------------------------------------------------------------ */

const OPTIONS = {
  outDir: path.join(process.cwd(), "dist", "cv"),
};

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const req = createRequire(path.join(process.cwd(), "package.json"));

function fontFace(family: string, pkgFile: string, style = "normal") {
  const data = fs.readFileSync(req.resolve(pkgFile)).toString("base64");
  return `@font-face{font-family:"${family}";font-style:${style};font-weight:100 900;font-display:block;src:url(data:font/woff2;base64,${data}) format("woff2");}`;
}

const LEVEL_DOTS: Record<Skill["level"], number> = {
  expert: 3,
  avancé: 2,
  intermédiaire: 1,
};

function dots(level: Skill["level"]) {
  const n = LEVEL_DOTS[level];
  const items = [0, 1, 2].map((i) => `<i${i < n ? ' class="on"' : ""}></i>`).join("");
  return `<span class="dots" title="${esc(level)}">${items}</span>`;
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ------------------------------------------------------------------ */
/* Gabarit HTML                                                        */
/* ------------------------------------------------------------------ */

function renderHtml(): string {
  const today = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date());

  const contact = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: profile.website.label, href: profile.website.url },
    { label: profile.github.label, href: profile.github.url },
    { label: profile.linkedin.label, href: profile.linkedin.url },
  ];

  const sidebar = `
    <section>
      <h2>Contact</h2>
      <ul class="contact">
        ${contact.map((c) => `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`).join("")}
        <li class="muted">${esc(profile.location)}</li>
      </ul>
    </section>

    ${
      profile.certifications.length
        ? `<section>
      <h2>Certifications</h2>
      <ul class="plain">${profile.certifications.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    </section>`
        : ""
    }

    <section>
      <h2>Compétences</h2>
      ${stack
        .map(
          (cat) => `
        <div class="skill-cat">
          <h3>${esc(cat.category)}</h3>
          <ul class="skills">
            ${cat.skills
              .map(
                (s) =>
                  `<li><span>${esc(s.name)}${s.certified ? ' <em class="cert">certifié</em>' : ""}</span>${dots(s.level)}</li>`
              )
              .join("")}
          </ul>
        </div>`
        )
        .join("")}
      <p class="legend">${dots("expert")} expert · ${dots("avancé")} avancé · ${dots("intermédiaire")} intermédiaire</p>
    </section>`;

  // Les projets sont intégrés aux expériences : un projet qui porte le nom
  // d'une expérience lui apporte son lien ; un projet rattaché via son champ
  // `experience` y est listé avec sa description.
  const key = (s: string) => s.trim().toLowerCase();
  const shortUrl = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const experienceKeys = new Set(experiences.map((e) => key(e.project)));
  const orphans = projects.filter((p) => !experienceKeys.has(key(p.experience ?? p.name)));
  if (orphans.length) {
    console.warn(
      `⚠ Projets non affichés dans le CV (aucune expérience correspondante) : ${orphans
        .map((p) => p.name)
        .join(", ")}. Renseignez leur champ \`experience\` dans data/projects.ts.`
    );
  }

  const renderEntry = (e: Experience, hideClient: boolean) => {
    const url = projects.find((p) => key(p.name) === key(e.project))?.url;
    const related = projects.filter(
      (p) => key(p.name) !== key(e.project) && p.experience && key(p.experience) === key(e.project)
    );
    const meta = [
      ...(hideClient ? [] : [esc(e.company), ...(e.location ? [esc(e.location)] : [])]),
      ...(url ? [`<a class="link" href="${esc(url)}">${esc(shortUrl(url))}</a>`] : []),
    ].join(" · ");
    return `
      <article class="entry">
        <header>
          <div>
            <h3>${esc(e.project)} <span class="role">— ${esc(e.role)}</span></h3>
            ${meta ? `<p class="meta">${meta}</p>` : ""}
          </div>
          <span class="period">${esc(e.period)}</span>
        </header>
        <p class="desc">${esc(e.description)}</p>
        ${
          e.achievements.length
            ? `<ul class="bullets">${e.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`
            : ""
        }
        ${related
          .map(
            (p) => `
        <div class="sub">
          <p><strong>${esc(p.name)}</strong>${p.year ? ` <span class="period">${esc(p.year)}</span>` : ""}${
            p.url ? ` · <a class="link" href="${esc(p.url)}">${esc(shortUrl(p.url))}</a>` : ""
          }</p>
          <p>${esc(p.description)}</p>
        </div>`
          )
          .join("")}
        <p class="tags">${e.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</p>
      </article>`;
  };

  // Expériences consécutives chez un même employeur → un seul bloc, avec la
  // période globale (calculée à partir des missions) et une ligne qui les relie.
  const groups: { employer?: string; items: Experience[] }[] = [];
  for (const e of experiences) {
    const last = groups[groups.length - 1];
    if (last && e.employer && last.employer === e.employer) last.items.push(e);
    else groups.push({ employer: e.employer, items: [e] });
  }

  const groupPeriod = (items: Experience[]) => {
    const years = items.flatMap((e) => (e.period.match(/\d{4}/g) ?? []).map(Number));
    if (!years.length) return "";
    const ongoing = items.some((e) => /présent/i.test(e.period));
    return `${Math.min(...years)} — ${ongoing ? "Présent" : Math.max(...years)}`;
  };

  const experienceHtml = groups
    .map(({ employer, items }) => {
      if (!employer) return items.map((e) => renderEntry(e, false)).join("");
      const info = employers.find((x) => key(x.name) === key(employer));
      const clients = [...new Set(items.map((e) => e.company))];
      const locations = [...new Set(items.map((e) => e.location).filter(Boolean))];
      const sameClient = clients.length === 1;
      const sub = [
        `${items.length} mission${items.length > 1 ? "s" : ""}`,
        ...(sameClient ? [`client : ${esc(clients[0])}`] : []),
        ...(sameClient && locations.length === 1 ? [esc(locations[0]!)] : []),
      ].join(" · ");
      return `
      <div class="employer">
        <header>
          <div>
            <h3>${esc(employer)}${
              info?.url ? ` <a class="link" href="${esc(info.url)}">↗</a>` : ""
            }</h3>
            <p class="meta">${sub}</p>
          </div>
          <span class="period">${esc(groupPeriod(items))}</span>
        </header>
        <div class="missions">${items.map((e) => renderEntry(e, sameClient)).join("")}</div>
      </div>`;
    })
    .join("");


  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>CV — ${esc(profile.name)}</title>
<style>
${fontFace("Inter", "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")}
${fontFace("Inter", "@fontsource-variable/inter/files/inter-latin-wght-italic.woff2", "italic")}
${fontFace("JetBrains Mono", "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2")}

/* Pleine page : les marges sont gérées par le padding. Le fond de la barre
   latérale est peint par le fond racine, il suit donc si le CV passe à 2 pages. */
@page { size: A4; margin: 0; }
:root {
  --ink: #18181b;        /* zinc-900 */
  --muted: #52525b;      /* zinc-600 */
  --faint: #a1a1aa;      /* zinc-400 */
  --line: #e4e4e7;       /* zinc-200 */
  --side: #f4f4f5;       /* zinc-100 */
  --accent: #15803d;     /* green-700 : le vert du site, lisible à l'impression */
  --mono: "JetBrains Mono", ui-monospace, monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { background: linear-gradient(to right, var(--side) 62mm, #fff 62mm); }
html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font: 400 8.6pt/1.42 Inter, system-ui, sans-serif; color: var(--ink); }
a { color: inherit; text-decoration: none; }

.page { display: grid; grid-template-columns: 62mm 1fr; }
aside { padding: 12mm 7mm 10mm 9mm; font-size: 8.2pt; }
main { padding: 12mm 11mm 10mm 9mm; }

/* En-tête */
.top { margin-bottom: 6mm; }
.prompt { font: 500 7.5pt var(--mono); color: var(--accent); margin-bottom: 1.5mm; }
h1 { font-size: 24pt; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; }
.title { font: 500 11pt var(--mono); color: var(--accent); margin-top: 1.5mm; }

/* Titres de section façon terminal, comme sur le site */
h2 { font: 600 8pt var(--mono); color: var(--ink); margin: 0 0 2.2mm; padding-bottom: 1.2mm; border-bottom: 0.4mm solid var(--line); }
h2::before { content: "# "; color: var(--accent); }
section + section { margin-top: 4.5mm; }

/* Barre latérale */
.contact li, .plain li { list-style: none; margin-bottom: 1mm; overflow-wrap: anywhere; }
.contact a { color: var(--ink); }
.muted { color: var(--muted); }
.skill-cat + .skill-cat { margin-top: 2.1mm; }
h3 { font-size: 8.6pt; font-weight: 600; }
.skill-cat h3 { font-size: 7.6pt; color: var(--muted); font-weight: 600; margin-bottom: 0.8mm; }
.skills li { list-style: none; display: flex; justify-content: space-between; gap: 2mm; line-height: 1.4; }
.dots { display: inline-flex; gap: 0.6mm; align-self: center; flex: none; }
.dots i { width: 1.5mm; height: 1.5mm; border-radius: 50%; background: #d4d4d8; }
.dots i.on { background: var(--accent); }
.cert { font: normal 600 6.2pt var(--mono); color: var(--accent); }
.legend { margin-top: 2.5mm; font-size: 6.6pt; color: var(--muted); }
.legend .dots { vertical-align: 0.1mm; }
.legend .dots i { width: 1.2mm; height: 1.2mm; }

/* Colonne principale */
.bio li { list-style: none; position: relative; padding-left: 4mm; margin-bottom: 0.8mm; }
.bio li::before { content: ">"; position: absolute; left: 0; color: var(--accent); font-family: var(--mono); font-weight: 600; }

.employer > header { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; margin-bottom: 2mm; }
.employer > header h3 { font-size: 10.4pt; font-weight: 700; }
.employer > header .link { font-size: 8pt; vertical-align: 0.4mm; }
.missions { border-left: 0.5mm solid #bbf7d0; padding-left: 4mm; margin-left: 0.8mm; }
.missions .entry { position: relative; }
.missions .entry::before { content: ""; position: absolute; left: calc(-4mm - 1.3mm); top: 1.1mm; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: #fff; border: 0.45mm solid var(--accent); }
.missions .entry + .entry::before { top: calc(2.6mm + 1.1mm); }
.entry { break-inside: avoid; padding-bottom: 2.6mm; }
.entry + .entry { padding-top: 2.6mm; border-top: 0.3mm dashed var(--line); }
.entry header { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
.entry h3 { font-size: 9.6pt; }
.role { color: var(--accent); font-weight: 600; }
.meta { color: var(--muted); font-size: 7.8pt; }
.period { font: 500 7.2pt var(--mono); color: var(--muted); white-space: nowrap; }
.desc { margin-top: 1.2mm; }
.bullets { margin-top: 1mm; }
.bullets li { list-style: none; position: relative; padding-left: 3.5mm; color: #3f3f46; }
.bullets li::before { content: "›"; position: absolute; left: 0.5mm; color: var(--accent); font-weight: 700; }
.tags { margin-top: 1.4mm; display: flex; flex-wrap: wrap; gap: 1mm; }
.tags span { font: 500 6.6pt var(--mono); color: var(--muted); background: var(--side); border: 0.25mm solid var(--line); border-radius: 0.8mm; padding: 0.2mm 1.4mm; }

.link { font: 500 7pt var(--mono); color: var(--accent); }
.sub { margin-top: 1.4mm; padding: 1.2mm 0 1.2mm 3mm; border-left: 0.5mm solid #bbf7d0; color: #3f3f46; }
.sub .period { margin-left: 1mm; }

footer { margin-top: 4mm; font: 400 6.6pt var(--mono); color: var(--faint); }
</style>
</head>
<body>
  <div class="page">
    <aside>${sidebar}</aside>
    <main>
      <div class="top">
        <p class="prompt">bastian@portfolio:~$ whoami</p>
        <h1>${esc(profile.name)}</h1>
        <p class="title">${esc(profile.roles[0] ?? "")}</p>
      </div>

      <section>
        <h2>Profil</h2>
        <ul class="bio">${profile.bio.map((l) => `<li>${esc(bioLineText(l))}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>Expérience</h2>
        ${experienceHtml}
      </section>

      <footer>CV généré depuis ${esc(profile.website.label)} · ${esc(today)}</footer>
    </main>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Impression                                                          */
/* ------------------------------------------------------------------ */

async function launchBrowser(): Promise<Browser> {
  if (process.env.CHROME_PATH) {
    return chromium.launch({ executablePath: process.env.CHROME_PATH });
  }
  try {
    return await chromium.launch();
  } catch (err) {
    try {
      return await chromium.launch({ channel: "chrome" });
    } catch {
      throw new Error(
        "Aucun navigateur trouvé. Lancez `npx playwright install chromium` " +
          "ou définissez CHROME_PATH vers un Chrome/Chromium installé.\n" +
          String(err)
      );
    }
  }
}

async function main() {
  fs.mkdirSync(OPTIONS.outDir, { recursive: true });
  const base = `CV-${slug(profile.name)}`;
  const htmlPath = path.join(OPTIONS.outDir, `${base}.html`);
  const pdfPath = path.join(OPTIONS.outDir, `${base}.pdf`);

  const html = renderHtml();
  fs.writeFileSync(htmlPath, html);

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }

  const pages = (fs.readFileSync(pdfPath, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  if (pages > 1) {
    console.warn(`⚠ Le CV fait ${pages} pages : pensez à raccourcir le contenu ou à masquer la section Projets.`);
  }
  console.log(`✓ CV généré : ${path.relative(process.cwd(), pdfPath)} (${pages} page${pages > 1 ? "s" : ""})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
