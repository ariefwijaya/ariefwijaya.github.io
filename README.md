# Arief Wijaya — portfolio & My World

English-only static portfolio for GitHub Pages. The main page provides the complete CV-derived content in initial HTML; `/world/` adds an optional playable Three.js experience with three environments.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ or http://127.0.0.1:4173/world/. A prebuilt local bundle is included, so previewing needs no dependency installation. The legacy `/id/` URL redirects to the English homepage.

## Editing

- `index.html`: complete static content, native experience/project disclosures, metadata and ProfilePage/Person JSON-LD.
- `assets/styles.css` / `assets/site.js`: editorial paper layout, chapter selection, synthetic document example and clipboard enhancement.
- `assets/arief-wijaya-cv.pdf`: original selectable-text CV supplied by Arief; preserve this stable download URL.
- `world/index.html` / `world/world.css`: accessible world controls, story dialogs, responsive layout and text fallback.
- `world/src/app.js`: renderer lifecycle, animation blending, controls, guided tour, story UI and optional audio.
- `world/src/scene.js`: real 3D scene assembly, materials, lighting and interactive props.
- `world/src/motion.js` / `layout.js`: navigation, character clearance, frame-independent damping and physical boundaries.
- `world/src/content.js`: shared narrative for the three environments. Keep facts consistent with the initial HTML.
- `world/models/` and `world/credits.html`: local CC0 assets and credits. Three.js is MIT licensed. The robot is a fictional explorer, not a portrait.

After editing the world source:

```sh
npm ci
npm run build
npm test
python3 -m unittest discover -s tests -v
node --check assets/site.js
```

Commit `world/world.bundle.js` with source changes when publication is requested. No external CDN or runtime API is required. Three.js and its models are loaded only on `/world/`.

## Content and design boundaries

AnyCheck is a product within Fintelite Group and Arief’s chosen proudest work. Infrastructure savings belong to his broader Fintelite role, not solely AnyCheck; the numeric result appears once on the homepage. All eight roles and eight project entries are available without entering the game. Some dates overlap. Location is Indonesia because the CV and earlier site named different cities.

The invoice demo uses a fixed synthetic example. It does not perform OCR. Generated reporting art is labelled conceptual. Models use a lightweight stylised treatment; the approved photoreal paper concepts establish art direction, not pixel-identical runtime fidelity.

The source contracts and navigation tests are separate from live browser checks recorded in `design-qa.md`. Static markup improves machine readability; search indexing, ranking, proprietary recruiter scraper support and ATS acceptance cannot be guaranteed. Physical-device performance and WebGL support vary.

## Publishing

Nothing is published by previewing or building locally. Keep the root-based GitHub Pages layout and use the user’s requested release process. Do not commit, push, or publish without authorization.
