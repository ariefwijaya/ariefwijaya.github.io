import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildWorld} from '../world/src/scene.js';

function withWorlds(kind,run){
 const priorDocument=globalThis.document;
 // Canvas label drawing is the only browser API used by the production builder.
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 const prototype=new THREE.Group(),geometry=new THREE.BoxGeometry(1,1,1),material=new THREE.MeshStandardMaterial();
 prototype.add(new THREE.Mesh(geometry,material));
 const models=new Proxy({},{get:()=>prototype}),worlds=[buildWorld(kind,models,null),buildWorld(kind,models,null)];
 try{run(...worlds,{geometry,material});}finally{worlds.forEach(w=>w.dispose());geometry.dispose();material.dispose();globalThis.document=priorDocument;}
}
function pose(world,ignoreVisibility=false){
 const result=[];
 world.group.traverse(o=>{if(o.name.startsWith('ambient-')){
  result.push([...o.position,...o.quaternion,...o.scale,ignoreVisibility?true:o.visible,o.material?.opacity]);
  if(o.name.startsWith('ambient-rain-'))result.push([...o.geometry.attributes.position.array]);
 }});
 return result;
}
test('ambient motion freezes in Calm and inactive worlds, then resumes continuously',()=>{
 for(const kind of ['paper','night','islands'])withWorlds(kind,(world,control)=>{
  assert.equal(typeof world.updateEnvironment,'function');
  world.updateEnvironment(1);control.updateEnvironment(1);
  const before=pose(world,true);assert.ok(before.length,'each world has ambient elements');
  world.updateEnvironment(20,{calm:true});world.updateEnvironment(30,{active:false});
  assert.deepEqual(pose(world,true),before);
  const dust=world.group.getObjectByName('ambient-paper-dust');if(dust)assert.equal(dust.visible,false);
  world.updateEnvironment(1/60);control.updateEnvironment(1/60);
  assert.deepEqual(pose(world),pose(control),'paused wall-clock time must not advance the phase');
  assert.notDeepEqual(pose(world,true),before,'visible animation resumes');
 });
});
test('ambient transforms are independent of frame rate and ignore invalid deltas',()=>{
 for(const kind of ['paper','night','islands'])withWorlds(kind,(a,b)=>{
  assert.equal(typeof a.updateEnvironment,'function');
  for(let i=0;i<30;i++)a.updateEnvironment(1/30);
  for(let i=0;i<120;i++)b.updateEnvironment(1/120);
  const round=p=>p.map(row=>row.map(v=>typeof v==='number'?Math.round(v*1e8)/1e8:v));
  assert.deepEqual(round(pose(a)),round(pose(b)));
  const before=pose(a);for(const dt of [-1,NaN,Infinity])a.updateEnvironment(dt);
  assert.deepEqual(pose(a),before);
 });
});
test('camera collision uses solid world meshes and every new material resource is world-owned',()=>{
 withWorlds('islands',(world,unused,shared)=>{
  assert.ok(Array.isArray(world.cameraColliders));
  assert.ok(world.cameraColliders.length>12);
  assert.ok(world.cameraColliders.every(o=>o.isMesh&&!o.material.userData.foliage&&!o.material.userData.cameraPassThrough&&!o.name.startsWith('ambient-')));
  world.group.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(-7.6,1.6,0),new THREE.Vector3(0,0,-1));
  assert.ok(ray.intersectObjects(world.cameraColliders,false).length,'desk and back wall obstruct a camera');
  const textures=new Set(),materials=new Set();
  world.group.traverse(o=>{if(o.material){materials.add(o.material);for(const value of Object.values(o.material))if(value?.isTexture)textures.add(value);}});
  assert.ok(textures.size>=4,'procedural surface detail is installed');
  let disposed=0,sharedDisposals=0;
  for(const t of textures)t.addEventListener('dispose',()=>disposed++);
  shared.geometry.addEventListener('dispose',()=>sharedDisposals++);shared.material.addEventListener('dispose',()=>sharedDisposals++);
  world.dispose();
  assert.equal(disposed,textures.size);assert.equal(sharedDisposals,0,'shared GLTF resources survive switching worlds');
 });
});
test('room worlds sit on a receiving tabletop that is excluded from camera and walking collision',()=>{
 withWorlds('paper',world=>{
  const tabletop=world.group.getObjectByName('tabletop');
  assert.ok(tabletop?.isMesh);assert.ok(tabletop.receiveShadow);
  assert.equal(world.cameraColliders.includes(tabletop),false);
  world.group.updateMatrixWorld(true);
  const ray=new THREE.Raycaster(new THREE.Vector3(-10,0,0),new THREE.Vector3(0,-1,0));
  assert.ok(ray.intersectObject(tabletop).length,'ground continues outside the miniature plinth');
 });
});

test('island atmosphere owns its cloud instances and uses fewer water triangles than the old sea',()=>{
 withWorlds('islands',world=>{
  const water=world.group.getObjectByName('ambient-water');
  const sky=world.group.getObjectByName('ambient-island-sky');
  const clouds=world.group.getObjectByName('ambient-clouds');
  assert.ok(water.geometry.index.count/3<32768);
  assert.ok(sky.material.side===THREE.BackSide&&!sky.material.depthWrite);
  assert.equal(clouds.count,18);
  assert.equal(world.cameraColliders.includes(clouds),false);
  let disposals=0;clouds.addEventListener('dispose',()=>disposals++);
  world.dispose();world.dispose();assert.equal(disposals,1);
 });
});

