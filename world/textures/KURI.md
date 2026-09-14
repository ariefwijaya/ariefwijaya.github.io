# KURI material provenance

`kuri-enamel.png` is a generated tileable base-color texture, produced with the built-in image generation tool on 2026-09-14. Source: exec-15f5d3d2-e852-458d-bc31-861ce47fb379.png. Flat ivory enamel, sparse low-contrast tan speckles, no baked directional highlights or shadows.

Runtime: shared albedo for ivory shell and brick-red painted shoes/antenna. Paired with existing small paper bump at 0.0007; lighting and material roughness supply specular response. Backpack uses the existing generated linen albedo and linen bump at 0.003. Joints/brass/face/eyes intentionally have no albedo grain. Images are cached; each world's GPU texture has the same ownership and disposal path as its other surfaces. Nine shared character materials; no per-mesh cloning.

KURI's 3D geometry is code-authored in explorer.js, based on the selected courier-robot concept. This is a stylized approximation, not a conversion or pixel-identical reconstruction of the generated concept image.

## Worn enamel revision

Runtime now loads `kuri-enamel-worn.png` (source exec-c2253f69-cf81-4c0f-9daf-804b80c45253.png), generated 2026-09-14 after feedback that the original was too pristine. The previous file is retained as the earlier source, not loaded by the world.

The same shared texture drives albedo, bump (0.002) and roughness with identical UVs. Roughness sampling is inverted/remapped to make dark scratches/chips rougher than intact paint. This is an economical stylized relief approximation derived from color, not a separately measured physical height map. Rounded panel vertices receive restrained warm edge patina without extra polygons. Faces/eyes remain untextured. Browser Paper third-person inspection shows visible subdued speckles and edge wear without shader errors.

## Four-material atlas and decals

Runtime now uses `kuri-material-atlas.png` (source exec-a768accd-fcc5-4513-a998-c521d33b4c4c.png, generated 2026-09-14). UVs select one inset quadrant per material: ivory enamel (upper left), painted red (upper right), canvas (lower left), graphite metal (lower right). The shared image replaces repeated ivory tinting. Insets exclude quadrant boundaries to reduce color bleeding. Other original enamel PNGs are retained but no longer requested by the world.

A separate runtime 1024x512 transparent decal atlas contains the AW badge, red chest trim and backpack stitches, drawn as lettering/lines and applied to two small surface planes. It is created once with the character, rather than for every world switch. Walking knee flexion/bob were reduced; Wave and Pose are finite emote clips accessible through Explore or 1/2. This remains a code-authored stylized model, not a pixel-identical conversion of the concept art.
