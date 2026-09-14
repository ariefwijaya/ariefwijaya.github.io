import * as THREE from 'three';
const sources=new Map();
export async function loadCartoonImages(kind){
 const names=['cartoon-wood','cartoon-linen','cartoon-paper','island-limestone-cartoon','kuri-atlas',...(kind==='night'?['cartoon-night']:[])];
 return Object.fromEntries(await Promise.all(names.map(async name=>{
  if(!sources.has(name))sources.set(name,new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);image.src=name==='kuri-atlas'?'/world/textures/kuri-material-atlas.png':`/world/textures/${name}.webp`;}));
  return [name,await sources.get(name)];
 })));
}
export function applyCartoonSurfaces(detail,images,owned){
 const names={'cartoon-wood':'woodColor','cartoon-linen':'linenColor','cartoon-paper':'paperColor','island-limestone-cartoon':'stoneColor','kuri-enamel':'enamelColor','kuri-atlas':'kuriAtlas'};
 for(const [name,key] of Object.entries(names)){
  if(!images?.[name])continue;
  if(detail[key]){owned.delete(detail[key]);detail[key].dispose();}
  const texture=new THREE.Texture(images[name]);texture.name=name;texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.MirroredRepeatWrapping;texture.anisotropy=4;texture.needsUpdate=true;
  if(key==='linenColor')texture.repeat.set(3,3);
  owned.add(texture);detail[key]=texture;
 }
 return detail;
}
export function dressExplorer(root,surfaces){
 root.traverse(o=>{if(!o.isMesh)return;const m=o.material;
  if(m.name==='kuri-decal')return;
  if(surfaces.kuriAtlas&&['kuri-enamel','kuri-red','kuri-canvas','kuri-joint'].includes(m.name)){m.map=surfaces.kuriAtlas;m.bumpMap=m.map;m.bumpScale=m.name==='kuri-canvas'?.0015:.001;m.color.set(0xffffff);m.roughnessMap=null;m.roughness=m.name==='kuri-canvas'?.94:m.name==='kuri-joint'?.58:.55;m.needsUpdate=true;return;}
  if(['kuri-eye','kuri-face','kuri-brass','kuri-joint'].includes(m.name)){m.map=null;m.bumpMap=null;}
  else if(['kuri-enamel','kuri-red'].includes(m.name)){m.map=surfaces.enamelColor||surfaces.paperColor;
   // Albedo chips and scratches also perturb the normal at precisely the same UVs.
   m.bumpMap=m.map||null;m.bumpScale=.002;m.roughnessMap=m.map||null;m.roughness=.8;
   m.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
 vec4 texelRoughness = texture2D(roughnessMap, vRoughnessMapUv);
 roughnessFactor *= 1.0 - 0.48 * texelRoughness.g;
#endif`);};
   m.customProgramCacheKey=()=> 'kuri-worn-enamel-v1';}
  else if(m.name==='kuri-canvas'){m.map=surfaces.linenColor;m.bumpMap=surfaces.linenBump;m.bumpScale=.003;}
  else if(['shirt','pants','bag','shoe'].includes(m.name)){m.map=surfaces.linenColor;m.bumpMap=surfaces.linenBump;m.bumpScale=.002;}
  else {m.map=surfaces.paperColor||null;m.bumpMap=surfaces.paperBump;m.bumpScale=.001;}
  m.needsUpdate=true;
 });
}
