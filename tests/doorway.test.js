import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildWorld} from '../world/src/scene.js';

test('door leaf remains independently hinged after batching and reverses without moving its frame',()=>{
 const previous=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 const geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial(),prototype=new THREE.Group();prototype.add(new THREE.Mesh(geometry,material));
 const texture=new THREE.Texture();let world;
 try{
  world=buildWorld('paper',new Proxy({},{get:()=>prototype}),texture);
  const door=world.doorway,frame=world.group.getObjectByName('crafted-doorway');
  assert.ok(door?.leaf && door.leaf.parent===frame);
  const fixed=frame.children.find(child=>child.isMesh);assert.ok(fixed);
  frame.updateWorldMatrix(true,true);const before=fixed.matrixWorld.clone(),closed=door.leaf.rotation.y;
  door.setOpen(true);door.update(.2,false);
  assert.ok(door.leaf.rotation.y<closed);assert.ok(door.leaf.rotation.y>-1.43);
  frame.updateWorldMatrix(true,true);assert.deepEqual(fixed.matrixWorld.elements,before.elements);
  const partial=door.leaf.rotation.y;door.setOpen(false);door.update(.1,false);assert.ok(door.leaf.rotation.y>partial);
  door.update(0,true);assert.equal(door.leaf.rotation.y,-.08);
  door.setOpen(true);door.update(0,true);assert.ok(Math.abs(door.leaf.rotation.y+1.43)<1e-8);
  assert.ok(door.view().position.toArray().every(Number.isFinite));
 }finally{world?.dispose();geometry.dispose();material.dispose();texture.dispose();globalThis.document=previous;}
});
