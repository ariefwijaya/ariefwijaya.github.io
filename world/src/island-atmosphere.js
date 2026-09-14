import {configurePanorama} from './texture-sampling.js';
import * as THREE from 'three';

let imagePromise;
// Cache decoded sources; GPU textures belong to each world and are disposed on exit.
export function loadIslandImages(){
 return imagePromise??=Promise.all(['island-limestone-cartoon','island-sky-cartoon'].map(name=>new Promise(resolve=>{
  const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);image.src=`/world/textures/${name}.webp`;
 })));
}
export function islandAtmosphere({group,images=[],stoneMap,ownedTextures,ownedMaterials,ownedGeometries}){
 const texture=(image)=>{if(!image)return null;const t=new THREE.Texture(image);t.colorSpace=THREE.SRGBColorSpace;t.needsUpdate=true;ownedTextures.add(t);return t;};
 const stone=stoneMap||texture(images[0]);if(stone){stone.wrapS=stone.wrapT=THREE.MirroredRepeatWrapping;stone.repeat.set(2,2);stone.anisotropy=4;}
 const skyMap=texture(images[1]);if(skyMap)configurePanorama(skyMap);
 const geometry=new THREE.SphereGeometry(225,40,24);ownedGeometries.add(geometry);
 const material=new THREE.MeshBasicMaterial({map:skyMap,color:skyMap?0xffffff:0x9bd1e5,side:THREE.BackSide,depthWrite:false,fog:false});ownedMaterials.add(material);
 const sky=new THREE.Mesh(geometry,material);sky.name='ambient-island-sky';sky.renderOrder=-2;group.add(sky);
 // A handful of shared low-poly puffs gives the overview depth; no shadow pass.
 const cloudGeometry=new THREE.SphereGeometry(1,12,8);ownedGeometries.add(cloudGeometry);
 const cloudMaterial=new THREE.MeshStandardMaterial({color:0xfff7e8,roughness:1});ownedMaterials.add(cloudMaterial);
 const clouds=new THREE.InstancedMesh(cloudGeometry,cloudMaterial,18);clouds.name='ambient-clouds';group.add(clouds);
 const transform=new THREE.Object3D();
 let previousTime=-1;
 function update(t){
  if(t===previousTime)return;previousTime=t;
  sky.rotation.y=.3+t*.0015;
  for(let i=0;i<18;i++){
   const cluster=Math.floor(i/6),j=i%6;
   const x=[-12,2,16][cluster],z=[-9,-13,-7][cluster];
   transform.position.set(x+(j-2.5)*.9+Math.sin(t*.025+cluster)*1.1,6.2+cluster*.7+Math.sin(j*2.4)*.3,z+Math.cos(j*1.9)*.5);
   transform.scale.set(1.25,.5+(j%3)*.2,.8);transform.updateMatrix();clouds.setMatrixAt(i,transform.matrix);
  }
  clouds.instanceMatrix.needsUpdate=true;clouds.computeBoundingSphere();
 }
 update(0);return {stone,update};
}
