# Islands generated materials

Generated with the built-in image_gen tool on 2026-09-14. Source PNGs retained in the Codex generated_images folder. Converted with cwebp: limestone 1024x1024 quality 83; sky 2048x1024 quality 84. Runtime copies live alongside this file.

## island-limestone.webp — prompt
Generate a production game material texture, not a mockup. Square seamless tileable warm pale limestone and beach sandstone albedo for a stylized premium 3D miniature island. Entire image flat orthographic surface scan, uniform diffuse lighting, no perspective no shadows no objects no text. Cream ivory honey sandstone, fine pores, small mineral flecks, subtle worn striations and patches; beautiful tactile handcrafted miniature material. Medium scale detail readable on low polygon cliffs, restrained contrast, no large cracks. All edges must tile seamlessly.

## island-sky.webp — prompt
Production game environment sky texture. Wide 2:1 equirectangular panorama of a beautiful stylized realistic tropical daytime sky only, no land no sea no horizon objects, no text. Rich soft blue zenith transitioning to pale warm ivory blue near lower half and very pale blue bottom. Scattered sculptural soft white cumulus clouds with warm cream sunlit edges and soft blue undersides, broad airy gaps. Upper quarter mostly clean blue. Clouds placed in the middle third of the image. Soft painterly physically plausible light, premium miniature game art, calm afternoon, not dramatic, not photographic storm. Seamless left-right panorama edges. No sun disk.

Generated images are albedo/backdrop assets, not authored normal maps. Seamlessness was requested; no pixel-perfect edge matching claim is made.

## Cartoon revision — active runtime assets
The earlier photographic-looking materials were rejected by the user. Runtime now uses island-limestone-cartoon.webp (1024 square, quality 83) and island-sky-cartoon.webp (2048x1024, quality 84). Both generated with built-in image_gen; approximately 51 KiB combined. Geometry and texture dimensions unchanged.

### Limestone cartoon prompt
Square seamless tileable albedo texture for a premium stylized 3D CARTOON miniature island game. Hand painted cream sandstone, soft broad color patches and sparse tiny painted speckles, warm ivory sand ochre palette. Soft clay and paper handcrafted cartoon diorama aesthetic. Very low contrast and clean readable shapes. FLAT surface texture only uniform diffuse light no perspective no directional shadows, no text, no objects. NOT a photograph, no realistic scanned pores, no gritty noise, no photorealism. No paving stones or obvious tile outlines. All edges seamless.

### Sky cartoon prompt
Production 2:1 wide equirectangular sky panorama texture for a stylized 3D CARTOON handcrafted miniature game. Sky only. Soft muted powder turquoise blue upper sky, pale cream blue lower half. Sparse rounded sculpted marshmallow cumulus clouds in middle third with broad smooth surfaces, gentle cream highlights and lavender blue shading. Premium clay miniature animated film style, simplified readable cloud shapes, soft ambient lighting, very calm warm afternoon. Upper quarter mostly empty blue. Lower quarter pale blue almost empty to blend into horizon. NOT photography, no realistic wispy detail, no granular texture, no dramatic clouds. No land no sea no objects no text no sun disk. Seamless left and right edges.

## Shared cartoon revamp
Built-in image_gen used for the following additional runtime assets. Wood, linen and paper are 512x512 WebP quality83; night is2048x1024 quality84. Source PNGs retained. These are shared albedo maps, paired with existing small procedural bump/roughness maps. Source images are cached; GPU texture objects are owned per world. Smooth painted surfaces, foliage, ceramics and the character receive tinted paper/stone/cloth treatment rather than individual large images.

### cartoon-wood.webp prompt
Seamless square hand-painted WOOD albedo game texture for premium stylized 3D cartoon miniature diorama. Pale cream honey wood so runtime can tint it. Broad flowing simplified grain, two small rounded knots, restrained soft brush variation, smooth crafted toy material. Flat uniformly lit surface texture, no object no plank gaps no shadows no perspective no text. Not photo not realistic scan no gritty pores. Soft warm handmade cartoon aesthetic, quiet contrast, tileable edges.

### cartoon-linen.webp prompt
Seamless square hand-painted woven LINEN fabric albedo game texture for premium stylized 3D cartoon miniature diorama. Neutral warm ivory offwhite so runtime can tint it. Simplified broad soft woven threads, subtle crisscross weave, very low contrast, smooth cartoon toy fabric, no grainy photographic microdetail. Flat uniform lighting no shadows no folds no perspective no text no objects. Entire image is tileable texture.

### cartoon-paper.webp prompt
Seamless square flat albedo texture of warm off-white handmade PAPER and painted clay for premium 3D stylized cartoon miniature game. Soft barely visible broad brush cloud patches, sparse small drawn fibers, smooth creamy ivory material with restrained low contrast. Surface texture only no objects no text no shadows no perspective no photo no photographic noise or gritty pores. Warm crafted diorama aesthetic, clean elegant soft, tileable all edges.

### cartoon-night.webp prompt
Wide 2:1 equirectangular sky panorama texture for premium handcrafted 3D cartoon miniature night world. Stylized twilight navy teal sky, broad rounded soft sculpted clouds in desaturated lavender blue, gentle atmospheric depth. Sparse tiny painted cream stars with few small four-point sparkles, upper half. Lower quarter clear muted blue-teal horizon gradient. No moon (added in 3D), no sun, no landscape no objects no text. Animated-film clay diorama aesthetic, no photography no realistic wisps no nebula no noisy starfield. Quiet magical evening. Seamless left and right.

## cartoon-city.webp — window reference correction
Built-in image_gen. Converted to1024px wide WebP quality82. Used as a window insert in Night, not as a whole-world background.
Prompt: Wide 3:2 image to use as a window backdrop texture inside a premium stylized 3D CARTOON miniature evening study. View through a window of a distant cozy city at blue hour with softly rounded simplified apartment buildings and warm amber lit windows, a few stylized raindrop streaks on glass. Soft painted miniature animated film aesthetic, muted navy teal and amber, no photorealism, no sharp photographic detail, no text, no window frame, no interior objects. Buildings fill lower two thirds, softly cloudy night upper third. Gentle depth and tasteful restrained contrast.

Panorama sampling correction: generated sky images are now mirrored twice horizontally around the sphere. This guarantees continuity at the longitude join but is not a unique authored360 panorama. Shared generated material maps also use mirrored repeating to reduce abrupt boundary edges.
