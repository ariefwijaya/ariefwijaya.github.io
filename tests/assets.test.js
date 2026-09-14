import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {createMaterialDetails} from '../world/src/materials.js';
import {buildWorld} from '../world/src/scene.js';
const hash=data=>createHash('sha256').update(Buffer.from(data.buffer,data.byteOffset,data.byteLength)).digest('hex');

test('surface maps are deterministic 256px structured PBR channels with correct color space',()=>{
 const owned=new Set(),repeatOwned=new Set(),maps=createMaterialDetails(owned,'paper'),repeat=createMaterialDetails(repeatOwned,'paper');
 try{
  for(const key of ['woodColor','woodBump','woodRoughness','linenColor','linenBump','linenRoughness','ceramicBump','ceramicRoughness','stoneColor','stoneBump','stoneRoughness','metalBump','metalRoughness']){
   const t=maps[key];assert.ok(t?.isDataTexture,key);assert.equal(t.image.width,256);assert.equal(t.image.height,256);
   assert.equal(t.colorSpace,key.endsWith('Color')?THREE.SRGBColorSpace:THREE.NoColorSpace,key);
   assert.ok(owned.has(t));assert.equal(hash(t.image.data),hash(repeat[key].image.data));
   assert.ok(new Set(t.image.data.filter((_,i)=>i%(t.format===THREE.RGFormat?2:4)===(key.endsWith('Roughness')?1:0))).size>8,`${key} has material structure`);
  }
  const bump=maps.woodBump.image.data,stride=maps.woodBump.format===THREE.RGFormat?2:4;let across=0,along=0;
  for(let y=0;y<255;y++)for(let x=0;x<255;x++){const i=(y*256+x)*stride;across+=Math.abs(bump[i]-bump[i+stride]);along+=Math.abs(bump[i]-bump[i+256*stride]);}
  assert.ok(across>along*1.5,'wood has directional grain rather than isotropic random noise');
 }finally{owned.forEach(t=>t.dispose());repeatOwned.forEach(t=>t.dispose());}
});

test('world themes change furniture geometry and props while sharing and disposing their surface resources',()=>{
 const previous=globalThis.document;globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 const geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial(),prototype=new THREE.Group();prototype.add(new THREE.Mesh(geometry,material));
 const paper=new THREE.Texture(),models=new Proxy({},{get:()=>prototype}),worlds=[];let sharedDisposals=0;
 for(const shared of [geometry,material,paper])shared.addEventListener('dispose',()=>sharedDisposals++);
 try{
  const signatures=[];
  for(const kind of ['paper','night','islands']){
   const world=buildWorld(kind,models,paper);worlds.push(world);
   const desk=world.group.getObjectByName(`craft-bench-${kind}`),shelf=world.group.getObjectByName(`craft-shelf-${kind}`),table=world.group.getObjectByName(`craft-meeting-${kind}`);
   assert.ok(desk&&shelf&&table,`${kind} has themed furniture`);
   for(const furniture of [desk,shelf,table])assert.ok(furniture.children.filter(o=>o.isMesh).length<18,'static details stay batched by shared material');
   signatures.push([desk,shelf,table].map(group=>group.children.filter(o=>o.isMesh).map(o=>hash(o.geometry.attributes.position.array)).join(':')).join('|'));
   const textures=new Set(),resources=new Set(),usage=new Map();world.group.traverse(o=>{if(o.isMesh){resources.add(o.material);if(o.geometry!==geometry)resources.add(o.geometry);}if(o.material)for(const t of Object.values(o.material))if(t?.isTexture&&t!==paper){textures.add(t);usage.set(t,(usage.get(t)||0)+1);}});
   assert.ok([...textures].some(t=>t.name==='surface-wood-color'&&usage.get(t)>1),'wood color map is reused by furniture');
   const plants=[];world.group.traverse(o=>{if(o.name.startsWith('craft-plants-'))plants.push(o.name);});
   assert.ok(plants.length,'a batch retains the plant collection identity');
   for(const t of textures)resources.add(t);
   let disposal=0;for(const t of resources)t.addEventListener('dispose',()=>disposal++);
   world.dispose();world.dispose();assert.equal(disposal,resources.size,'owned resources dispose once');
  }
  assert.equal(new Set(signatures).size,3,'shape changes make all three themes distinct');assert.equal(sharedDisposals,0);
 }finally{worlds.forEach(w=>w.dispose());geometry.dispose();material.dispose();paper.dispose();globalThis.document=previous;}
});

test('workstation uses fewer distant triangles and restores bevelled keys for close inspection',()=>{
 const previous=globalThis.document;globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 const prototype=new THREE.Group(),paper=new THREE.Texture();const world=buildWorld('paper',new Proxy({},{get:()=>prototype}),paper);
 try{
  const camera=new THREE.PerspectiveCamera(8,1.5,.06,350);camera.position.set(44,60,84);world.group.updateMatrixWorld(true);
  const near=world.group.getObjectByName('keyboard-close'),far=world.group.getObjectByName('keyboard-distant');
  world.workstation.updateView(camera,758);assert.equal(near.visible,false);assert.equal(far.visible,true);
  const triangles=group=>group.children.reduce((n,o)=>n+(o.geometry.index?.count||o.geometry.attributes.position.count)/3,0);
  assert.ok(triangles(far)<triangles(near)/10,'far geometry costs at most one tenth of close keys');
  camera.position.set(-4.78,2.08,1);camera.fov=30;world.workstation.updateView(camera,758);assert.equal(near.visible,true);assert.equal(far.visible,false);
 }finally{world.dispose();paper.dispose();globalThis.document=previous;}
});
