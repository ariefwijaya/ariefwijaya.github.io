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

```sh
npm ci
npm run build
npm test
python3 -m unittest discover -s tests -v
node --check assets/site.js
```

The build refreshes content-based cache versions for the world bundle and stylesheet in `world/index.html`.

Commit `world/world.bundle.js` with source changes when publication is requested. No external CDN or runtime API is required. Three.js and its models are loaded only on `/world/`.

## Content and design boundaries

AnyCheck is a product within Fintelite Group and Arief’s chosen proudest work. Infrastructure savings belong to his broader Fintelite role, not solely AnyCheck; the numeric result appears once on the homepage. All eight roles and eight project entries are available without entering the game. Some dates overlap. Location is Indonesia because the CV and earlier site named different cities.

The invoice demo uses a fixed synthetic example. It does not perform OCR. Generated reporting art is labelled conceptual. Camera views switch without reloading the scene or resetting the explorer position. The compact Explore dock opens world selection, stories, tour and settings. Press M to open Explore and C to cycle camera views; drag or use I J K L to look in First/Third person. On touch layouts, the left joystick sets walking direction and speed; the right pad turns the First/Third-person camera independently. The Camera menu includes a locally saved look sensitivity setting. Pointer cancellation, focus loss and dialogs clear movement. Ambient water, canoe, birds, foliage, steam and window rain use a separate pauseable clock. Calm motion freezes ambient motion while keeping user-controlled movement and its transitions active.

Surface height and roughness share six RG8 maps, alongside three color maps, at the original 256px resolution and mip filtering. Temporary geometry is released after batching. AO fullscreen stages omit unused depth attachments while retaining scene depth.

Models use a lightweight stylised treatment; the approved stylized miniature concepts establish art direction, not pixel-identical runtime fidelity.

The source contracts and navigation tests are separate from live browser checks recorded in `design-qa.md`. Static markup improves machine readability; search indexing, ranking, proprietary recruiter scraper support and ATS acceptance cannot be guaranteed. Physical-device performance and WebGL support vary.

KURI uses a four-material UV atlas and surface decals, with Wave/Pose emotes under Explore or keys 1/2. Paper sits on a human-sized desk inside a room; Night includes opt-in recorded city ambience. Ground click-to-walk is limited to Diorama and Top view.

## Publishing

Nothing is published by previewing or building locally. Keep the root-based GitHub Pages layout and use the user’s requested release process. Do not commit, push, or publish without authorization.
