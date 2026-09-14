import * as THREE from 'three';
// All windows share one instanced mesh; the studio remains the only walkable floor.
export function createNightCity({group,ownedMaterials,ownedGeometries,stoneMap}){
 const city=new THREE.Group();city.name='night-city';group.add(city);
 const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometries.add(geometry);
 const material=(color,extra={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.88,...extra});ownedMaterials.add(m);return m;};
 const concrete=material(0x466076,{map:stoneMap}),roof=material(0x63839c,{map:stoneMap}),trim=material(0x617682),street=material(0x172939);
 const add=(x,y,z,w,h,d,m)=>{const o=new THREE.Mesh(geometry,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.receiveShadow=true;city.add(o);return o;};
 add(0,-14.4,.2,16.9,27.8,8.8,concrete).name='studio-tower';
 for(let y=-2;y>-28;y-=2.3)add(0,y,.2,17.12,.12,9,trim);
 add(0,-.55,.2,17.65,.22,9.55,roof);
 add(0,-29,0,230,.5,230,street);
 const road=material(0x34475a);
 for(let i=-4;i<=4;i++){const offset=i*13+6.5;add(offset,-28.72,0,3.2,.035,120,road);add(0,-28.72,offset,120,.035,3.2,road);}
 const buildings=[{x:0,z:.2,w:16.9,d:8.8,top:-.75,bottom:-28}];
 for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){
  if(Math.abs(i)<2&&Math.abs(j)<2)continue;
  const seed=Math.abs(Math.sin(i*17.1+j*8.7)),h=4+seed*12,x=i*13,z=j*13,w=3+seed*2,d=3+(1-seed)*2;
  add(x,-28+h/2,z,w,h,d,concrete);add(x,-28+h+.12,z,w+.3,.24,d+.3,roof);
  buildings.push({x,z,w,d,top:-28+h,bottom:-28});
 }
 const matrices=[],dummy=new THREE.Object3D();
 for(const b of buildings)for(let y=b.bottom+1;y<b.top-1;y+=2.3){
  for(let x=-b.w/2+.8;x<b.w/2-.3;x+=1.45)for(const face of [-1,1]){
   if(Math.sin(x*8+y*2+b.x+b.z)>.2){dummy.position.set(b.x+x,y,b.z+face*(b.d/2+.025));dummy.scale.set(.65,.95,.035);dummy.updateMatrix();matrices.push(dummy.matrix.clone());}
  }
  for(let z=-b.d/2+.8;z<b.d/2-.3;z+=1.45)for(const face of [-1,1]){
   if(Math.cos(z*8+y*2+b.x+b.z)>.2){dummy.position.set(b.x+face*(b.w/2+.025),y,b.z+z);dummy.scale.set(.035,.95,.65);dummy.updateMatrix();matrices.push(dummy.matrix.clone());}
  }
 }
 const windows=new THREE.InstancedMesh(geometry,material(0xc8ab83,{emissive:0xffbd65,emissiveIntensity:.3}),matrices.length);windows.name='city-windows';matrices.forEach((m,i)=>windows.setMatrixAt(i,m));windows.computeBoundingSphere();city.add(windows);
 const batches=new Map();
 for(const child of [...city.children]){if(!child.isMesh||child.isInstancedMesh||child.name==='studio-tower')continue;child.updateMatrix();if(!batches.has(child.material))batches.set(child.material,[]);batches.get(child.material).push(child.matrix.clone());city.remove(child);}
 for(const [m,transforms]of batches){const batch=new THREE.InstancedMesh(geometry,m,transforms.length);transforms.forEach((matrix,i)=>batch.setMatrixAt(i,matrix));batch.computeBoundingSphere();city.add(batch);}
 return city;
}
