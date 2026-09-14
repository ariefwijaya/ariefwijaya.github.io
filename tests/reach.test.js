import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createExplorer} from '../world/src/explorer.js';
import {createDoorReach} from '../world/src/reach.js';

test('hand meets a reachable world-space handle without stretching the arm',()=>{
 const {scene}=createExplorer(),reach=createDoorReach(scene);
 const size=new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());scene.scale.setScalar(1.62/size.y);
 scene.position.set(.045,0,3.935);
 const target=new THREE.Vector3(.70,.88,-.082).applyAxisAngle(new THREE.Vector3(0,1,0),-.08).add(new THREE.Vector3(-.43,0,4.35));
 reach.update(target,1);
 assert.ok(reach.handPosition().distanceTo(target)<.002);
 assert.equal(scene.getObjectByName('ElbowR').position.y,-.24);
 reach.update(null,0);
 assert.equal(scene.getObjectByName('ArmR').rotation.z,0);
 assert.equal(scene.getObjectByName('ElbowR').rotation.y,0);
 scene.traverse(o=>{o.geometry?.dispose();});
});
