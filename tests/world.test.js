import test from 'node:test';
import assert from 'node:assert/strict';
import {damp, turn, walkable, findPath, clearLine, move} from '../world/src/motion.js';
test('movement damping has the same result at 30 and 120 FPS',()=>{
 const simulate=fps=>{let v=0;for(let i=0;i<fps;i++)v=damp(v,3,8,1/fps);return v;};
 assert.ok(Math.abs(simulate(30)-simulate(120))<1e-9);
 assert.ok(damp(3,0,12,.5)<.01);
});
test('heading crosses the angular wrap by the shortest route',()=>{
 const a=turn(Math.PI-.1,-Math.PI+.1,10,.05);assert.ok(a>Math.PI-.1);assert.ok(a<Math.PI+.1);
});
test('navigation finds a collision-safe route around a desk',()=>{
 const valid=p=>walkable(p,[[-5,-5,5,5]],[[-1,-2,1,2]]);
 const start={x:-3,z:0},end={x:3,z:0},path=findPath(start,end,valid);
 assert.ok(path.length>1);let from=start;for(const p of path){assert.ok(clearLine(from,p,valid));from=p;}
 assert.deepEqual(path.at(-1),end);
 assert.deepEqual(findPath(start,{x:0,z:0},valid),[]);
});
test('island gaps are impassable and a connected bridge is usable',()=>{
 const bounds=[[-6,-3,-2,3],[2,-3,6,3],[-2.5,-.7,2.5,.7]];
 const valid=p=>walkable(p,bounds,[]);
 assert.equal(valid({x:0,z:2}),false);
 const start={x:-4,z:2},path=findPath(start,{x:4,z:2},valid);assert.ok(path.length);
 let from=start;for(const p of path){assert.ok(clearLine(from,p,valid));from=p;}
});
test('fast movement cannot tunnel through furniture or leave the ground',()=>{
 const valid=p=>walkable(p,[[-5,-5,5,5]],[[0,-2,1,2]]);
 assert.deepEqual(move({x:-1,z:0},{x:100,z:0},.05,valid),{x:-1,z:0});
 assert.deepEqual(move({x:-4,z:0},{x:-100,z:0},.05,valid),{x:-4,z:0});
});

import {worldBounds,DIVIDERS} from '../world/src/layout.js';
test('production island bridges connect all three career chapters',()=>{
 const valid=p=>walkable(p,worldBounds('islands'),[]);
 for(const [start,end] of [[{x:-7,z:2.7},{x:0,z:.4}],[{x:0,z:.4},{x:7.6,z:.65}]]){
  const path=findPath(start,end,valid);assert.ok(path.length,'A real bridge must be reachable');
  let from=start;for(const p of path){assert.ok(clearLine(from,p,valid));from=p;}
 }
});
test('workshop dividers require walking around their front edge',()=>{
 const valid=p=>walkable(p,worldBounds('paper'),DIVIDERS),start={x:-3.3,z:-2},end={x:-2,z:-2};
 assert.equal(clearLine(start,end,valid),false);const path=findPath(start,end,valid);assert.ok(path.length>1);
 let from=start;for(const p of path){assert.ok(clearLine(from,p,valid));from=p;}
});

import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {craftKit} from '../world/src/craft.js';
import {createExplorer} from '../world/src/explorer.js';
test('crafted furniture batches mixed geometry into valid renderable meshes',()=>{
 const group=new THREE.Group(),ownedGeometries=new Set();
 const mat=color=>new THREE.MeshStandardMaterial({color});
 const paper=mat(0xe8dfc9),wood=mat(0xb58a5b),red=mat(0xa94431),dark=mat(0x4b4b43),white=mat(0xf4eedc);
 const mesh=(geometry,material,x,y,z,parent=group)=>{assert.ok(geometry,'geometry must exist after batching');const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;};
 const box=(x,y,z,w,h,d,material,parent)=>mesh(new RoundedBoxGeometry(w,h,d,2,.01),material,x,y,z,parent);
 const cylinder=(x,y,z,r,h,material,parent)=>mesh(new THREE.CylinderGeometry(r,r,h,12),material,x,y,z,parent);
 const craft=craftKit({group,mat,mesh,box,cylinder,paper,wood,red,dark,white,paperTexture:null,ownedGeometries});
 for(const obj of [craft.bench(0,0),craft.meeting(5,0),craft.bookshelf(7,0),craft.doorway(0,3),craft.roomDetails([-5,0,5],false,false),craft.scannerDetail(0,-1)]){
  let draws=0;obj.traverse(n=>{if(n.isMesh){draws++;assert.ok(n.geometry.attributes.position.count>0);assert.ok(n.geometry.attributes.normal);}});
  assert.ok(draws<25,'batching should bound draw calls per object');
 }
});
test('courier robot clips bind and produce continuous finite poses',()=>{
 const {scene,animations}=createExplorer(),mixer=new THREE.AnimationMixer(scene);
 for(const name of ['Idle','Walking','Sitting','Standing']){
  mixer.stopAllAction();const clip=animations.find(c=>c.name===name);assert.ok(clip);const action=mixer.clipAction(clip).play();
  for(let i=0;i<60;i++){mixer.update(1/60);scene.traverse(n=>assert.ok([...n.position,...n.quaternion].every(Number.isFinite)));}
  action.stop();
 }
});

import {buildWorld} from '../world/src/scene.js';
test('all production world interaction approaches are reachable with furniture present',()=>{
 const priorDocument=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 const prototype=new THREE.Group();prototype.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial()));
 const models=new Proxy({},{get:()=>prototype});
 try{
  for(const kind of ['paper','night','islands']){
   const world=buildWorld(kind,models,null),valid=p=>walkable(p,world.bounds,world.obstacles);
   try{for(const target of world.targets){
    assert.ok(valid(target.approach),`${kind}/${target.id} approach must clear obstacles`);
    const path=findPath(world.start,target.approach,valid);assert.ok(path.length,`${kind}/${target.id} must be reachable`);
    let from=world.start;for(const p of path){assert.ok(clearLine(from,p,valid));from=p;}
   }}finally{world.dispose();}
  }
 }finally{globalThis.document=priorDocument;prototype.children[0].geometry.dispose();prototype.children[0].material.dispose();}
});
