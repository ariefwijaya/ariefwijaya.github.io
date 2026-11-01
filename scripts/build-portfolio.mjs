import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const {cases, catalogue, featured, openSource} = JSON.parse(await readFile(path.join(root, 'content/projects.json'), 'utf8'));
const {images} = JSON.parse(await readFile(path.join(root, 'assets/projects/media.json'), 'utf8'));
const media = new Map(images.map(image => [path.basename(image.src, '.webp'), image]));
const origin = 'https://ariefwijaya.github.io';
const email = 'ariefwijayafirman@gmail.com';
const esc = value => String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
const icons = '<link rel="icon" type="image/svg+xml" href="/assets/brand/favicon.svg?v=1"><link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png?v=1"><link rel="alternate icon" href="/assets/brand/favicon.ico?v=1"><link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">';
const kindLabels = {'runtime-demo': 'Product view', 'local-qa': 'Product view', archive: 'From the archive', promotional: 'Product presentation', presentation: 'Project presentation', 'public-reference': 'Official product guide'};
const casesBySlug = new Map(cases.map(project => [project.slug, project]));
const projects = [...cases, ...catalogue.filter(project => !project.case).map(project => ({
  ...project,
  summary: project.description,
  intro: project.description,
  headline: project.headline || project.highlights[0] || project.category,
  coverAlt: media.get(project.cover)?.caption || project.gallery[0].alt,
  sections: [{title: 'My contribution', paragraphs: [project.contribution]}, {title: 'Product flows', items: project.highlights}],
  galleryTitle: 'Selected interface views',
}))];
if (new Set(projects.map(project => project.slug)).size !== projects.length) throw new Error('Duplicate project route');
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.slug || '')) throw new Error(`Missing or unsafe project slug: ${project.name}`);
}
for (const project of catalogue) {
  if (project.case && !casesBySlug.has(project.case)) throw new Error(`Unknown case reference: ${project.case}`);
}

function mediaLabel(image) {
  if (image.reference_type === 'public-listing') return 'Published app view';
  if (image.reference_type === 'app-store') return 'App Store product view';
  return kindLabels[image.kind] || 'Project visual';
}

