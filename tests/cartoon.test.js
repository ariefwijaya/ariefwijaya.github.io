import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {applyCartoonSurfaces,dressExplorer} from '../world/src/cartoon-surfaces.js';
import {createExplorer} from '../world/src/explorer.js';
import {createInteractionEffects} from '../world/src/interaction-effects.js';

test('cartoon material replacement frees superseded maps and dresses shared character materials',()=>{
 const old=new THREE.Texture(),owned=new Set([old]);let disposed=0;old.addEventListener('dispose',()=>disposed++);
 const detail=applyCartoonSurfaces({woodColor:old},{'cartoon-wood':{width:512,height:512},'cartoon-linen':{width:512,height:512},'cartoon-paper':{width:512,height:512}},owned);
 assert.equal(disposed,1);assert.equal(owned.has(old),false);assert.equal(owned.size,3);
 assert.equal(detail.woodColor.colorSpace,THREE.SRGBColorSpace);
 const root=createExplorer().scene;dressExplorer(root,detail);root.traverse(o=>{if(o.isMesh){assert.ok(o.material.map||['kuri-eye','kuri-face','kuri-brass','kuri-joint'].includes(o.material.name));o.geometry.dispose();o.material.dispose();}});owned.forEach(t=>t.dispose());
});
test('interaction sparks expire and Calm suppresses them without removing useful proximity markers',()=>{
 const group=new THREE.Group(),ownedMaterials=new Set(),ownedGeometries=new Set();
 const fx=createInteractionEffects({group,targets:[{id:'ai',position:new THREE.Vector3(0,2,0),approach:{x:0,z:1}}],ownedMaterials,ownedGeometries});
 fx.trigger('ai');fx.update(.1,{near:'ai'});assert.equal(group.getObjectByName('interaction-sparks').visible,true);
 fx.update(.1,{near:'ai',calm:true});assert.equal(group.getObjectByName('interaction-sparks').visible,false);assert.equal(group.getObjectByName('interaction-ring-ai').visible,true);
 fx.update(2,{near:'ai'});assert.equal(group.getObjectByName('interaction-sparks').visible,false);
 ownedMaterials.forEach(m=>m.dispose());ownedGeometries.forEach(g=>g.dispose());
});

test('walk destination survives travel, pulses once on arrival and cancels on manual control',()=>{
 const group=new THREE.Group(),ownedMaterials=new Set(),ownedGeometries=new Set(),ownedTextures=new Set();
 const fx=createInteractionEffects({group,targets:[],ownedMaterials,ownedGeometries,ownedTextures});const marker=group.getObjectByName('walk-destination');
 fx.setDestination({x:2,z:3});fx.update(2,{walking:true,calm:true});assert.equal(marker.visible,true);assert.equal(marker.position.x,2);assert.equal(marker.scale.x,1);
 fx.update(.1,{walking:false});assert.equal(marker.visible,true);fx.update(.7,{walking:false});assert.equal(marker.visible,false);
 fx.setDestination({x:4,z:2});fx.cancelDestination();fx.update(.1,{walking:true});assert.equal(marker.visible,false);
 fx.setDestination({x:20,z:20},false);fx.update(.8);assert.equal(marker.visible,false);
 for(const set of [ownedMaterials,ownedGeometries,ownedTextures])set.forEach(x=>x.dispose());
});

test('KURI wear samples the same UV texture for color, relief and roughness, keeping eyes clean',()=>{
 const owned=new Set(),image={width:512,height:512};
 const surfaces=applyCartoonSurfaces({}, {'kuri-enamel':image,'cartoon-linen':image,'cartoon-paper':image},owned);
 const root=createExplorer().scene;dressExplorer(root,surfaces);const materials=new Set();
 root.traverse(o=>{if(!o.isMesh)return;const m=o.material;materials.add(m);
  if(['kuri-enamel','kuri-red'].includes(m.name)){
   assert.equal(m.map,surfaces.enamelColor);assert.equal(m.bumpMap,m.map);assert.equal(m.roughnessMap,m.map);assert.ok(m.bumpScale>0&&m.bumpScale<.004);
   assert.ok(o.geometry.getAttribute('color'));assert.equal(m.vertexColors,true);
  }
  if(m.name==='kuri-eye'){assert.equal(m.map,null);assert.equal(m.bumpMap,null);assert.ok(m.emissiveIntensity>0);}
  o.geometry.dispose();
 });
 materials.forEach(m=>m.dispose());owned.forEach(t=>t.dispose());
});
