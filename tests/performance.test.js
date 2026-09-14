import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {createMaterialDetails} from '../world/src/materials.js';
import {craftKit} from '../world/src/craft.js';
import {WorldSSAOPass} from '../world/src/rendering.js';
const reference=JSON.parse(readFileSync(new URL('./fixtures/surface-channel-hashes.json',import.meta.url)));

test('packed surfaces preserve every original sampled color, height and roughness byte',()=>{
 for(const kind of ['paper','night','islands']){
  const owned=new Set(),maps=createMaterialDetails(owned,kind);
  try{for(const [key,t] of Object.entries(maps)){
   const stride=t.format===THREE.RGFormat?2:4,channels=key.endsWith('Color')?3:1,offset=key.endsWith('Roughness')?1:0;
   const sampled=new Uint8Array(256*256*channels);
   for(let i=0;i<256*256;i++)for(let c=0;c<channels;c++)sampled[i*channels+c]=t.image.data[i*stride+(channels===1?offset:c)];
   assert.equal(createHash('sha256').update(sampled).digest('hex'),reference[kind][key],`${kind}/${key}: visual data changed`);
  }}finally{owned.forEach(t=>t.dispose());}
 }
});
test('surface array storage stays within 1.5 MiB without reducing 256px resolution or mipmaps',()=>{
 const owned=new Set();createMaterialDetails(owned);
 try{assert.ok([...owned].reduce((n,t)=>n+t.image.data.byteLength,0)<=1572864);for(const t of owned){assert.equal(t.image.width,256);assert.equal(t.image.height,256);assert.equal(t.generateMipmaps,true);}}finally{owned.forEach(t=>t.dispose());}
});
test('batching releases replaced owned geometry but preserves the finished mesh and borrowed geometry',()=>{
 const group=new THREE.Group(),ownedGeometries=new Set(),material=new THREE.MeshStandardMaterial();
 const mesh=(geometry,mat,x,y,z,parent=group)=>{ownedGeometries.add(geometry);const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);parent.add(m);return m;};
 const kit=craftKit({group,mat:()=>material,mesh,paper:material,wood:material,red:material,dark:material,white:material,ownedGeometries});
 const g=new THREE.BoxGeometry(),source=mesh(g,material,2,0,0),borrowed=new THREE.BoxGeometry();group.add(new THREE.Mesh(borrowed,material));
 let disposed=0,borrowedDisposed=0;g.addEventListener('dispose',()=>disposed++);borrowed.addEventListener('dispose',()=>borrowedDisposed++);
 kit.batch(group);
 assert.equal(ownedGeometries.has(g),false,'temporary geometry still retained');assert.equal(disposed,1);assert.equal(borrowedDisposed,0);assert.equal(source.parent,null);
 assert.equal(group.children.length,1);assert.equal(group.children[0].geometry.attributes.position.count,72);assert.equal(ownedGeometries.size,1);
 group.children[0].geometry.computeBoundingBox();assert.equal(group.children[0].geometry.boundingBox.max.x,2.5);
 ownedGeometries.forEach(g=>g.dispose());borrowed.dispose();material.dispose();
});
test('AO fullscreen targets omit unused depth storage and dispose owned shader/noise resources',()=>{
 const pass=new WorldSSAOPass(new THREE.Scene(),new THREE.PerspectiveCamera(),16,16,4);
 let released=0;for(const r of [pass.ssaoMaterial,pass.noiseTexture])r.addEventListener('dispose',()=>released++);
 try{assert.equal(pass.ssaoRenderTarget.depthBuffer,false);assert.equal(pass.blurRenderTarget.depthBuffer,false);assert.equal(pass.normalRenderTarget.depthBuffer,true);}finally{pass.dispose();}
 assert.equal(released,2);
});