test('Night has a tower and batched city below the walkable studio, without Paper tabletop props',()=>{
 withWorlds('night',world=>{
  assert.equal(world.group.getObjectByName('tabletop').visible,false);assert.equal(world.group.getObjectByName('tabletop-props'),undefined);
  const city=world.group.getObjectByName('night-city'),tower=city.getObjectByName('studio-tower');assert.ok(tower);assert.ok(tower.position.y<-10);
  assert.ok(city.children.length<=7,'city and windows share a small number of draw calls');assert.ok(city.getObjectByName('city-windows').isInstancedMesh);
  assert.ok(city.children.every(o=>!world.cameraColliders.includes(o)));
 });
});
test('source book opens through its hinge and closes back to the object, including Calm',()=>{
 withWorlds('paper',world=>{
  const book=world.group.getObjectByName('book-cover-hinge');
  world.displays.open('source');world.displays.update(.6,false);assert.ok(book.rotation.y<-.2&&book.rotation.y>-3);
  world.displays.update(.6,false);assert.ok(book.rotation.y<-3);
  world.displays.close();world.displays.update(.2,false);assert.ok(book.rotation.y>-3&&book.rotation.y<0);
  world.displays.update(1,false);assert.equal(Math.abs(book.rotation.y),0);
  world.displays.open('source');world.displays.update(0,true);assert.ok(book.rotation.y<-3);
  world.displays.close();world.displays.update(0,true);assert.equal(Math.abs(book.rotation.y),0);
 });
});

test('Document AI feeds a constant-size printed page onto its tray and leaves it there after reading',()=>{
 withWorlds('paper',world=>{
  assert.equal(world.group.getObjectByName('story-display-ai'),undefined,'no invented monitor');
  const page=world.group.getObjectByName('printed-field-notes');assert.equal(page.visible,false);
  world.displays.open('ai');world.displays.update(.8,false);const midway=page.position.z;assert.equal(page.visible,true);
  world.displays.close();world.displays.update(3,false);assert.ok(page.position.z>midway);assert.equal(page.visible,true);assert.equal(page.scale.x,1);
  const end=page.position.clone();world.displays.open('ai');world.displays.update(1,false);assert.deepEqual(page.position,end,'reading the same print does not re-feed it');assert.equal(world.displays.printing,false);
 });
});

// The close-up moves the camera, never the reading furniture or book dimensions.
test('books rest on physical tables and remain fixed throughout opening and closing',()=>{
 for(const kind of ['paper','night','islands'])withWorlds(kind,world=>{
  for(const id of ['source']){
   const book=world.group.getObjectByName(`story-display-${id}`),table=world.group.getObjectByName(`reading-table-${id}`);
   assert.ok(table);const position=book.position.clone(),scale=book.scale.clone(),rotation=book.rotation.clone();
   assert.ok(Math.abs(book.position.y-.30*.09-1.01)<.01,'back cover rests on tabletop');
   world.displays.open(id);world.displays.update(.6,false);
   assert.deepEqual(book.position,position);assert.deepEqual(book.scale,scale);assert.ok(book.rotation.equals(rotation));
   world.displays.update(.6,false);const view=world.displays.view(1.5);
   assert.ok(view.position.y>view.target.y+2,'reading view looks down onto the real table');
   world.displays.close();world.displays.update(2,false);
   assert.deepEqual(book.position,position);assert.deepEqual(book.scale,scale);
  }
 });
});

test('SCM report travels inside its drawer while engineering notes persist unchanged',()=>{
 withWorlds('night',world=>{
  const drawer=world.group.getObjectByName('scm-archive-drawer'),report=world.group.getObjectByName('story-display-reports'),board=world.group.getObjectByName('story-display-lead');
  assert.equal(report.parent,drawer);assert.equal(world.group.getObjectByName('folder-cover-hinge'),undefined);
  const local=report.position.clone(),boardScale=board.scale.clone();assert.equal(board.visible,true);
  world.displays.open('reports');world.displays.update(.6,false);assert.ok(drawer.position.z>0&&drawer.position.z<1);
  assert.deepEqual(report.position,local);world.displays.update(.6,false);assert.equal(drawer.position.z,1);
  world.displays.close();world.displays.update(1,false);assert.equal(drawer.position.z,0);
  world.displays.open('lead');world.displays.update(.6,false);assert.equal(board.visible,true);assert.deepEqual(board.scale,boardScale);
  world.displays.close();world.displays.update(1,false);assert.equal(board.visible,true);
 });
});

test('Paper home establishes human scale without blocking overview camera or navigation',()=>{
 withWorlds('paper',world=>{
  const home=world.group.getObjectByName('paper-home');assert.ok(home);assert.ok(home.children.length<=10,'room is batched by material');
  const box=new THREE.Box3().setFromObject(home);assert.ok(box.min.y<-14&&box.max.y>40);
  home.traverse(o=>{if(o.isMesh)assert.ok(!world.cameraColliders.includes(o));});
  world.group.updateMatrixWorld(true);
  const start=new THREE.Vector3(44,60,84),aim=new THREE.Vector3(0,1,0),ray=new THREE.Raycaster(start,aim.clone().sub(start).normalize());
  const first=ray.intersectObject(home,true)[0];assert.ok(!first||first.distance>start.distanceTo(aim),'outside wall faces must not cover the miniature');
 });
});
