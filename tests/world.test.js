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
