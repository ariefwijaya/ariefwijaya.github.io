import test from 'node:test';
import assert from 'node:assert/strict';
import {createJoystickState,createLookGesture,stepVelocity} from '../world/src/controls.js';
test('joystick provides analog magnitude, radial deadzone and capped diagonal speed',()=>{
 const j=createJoystickState();j.begin(1,0,0);j.move(1,2,0);assert.equal(j.value.x,0);
 j.move(1,22,0);assert.ok(j.value.x>.2&&j.value.x<.6);assert.equal(j.value.z,0);
 j.move(1,100,100);assert.ok(Math.abs(Math.hypot(j.value.x,j.value.z)-1)<1e-10);assert.ok(Math.hypot(j.thumb.x,j.thumb.y)<=44.001);
 j.end(1);assert.deepEqual(j.value,{x:0,z:0});assert.equal(j.active,false);
});
test('look and joystick pointer ownership remains independent and cancellation clears motion',()=>{
 const j=createJoystickState(),look=createLookGesture();j.begin(4,0,0);j.move(4,0,-44);look.begin(8,200,100);
 assert.equal(j.begin(8,0,0),false);assert.deepEqual(j.move(8,44,0),{x:0,z:-1});
 assert.deepEqual(look.move(8,218,108),{x:18,y:8});look.end(4);assert.equal(look.active,true);j.end(8);assert.equal(j.active,true);
 look.end(8);assert.equal(j.value.z,-1);j.reset();assert.equal(j.active,false);assert.deepEqual(j.value,{x:0,z:0});
});
test('a drag that returns to its origin never becomes a tap and foreign pointers cannot end it',()=>{
 const p=createLookGesture();p.begin(1,10,10);p.move(1,45,10);p.move(1,10,10);assert.equal(p.end(2),null);assert.equal(p.end(1).tap,false);
 p.begin(2,10,10);p.move(2,12,12);assert.equal(p.end(2).tap,true);assert.equal(p.move(2,90,90),null);
});
test('acceleration is frame-independent and release/reversal stop promptly without drift',()=>{
 function simulate(fps){let v={x:0,z:0};for(let i=0;i<fps;i++)v=stepVelocity(v,{x:0,z:2.55},1/fps);return v;}
 assert.ok(Math.abs(simulate(30).z-simulate(120).z)<1e-9);
 let v={x:0,z:2.55};for(let i=0;i<12;i++)v=stepVelocity(v,{x:0,z:0},1/60);assert.ok(Math.abs(v.z)<.02);
 v=stepVelocity({x:0,z:2.55},{x:0,z:-2.55},.1);assert.ok(v.z<0);
 assert.deepEqual(stepVelocity({x:0,z:0},{x:NaN,z:0},.1),{x:0,z:0});
});

import * as THREE from 'three';
import {createCameraRig} from '../world/src/camera.js';
test('direct look responds promptly while first-person position stays attached during a turn',()=>{
 const rig=createCameraRig();rig.setMode('first',{calm:true});rig.update(0,{position:{x:0,z:0},snap:true});
 rig.look(100,0);rig.update(.1,{position:{x:0,z:0}});const forward=new THREE.Vector3();rig.camera.getWorldDirection(forward);
 assert.ok(Math.atan2(forward.x,-forward.z)>.25,'look should reach most of the requested turn within 100ms');
 rig.update(1/60,{position:{x:.5,z:0}});assert.equal(rig.camera.position.x,.5,'turn smoothing must not lag behind player position');
 rig.look(-100,0);rig.update(.1,{position:{x:.5,z:0}});rig.camera.getWorldDirection(forward);assert.ok(Math.abs(Math.atan2(forward.x,-forward.z))<.07);
});
test('entering first person while walking finishes transition and attaches to the moving player',()=>{
 const rig=createCameraRig();rig.setMode('first');
 for(let i=0;i<180;i++)rig.update(1/60,{position:{x:(i+1)*2.55/60,z:0}});
 assert.ok(Math.abs(rig.camera.position.x-7.65)<.001);
 assert.equal(rig.transitioning,false);
});

import {canTapWalk} from '../world/src/controls.js';
test('ground click walking is limited to overview cameras',()=>{
 assert.equal(canTapWalk('diorama'),true);assert.equal(canTapWalk('top'),true);
 assert.equal(canTapWalk('first'),false);assert.equal(canTapWalk('third'),false);assert.equal(canTapWalk(undefined),false);
});
