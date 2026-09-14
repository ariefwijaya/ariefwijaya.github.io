import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {configurePanorama,softParticleTexture} from '../world/src/texture-sampling.js';
test('generated panorama longitude meets continuously across the sphere seam',()=>{
 const t=configurePanorama(new THREE.Texture());t.updateMatrix();
 for(const v of [.2,.5,.8]){const left=new THREE.Vector2(.000001,v),right=new THREE.Vector2(.999999,v);t.transformUv(left);t.transformUv(right);assert.ok(left.distanceTo(right)<.00001);}
 assert.equal(t.wrapS,THREE.MirroredRepeatWrapping);t.dispose();
});
test('decorative point alpha has no opaque square corners',()=>{
 const t=softParticleTexture(),{width,height,data}=t.image;
 for(const i of [0,width-1,(height-1)*width,width*height-1])assert.equal(data[i*4+3],0);
 assert.ok(data[(16*width+16)*4+3]>220);t.dispose();
});
