import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createExplorer} from '../world/src/explorer.js';
import {createAnimationClock} from '../world/src/animation.js';
test('Calm allows the walking-to-idle blend to finish before freezing idle',()=>{
 const {scene,animations}=createExplorer(),mixer=new THREE.AnimationMixer(scene),clock=createAnimationClock();
 const walk=mixer.clipAction(animations.find(a=>a.name==='Walking')).play();mixer.update(.25);
 assert.ok(Math.abs(scene.getObjectByName('LegL').rotation.x)>.3);
 walk.fadeOut(.1);mixer.clipAction(animations.find(a=>a.name==='Idle')).reset().fadeIn(.1).play();clock.transition();
 for(let i=0;i<60;i++)mixer.update(clock.step(1/60,{calm:true,idle:true}));
 assert.ok(Math.abs(scene.getObjectByName('LegL').rotation.x)<.001);
 const frozen=mixer.time;for(let i=0;i<60;i++)mixer.update(clock.step(1/60,{calm:true,idle:true}));assert.equal(mixer.time,frozen);
 assert.equal(clock.step(.02,{calm:true,idle:false}),.02,'user-directed animation must continue');
});

test('KURI keeps expressive joints independent and uses shared materials within a bounded mesh budget',()=>{
 const {scene,animations}=createExplorer();assert.equal(scene.name,'KURI');
 for(const name of ['Head','EyeL','EyeR','Mailbag','Antenna','ArmR','ElbowR','KneeL'])assert.ok(scene.getObjectByName(name));
 const materials=new Set();let meshes=0,triangles=0;scene.traverse(o=>{if(o.isMesh){meshes++;materials.add(o.material);triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;}});
 assert.equal(materials.size,9);assert.ok(meshes<=60);assert.ok(triangles<15000);
 const mixer=new THREE.AnimationMixer(scene);mixer.clipAction(animations.find(a=>a.name==='Idle')).play();mixer.update(2.76);
 assert.ok(scene.getObjectByName('EyeL').scale.y<.1);assert.equal(scene.scale.y,1,'blink does not stretch the body');
 mixer.update(.3);assert.ok(scene.getObjectByName('EyeL').scale.y>.99);
 scene.traverse(o=>o.geometry?.dispose());materials.forEach(m=>m.dispose());
});

test('KURI emotes finish in a neutral limb pose and remain finite',()=>{
 const {scene,animations}=createExplorer();
 for(const name of ['Wave','Pose']){
  const clip=animations.find(a=>a.name===name);assert.ok(clip);assert.equal(clip.duration,2.4);
  for(const track of clip.tracks){assert.ok([...track.values].every(Number.isFinite));assert.ok(track.times[track.times.length-1]<=2.401);}
  const mixer=new THREE.AnimationMixer(scene),action=mixer.clipAction(clip);action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;action.play();mixer.update(2.4);
  assert.ok(Math.abs(scene.getObjectByName('ArmR').rotation.x)<.001);mixer.stopAllAction();
 }
});
