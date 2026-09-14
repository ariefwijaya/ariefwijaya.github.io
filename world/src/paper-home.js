import * as THREE from 'three';
// Human-scale furnishings establish that the workshop is a miniature on a desk.
export function createPaperHome({group,surfaces,ownedMaterials,ownedGeometries,batch}){
 const home=new THREE.Group();home.name='paper-home';group.add(home);
 const mat=(color,map=null,extra={})=>{const m=new THREE.MeshStandardMaterial({color,map,roughness:.9,...extra});ownedMaterials.add(m);return m;};
 const wood=mat(0xab8157,surfaces.woodColor),cream=mat(0xe4d8c4,surfaces.paperColor),wall=mat(0xc5b9a7),floor=mat(0x8d735d,surfaces.woodColor),red=mat(0x8e4e3c,surfaces.linenColor),green=mat(0x6d7c6b),dark=mat(0x3d4e4a);
 const box=(x,y,z,w,h,d,m)=>{const g=new THREE.BoxGeometry(w,h,d);ownedGeometries.add(g);const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.receiveShadow=true;home.add(o);return o;};
 box(0,-1.3,0,34,1,22,wood).name='human-desk';
 for(const x of [-15,15])for(const z of [-9,9])box(x,-8,z,1.4,13,1.4,wood);
 box(0,-15,0,130,.5,130,floor);
 // Interior-only faces let the overview camera see through the outside shell.
 const face=(x,y,z,w,h,rx,ry,m)=>{const g=new THREE.PlaneGeometry(w,h);ownedGeometries.add(g);const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.rotation.set(rx,ry,0);o.name='home-interior-wall';home.add(o);};
 face(0,18,-45,110,66,0,0,wall);face(-55,18,0,100,66,0,Math.PI/2,wall);face(55,18,0,100,66,0,-Math.PI/2,wall);face(0,18,50,110,66,0,Math.PI,wall);face(0,51,0,110,100,Math.PI/2,0,cream);
 const daylight=mat(0xc9e2e3,null,{emissive:0xb4ccd1,emissiveIntensity:.55});
 box(-18,22,-44.5,31,30,.6,wood);box(-18,22,-44,29,28,.2,daylight);
 for(const x of [-32,-18,-4])box(x,22,-43.7,.6,28,.4,cream);
 box(-18,22,-43.7,29,.6,.4,cream);box(-18,6.7,-43,33,.7,3,wood);
 for(const x of [-36,0])box(x,21,-43,6,33,1.1,cream);
 // Tall bookshelf and individually varied large books beyond the miniature.
 for(const x of [22,38])box(x,7,-39,1,44,7,wood);
 for(const y of [-14,-4,6,16,28])box(30,y,-39,17,1,7,wood);
 for(let row=0;row<4;row++)for(let i=0;i<7;i++){
  const h=6+(i%3);const b=box(24+i*1.8,-13.4+row*10+h/2,-38,1.4,h,4.3,[cream,red,green,dark][(i+row)%4]);b.rotation.z=i===6?-.1:0;
 }
 // Human chair beside the table; its seat is several robot-heights wide.
 box(-26,-5,6,11,1,10,green);box(-30,3,6,1,16,10,wood);
 for(const x of [-30,-22])for(const z of [2,10])box(x,-10,z,1,10,1,wood);
 const lamp=mat(0xd7b770,null,{emissive:0xffc77c,emissiveIntensity:.16});
 box(12,-.5,-7,4,.3,4,dark);box(12,8,-7,.5,17,.5,dark);box(9,16,-7,6,.5,.5,dark);
 const shadeGeometry=new THREE.ConeGeometry(3,3,20,1,true);ownedGeometries.add(shadeGeometry);const shade=new THREE.Mesh(shadeGeometry,lamp);shade.position.set(6,14.5,-7);home.add(shade);
 return batch?batch(home):home;
}
