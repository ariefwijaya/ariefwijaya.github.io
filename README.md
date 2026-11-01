# Arief Wijaya — portfolio & My World

English-only static portfolio for GitHub Pages. The main page provides selected work, experience and contact in initial HTML; `/world/` adds an optional playable Three.js experience with three environments.

## Preview

```bash
python3 -m http.server 4173 --protocol HTTP/1.1 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ or http://127.0.0.1:4173/world/. A prebuilt local bundle is included, so previewing needs no dependency installation. The legacy `/id/` URL redirects to the English homepage.

## Editing

- `index.html`: static project index, native experience disclosures, contact, metadata and ProfilePage/Person JSON-LD.
- `assets/styles.css` / `assets/site.js`: editorial paper layout, chapter selection, synthetic document example and clipboard enhancement.
- `assets/arief-wijaya-cv.pdf`: original selectable-text CV supplied by Arief; preserve this stable download URL.
- `world/index.html` / `world/world.css`: accessible world controls, story dialogs, responsive layout and text fallback.
- `world/src/app.js`: renderer lifecycle, animation blending, controls, guided tour, story UI and optional audio.
- `world/src/scene.js`: real 3D scene assembly, materials, lighting and interactive props.
- `world/src/craft.js` / `explorer.js`: batched custom furniture and the articulated visitor with animation clips.
- `world/src/camera.js`: one perspective camera with Diorama, Third person, First person and Top view; drag/keyboard look, obstacle clearance and interruptible transitions.
- `world/src/rendering.js`: perspective ambient occlusion on wide screens, excluding transparent steam from depth; direct rendering below 800px.
- `world/src/environment.js` / `materials.js`: world-owned ambient animation and shared deterministic wood, paper, linen, ceramic, stone and brushed-metal surface maps.
- `world/src/controls.js`: analog joystick magnitude, independent look-pointer ownership and frame-independent acceleration/braking.
- `world/src/profiling.js`: local-only `?profile=1` resource counters and short frame-time samples; absent from the normal visitor UI.
- `world/src/animation.js`: keeps user-triggered animation blends responsive before freezing idle under Calm motion.
- `world/src/motion.js` / `layout.js`: navigation, character clearance, frame-independent damping and physical boundaries.
- `world/src/content.js`: shared narrative for the three environments. Keep facts consistent with the initial HTML.
- `world/models/` and `world/credits.html`: local CC0 assets and credits. Three.js is MIT licensed. The articulated human visitor and detailed diorama furniture are custom procedural meshes; the visitor is fictional, not a portrait.

After editing the world source:

```bash
npm ci
npm run build
npm test
python3 -m unittest discover -s tests -v
node --check assets/site.js
```

The build refreshes content-based cache versions for the world bundle and stylesheet in `world/index.html`.

Commit `world/world.bundle.js` with source changes when publication is requested. No external CDN or runtime API is required. Three.js and its models are loaded only on `/world/`.

## Content and design boundaries

AnyCheck is a product within Fintelite Group and Arief’s chosen proudest work. Infrastructure savings belong to Arief’s broader Fintelite role, not solely AnyCheck; the numeric result appears once on the homepage. All eight experience roles and the expanded project catalogue are available without entering the game. Some dates overlap. Location is Indonesia because the CV and earlier site named different cities.

The invoice demo uses a fixed synthetic example. It does not perform OCR. Project visuals use feature-specific captions, with source provenance retained in the separate media manifest. Camera views switch without reloading the scene or resetting the explorer position. The compact Explore dock opens world selection, stories, tour and settings. Press M to open Explore and C to cycle camera views; drag or use I J K L to look in First/Third person. On touch layouts, the left joystick sets walking direction and speed; the right pad turns the First/Third-person camera independently. The Camera menu includes a locally saved look sensitivity setting. Pointer cancellation, focus loss and dialogs clear movement. Ambient water, canoe, birds, foliage, steam and window rain use a separate pauseable clock. Calm motion freezes ambient motion while keeping user-controlled movement and its transitions active.

Surface height and roughness share six RG8 maps, alongside three color maps, at the original 256px resolution and mip filtering. Temporary geometry is released after batching. AO fullscreen stages omit unused depth attachments while retaining scene depth.

Models use a lightweight stylised treatment; the approved stylized miniature concepts establish art direction, not pixel-identical runtime fidelity.

The source contracts and navigation tests are separate from live browser checks recorded in `design-qa.md`. Static markup improves machine readability; search indexing, ranking, proprietary recruiter scraper support and ATS acceptance cannot be guaranteed. Physical-device performance and WebGL support vary.

KURI uses a four-material UV atlas and surface decals, with Wave/Pose emotes under Explore or keys 1/2. Paper sits on a human-sized desk inside a room; Night includes recorded city ambience. Sound defaults on after the first click, tap, or gameplay key; an explicit mute choice is remembered across visits. Ground click-to-walk is limited to Diorama and Top view.

## Freelance portfolio

The conventional website is the primary portfolio. Case studies, screenshots, project inventory, contact and CV are available without entering `/world/`; 3D is an optional presentation layer.

- `content/projects.json`: reviewed case-study and catalogue copy. Keep personal contribution distinct from product capabilities.
- `scripts/build-portfolio.mjs`: generates 19 static `work/<project>/index.html` pages, the marked homepage regions and sitemap. Run `npm run build:portfolio` after content changes.
- `assets/portfolio.css`: unified work cards, project facts, compact gallery and image-viewer layouts.
- `assets/project-gallery.js`: dependency-free native-dialog enhancement for project images: previous/next, Escape, actual-size/pan, original-image links and focus return. Without JavaScript, the same images remain ordinary full-size links.
- `assets/brand/`: editable AW vector identity plus SVG/ICO/PNG favicon and touch-icon variants. PNG icon compatibility is intentional.
- `assets/projects/media.json`: curated public WebP provenance, dimensions and checksums. The manifest distinguishes runtime demos, QA, archived interfaces, public app listings, official product guides, project presentations and identities. Covers record their source references and whether they use authentic-capture compositing or reference-based generation. Original interface evidence stays in the galleries.
- `scripts/strip-image-metadata.py`: removes embedded PNG/WebP/JPEG metadata without re-encoding coded pixels. Run with `--check` against final generated/curated outputs; keep source provenance in the separate manifest. Do not run it over original application repositories.
- `scripts/prepare-portfolio-images.py`: exports reviewed composition crops and responsive WebP variants without masks or blur; requires Pillow. Arief confirmed that screenshot values are mock. Regenerating the current media manifest requires `--anycheck <local-workspace>`, `--jagoan <local-workspace>` and `--runtime <reviewed-capture-directory>` together. This maintainer-only step needs the original capture inputs; it is not needed for normal site generation from the checked-in WebP files. Historical originals are recovered from the Git revision recorded in the evidence manifest; keep the uncurated archive local.
- `scripts/prepare-project-identities.py`: exports authentic project identities without redrawing their artwork and preserves separately curated generated identities.
- `scripts/prepare-project-visuals.py --spec <reviewed-private-spec.json>`: imports reviewed captures, public references and presentations as metadata-free WebP; private source paths never enter the public manifest. The base image exporter preserves these reviewed additions.
- `docs/portfolio-evidence/capture-status.md`: accepted feature views, source treatment and verification limits. Raw references, capture plans and curation input manifests remain local maintainer artifacts; they are not required to build the static site.

Some source applications require local fixture/authentication setup or code generation before new capture. Use original captures and official references where available; additional project presentations follow documented source features and confirmed project context. Never classify generated artwork as a native runtime capture, use production accounts/payments, or publish personal records and private source-code links. Frontend/backend contribution for the eight added projects was confirmed by Arief; that does not imply sole authorship or a direct-client relationship.

### Verify the conventional site

```bash
npm run build:portfolio
python3 -m unittest discover -s tests -v
npm test
node --check assets/site.js
```

One Work section at `/#work` contains all 19 projects in a consistent responsive card grid, with AnyCheck, Jagoan Voucher, Sribuu and MyTimor first. Every project uses the same detail template with contribution, Context and Working across; the latter lists verified technology or documented engineering scope, not guessed frameworks. Covers are bounded and screenshots use compact thumbnails with an accessible enlargement viewer. Original full-size image links still work without JavaScript. The three public-source repositories remain within Work; `#impact` is only a legacy anchor. SCM Tools has three source-informed interface presentations with consistent sample data, separately classified from native captures. The broader Fintelite cost result remains in experience. Personal Education is omitted from the rendered website and Person metadata; LinkedIn and the original CV download remain unchanged.

## Publishing

Nothing is published by previewing or building locally. Keep the root-based GitHub Pages layout and use the user’s requested release process. Do not commit, push, or publish without authorization.
