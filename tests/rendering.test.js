import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {WorldSSAOPass} from '../world/src/rendering.js';
test('steam is excluded from AO depth and its previous visibility is restored',()=>{
 const scene=new THREE.Scene(),visible=new THREE.Sprite(),hidden=new THREE.Sprite();hidden.visible=false;scene.add(visible,hidden);
 const pass=new WorldSSAOPass(scene,new THREE.PerspectiveCamera(),16,16,4);
 pass._overrideVisibility();assert.equal(visible.visible,false);assert.equal(hidden.visible,false);
 pass._restoreVisibility();assert.equal(visible.visible,true);assert.equal(hidden.visible,false);pass.dispose();
});