function imageMarkup(stem, alt, sizes, eager = false) {
  const image = media.get(stem);
  if (!image) throw new Error(`No reviewed media for ${stem}`);
  const small = media.get(`${stem}-800`);
  const srcset = small ? `${small.src} ${small.width}w, ${image.src} ${image.width}w` : `${image.src} ${image.width}w`;
  return `<img src="${esc(small?.src || image.src)}" srcset="${esc(srcset)}" sizes="${esc(sizes)}" width="${small?.width || image.width}" height="${small?.height || image.height}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}

function identity(project, eager = false) {
  const image = media.get(project.logo);
  if (!image || image.kind !== 'identity') throw new Error(`Missing project identity: ${project.name}`);
  return `<span class="project-logo${project.logoTheme === 'dark' ? ' project-logo--dark' : ''}">${imageMarkup(project.logo, `${project.name} ${image.identity_origin === 'portfolio-wordmark' ? 'wordmark' : 'logo'}`, '150px', eager)}</span>`;
}

function figure(item, eager = false, gallery = false) {
  const image = media.get(item.image);
  const portrait = image.height > image.width * 1.3;
  const caption = `${mediaLabel(image)}. ${image.caption}`;
  const sizes = gallery ? '(max-width: 600px) 44vw, (max-width: 1000px) 44vw, 400px' : '(max-width: 760px) 90vw, 600px';
  const viewer = ` data-gallery-image data-caption="${esc(caption)}"`;
  return `<figure class="case-figure${portrait ? ' case-figure--portrait' : ''}"><a href="${esc(image.src)}" target="_blank" rel="noopener"${viewer} aria-label="Open ${esc(item.alt)} at full size (new tab without JavaScript)">${imageMarkup(item.image, item.alt, sizes, eager)}${gallery ? '<span class="gallery-enlarge" aria-hidden="true">Enlarge ↗</span>' : ''}</a><figcaption><span class="media-label">${mediaLabel(image)}</span>${esc(gallery ? item.title || item.alt : image.caption)} <a href="${esc(image.src)}" target="_blank" rel="noopener">Full-size image <span class="sr-only">(new tab)</span>↗</a></figcaption></figure>`;
}

function card(project) {
  const preview = imageMarkup(project.cover, `${mediaLabel(media.get(project.cover))}: ${project.coverAlt}`, '(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 400px');
  return `<article class="work-project" id="${esc(project.slug)}"><a class="work-card" href="/work/${esc(project.slug)}/"><div class="work-card-visual">${preview}</div><div class="work-card-copy"><div class="work-card-heading">${identity(project)}<div><h3>${esc(project.name)}</h3><p class="case-category">${esc(project.category)}</p></div></div><p class="work-card-description">${esc(project.headline)}</p><div class="work-card-footer"><span>${esc(project.cardRole || project.role)}</span><span class="accent">View project ↗</span></div></div></a></article>`;
}

function referenceLinks(project) {
  return project.publicReferences?.length ? `<p class="project-references">${project.publicReferences.map(item => `<a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.label)} <span aria-hidden="true">↗</span><span class="sr-only"> (new tab)</span></a>`).join('')}</p>` : '';
}

function replaceRegion(html, name, content) {
  const start = `<!-- portfolio:${name}:start -->`;
  const end = `<!-- portfolio:${name}:end -->`;
  const first = html.indexOf(start);
  const last = html.indexOf(end);
  if (first < 0 || last < first) throw new Error(`Missing or invalid ${name} region in index.html`);
  return html.slice(0, first + start.length) + '\n' + content + '\n' + html.slice(last);
}

let home = await readFile(path.join(root, 'index.html'), 'utf8');
const selected = featured.map(slug => {
  const project = casesBySlug.get(slug);
  if (!project) throw new Error(`Unknown featured case: ${slug}`);
  return project;
});
const ordered = [...selected, ...projects.filter(project => !featured.includes(project.slug))];
for (const project of ordered) {
  if (!project.context?.trim() || !project.stack?.length) {
    throw new Error(`Incomplete project facts: ${project.slug}`);
  }
}
home = replaceRegion(home, 'work', `<p class="section-note work-intro">Applications, platforms and the engineering behind them. Explore each project, my contribution and the interface.</p><div class="work-grid">${ordered.map(card).join('\n')}</div>`);
home = replaceRegion(home, 'public-source', openSource.map(project => `<a class="repo" href="${esc(project.url)}"><span class="repo-title">${identity(project)}<strong>${esc(project.name)}</strong></span><span>${esc(project.summary)}</span><span class="accent" aria-hidden="true">↗</span></a>`).join('\n'));
await writeFile(path.join(root, 'index.html'), home);

for (const [index, project] of ordered.entries()) {
  const first = project.cover && media.get(project.cover)?.kind === 'presentation'
    ? {image: project.cover, alt: project.coverAlt}
    : project.gallery.find(item => item.image === project.cover) || project.gallery[0];
  const remaining = project.gallery.filter(item => item.image !== first?.image);
  const next = ordered[(index + 1) % ordered.length];
  const pageLabel = 'Project';
  const structured = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CreativeWork',
    name: `${project.name} — project case study`, url: `${origin}/work/${project.slug}/`,
    description: project.summary,
    creator: {'@type': 'Person', name: 'Arief Wijaya', url: origin + '/'},
  }).replace(/</g, '\\u003c');
  const content = project.sections.map(section => `<section class="case-section"><h2>${esc(section.title)}</h2>${(section.paragraphs || []).map(text => `<p>${esc(text)}</p>`).join('')}${section.items ? `<ul>${section.items.map(text => `<li>${esc(text)}</li>`).join('')}</ul>` : ''}</section>`).join('\n');
  const ogImage = project.cover ? origin + media.get(project.cover).src : `${origin}/assets/social-card.png`;
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(project.name)} — Case study · Arief Wijaya</title>
<meta name="description" content="${esc(project.summary)} ${esc(project.role)} by Arief Wijaya.">
<meta name="theme-color" content="#f8f7f1">
<link rel="canonical" href="${origin}/work/${esc(project.slug)}/">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(project.name)} — Arief Wijaya">
<meta property="og:description" content="${esc(project.summary)}">
<meta property="og:url" content="${origin}/work/${esc(project.slug)}/">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
${icons}
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=d56825b16f22">
<link rel="stylesheet" href="/assets/portfolio.css?v=1">
<script type="application/ld+json">${structured}</script>
</head>
<body class="case-page" id="top">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header wrap case-header"><a class="brand portfolio-brand" href="/" aria-label="Arief Wijaya, home"><img src="/assets/brand/mark.svg" width="38" height="38" alt="" aria-hidden="true"><span>Arief Wijaya<span class="accent">.</span></span></a><nav class="main-nav" aria-label="Main navigation"><a href="/#work">Work</a><a href="/#experience">Experience</a><a href="/#contact">Contact</a></nav><a class="cv-link" href="/assets/arief-wijaya-cv.pdf" download>Download CV ↓</a></header>
<main id="main" class="wrap">
<nav class="case-breadcrumb" aria-label="Breadcrumb"><a href="/#${esc(project.slug)}">← All projects</a><span aria-hidden="true">/</span><span aria-current="page">${esc(project.name)}</span></nav>
<section class="case-intro" aria-labelledby="case-title"><div><p class="eyebrow">${pageLabel} <span>/</span> ${esc(project.category)}</p>${identity(project, true)}<h1 id="case-title">${esc(project.name)}<span class="accent">.</span></h1><h2>${esc(project.headline)}</h2><p class="case-summary">${esc(project.intro)}</p></div><aside class="case-facts" aria-label="Project context"><dl><div><dt>My contribution</dt><dd>${esc(project.role)}</dd></div>${project.context ? `<div><dt>Context</dt><dd>${esc(project.context)}</dd></div>` : ''}${project.stack?.length ? `<div><dt>Working across</dt><dd>${project.stack.map(esc).join(' · ')}</dd></div>` : ''}</dl><a class="text-link" href="mailto:${email}">Discuss a similar project ↗</a></aside></section>
${first ? `<div class="case-lead-image">${figure(first, true)}</div>` : ''}
<div class="case-copy">${content}</div>${referenceLinks(project)}
${remaining.length ? `<section class="case-gallery" aria-labelledby="gallery-title"><p class="eyebrow">The interface</p><h2 id="gallery-title">${esc(project.galleryTitle)}<span class="accent">.</span></h2><p class="gallery-note">Select an image to enlarge it; use Actual size to inspect small details.${project.galleryNote ? ` ${esc(project.galleryNote)}` : ''}</p><div class="case-gallery-grid">${remaining.map(item => figure(item, false, true)).join('\n')}</div></section>` : ''}
<section class="case-enquiry" aria-labelledby="enquiry-title"><div><p class="eyebrow">A project in mind?</p><h2 id="enquiry-title">Tell me what you’re building<span class="accent">.</span></h2><p>Share the problem, who will use the product and what you already have. We can discuss the scope and whether I can help.</p></div><a class="button primary" href="mailto:${email}">Discuss your project <span aria-hidden="true">↗</span></a></section>
<nav class="case-pagination" aria-label="More case studies"><a class="text-link" href="/#${esc(project.slug)}">← Back to all projects</a><a class="text-link" href="/work/${esc(next.slug)}/">Next: ${esc(next.name)} →</a></nav>
</main>
<dialog class="project-viewer" id="project-viewer" aria-labelledby="viewer-title" aria-describedby="viewer-caption"><div class="viewer-shell"><header class="viewer-toolbar"><h2 id="viewer-title">Interface gallery</h2><p data-viewer-counter aria-live="polite"></p><button type="button" data-viewer-action="close" aria-label="Close image viewer">Close ×</button></header><div class="viewer-canvas" tabindex="0" aria-label="Image view; scroll to pan when actual size is enabled"></div><p id="viewer-caption" class="viewer-caption"></p><nav class="viewer-controls" aria-label="Image controls"><button type="button" data-viewer-action="previous" aria-label="Previous image">← Previous</button><button type="button" data-viewer-action="next" aria-label="Next image">Next →</button><button type="button" data-viewer-action="zoom" aria-pressed="false">Actual size</button><a data-viewer-original target="_blank" rel="noopener">Open original ↗</a></nav></div></dialog>
<script src="/assets/project-gallery.js?v=1" defer></script>
<footer class="wrap site-footer"><span>Arief Wijaya · Indonesia</span><a href="#top">Back to top ↑</a></footer>
</body>
</html>
`;
  const dir = path.join(root, 'work', project.slug);
  await mkdir(dir, {recursive: true});
  await writeFile(path.join(dir, 'index.html'), page);
}
const urls = [origin + '/', ...projects.map(project => `${origin}/work/${project.slug}/`)];
await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built ${projects.length} static project pages and one unified work index.`);
