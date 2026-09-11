// Frame-rate-independent movement and collision-safe paths, shared by all worlds.
export const damp = (value, target, rate, dt) => target + (value - target) * Math.exp(-rate * dt);
export const turn = (angle, target, rate, dt) => angle + Math.atan2(Math.sin(target-angle), Math.cos(target-angle)) * (1-Math.exp(-rate*dt));
export const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
export function walkable(p, bounds, obstacles, radius=.24) {
  const inside = bounds.some(b => p.x >= b[0]+radius && p.x <= b[2]-radius && p.z >= b[1]+radius && p.z <= b[3]-radius);
  return inside && !obstacles.some(b => p.x>b[0]-radius && p.x<b[2]+radius && p.z>b[1]-radius && p.z<b[3]+radius);
}
export function clearLine(a,b,valid) {
  const n=Math.max(1,Math.ceil(distance(a,b)/.12));
  for(let i=0;i<=n;i++) if(!valid({x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n}))return false;
  return true;
}
export function findPath(start, goal, valid, step=.35) {
  if(!valid(goal))return [];
  if(clearLine(start,goal,valid))return [goal];
  // Eight-neighbour A*: diagonals may never cut across an obstacle corner.
  const key=(x,z)=>`${x},${z}`, snap=p=>({x:Math.round(p.x/step),z:Math.round(p.z/step)});
  const s=snap(start),g=snap(goal), open=[{...s,g:0,f:0}], seen=new Map(), closed=new Set();
  const root=key(s.x,s.z);seen.set(root,{g:0,parent:null});
  for(let count=0;open.length&&count<9000;count++){
    open.sort((a,b)=>b.f-a.f);const cur=open.pop(), ck=key(cur.x,cur.z);
    if(closed.has(ck))continue;closed.add(ck);
    const cp={x:cur.x*step,z:cur.z*step};
    if(Math.abs(cur.x-g.x)<=1&&Math.abs(cur.z-g.z)<=1&&clearLine(cp,goal,valid)){
      const path=[goal];let k=ck;
      while(k!==root){const [x,z]=k.split(',').map(Number);path.unshift({x:x*step,z:z*step});k=seen.get(k).parent;}
      if(path.length&&!clearLine(start,path[0],valid))return [];
      // Remove grid zigzags only when the whole shortcut is collision-safe.
      const smooth=[];let from=start;
      for(let i=0;i<path.length;){let j=i;while(j+1<path.length&&clearLine(from,path[j+1],valid))j++;smooth.push(path[j]);from=path[j];i=j+1;}
      return smooth;
    }
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
      if(!dx&&!dz)continue;
      const x=cur.x+dx,z=cur.z+dz,k=key(x,z),p={x:x*step,z:z*step};
      if(closed.has(k)||!clearLine(cp,p,valid))continue;
      const cost=cur.g+Math.hypot(dx,dz);
      if(cost>=(seen.get(k)?.g??Infinity))continue;
      seen.set(k,{g:cost,parent:ck});open.push({x,z,g:cost,f:cost+Math.hypot(x-g.x,z-g.z)});
    }
  }
  return [];
}
export function move(position, velocity, dt, valid) {
  const next={x:position.x+velocity.x*dt,z:position.z+velocity.z*dt};
  if(clearLine(position,next,valid))return next;
  const x={x:next.x,z:position.z},z={x:position.x,z:next.z};
  if(clearLine(position,x,valid))return x;
  if(clearLine(position,z,valid))return z;
  return {...position};
}
