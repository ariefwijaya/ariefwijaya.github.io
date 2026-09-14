import * as THREE from 'three';
import {stories} from './content.js';

// The display uses the same factual content as the readable portfolio.
export const workstationPages = [
 {title:'Mobile & web', body:stories.build.body.split('. ')[0]+'.'},
 {title:'A growing role', body:stories.build.body.split('. ').slice(1).join('. ')},
 ...stories.build.facts.map(([title,body])=>({title,body})),
];

export function createWorkstation({group,mesh,box,mat,detail,ownedTextures,ownedMaterials,batch,x}) {
 const laptop=new THREE.Group();laptop.name='story-workstation';laptop.position.set(x+.42,1.205,-1.58);group.add(laptop);
 const alloy=mat(0xc2c1b8,{metalness:.35,roughness:.37,bumpMap:detail.metalBump,bumpScale:.0008});
 const rim=mat(0xd2cfc3,{metalness:.7,roughness:.28}),ink=mat(0x242924,{roughness:.48}),rubber=mat(0x4e514a,{roughness:.95});
 const base=new THREE.Group();laptop.add(base);
 box(0,.026,0,1.24,.052,.87,alloy,base);box(0,.05,-.09,1.12,.008,.43,ink,base);
 const keysClose=new THREE.Group(),keysFar=new THREE.Group();keysClose.name='keyboard-close';keysFar.name='keyboard-distant';laptop.add(keysClose,keysFar);
 for(let row=0;row<4;row++)for(let col=0;col<12;col++){
  const x=-.51+col*.092,z=-.245+row*.098;
  box(x,.06,z,.074,.014,.078,rubber,keysClose);
  mesh(new THREE.BoxGeometry(.074,.014,.078),rubber,x,.06,z,keysFar);
 }
 batch(keysClose);batch(keysFar);keysClose.visible=false;
 box(0,.059,.12,.39,.009,.066,rubber,base);box(0,.055,.285,.40,.005,.20,rim,base);box(0,.058,.285,.386,.005,.186,alloy,base);
 for(const side of [-1,1]){box(side*.594,.028,.07,.003,.019,.10,ink,base);box(side*.595,.028,.23,.003,.012,.035,ink,base);}
 const hinge=mesh(new THREE.CylinderGeometry(.026,.026,.97,16),rim,0,.066,-.38,base);hinge.rotation.z=Math.PI/2;
 batch(base);
 const lid=new THREE.Group();lid.position.set(0,.066,-.38);lid.rotation.x=-.12;laptop.add(lid);
 box(0,.47,0,1.24,.94,.037,alloy,lid);box(0,.47,.022,1.19,.89,.012,ink,lid);
 const lens=mesh(new THREE.SphereGeometry(.009,12,8),ink,0,.911,.033,lid);
 lens.name='webcam';
 const display=document.createElement('canvas');display.width=1024;display.height=768;
 const ctx=display.getContext('2d'),texture=new THREE.CanvasTexture(display);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;texture.name='workstation-story-display';ownedTextures.add(texture);
 const ownedScreen=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});ownedMaterials.add(ownedScreen);
 const screen=mesh(new THREE.PlaneGeometry(1.12,.84),ownedScreen,0,.47,.030,lid);screen.castShadow=false;screen.receiveShadow=false;screen.name='readable-laptop-screen';ownedScreen.toneMapped=false;
 const glowMat=mat(0xd8b776,{emissive:0xdba85d,emissiveIntensity:.5,transparent:true,opacity:.65,depthWrite:false});
 const halo=mesh(new THREE.TorusGeometry(.078,.008,6,32),glowMat,.51,.084,.30,laptop);halo.rotation.x=-Math.PI/2;halo.castShadow=false;
 let page=0,clock=0,reading=false;const viewPosition=new THREE.Vector3();
 function paint(index=0){
  page=THREE.MathUtils.clamp(index,0,workstationPages.length-1);const story=workstationPages[page];
  ctx.fillStyle='#efe9d9';ctx.fillRect(0,0,1024,768);
  ctx.fillStyle='#ac4934';ctx.fillRect(0,0,1024,9);ctx.fillStyle='#6f7167';ctx.font='24px sans-serif';ctx.fillText('ARIEF WIJAYA  /  WORK JOURNAL',62,65);
  ctx.fillStyle='#242f29';ctx.font='58px Georgia';ctx.fillText(story.title,62,163);
  ctx.fillStyle='#c5bda9';ctx.fillRect(62,194,900,2);ctx.fillStyle='#343e36';ctx.font='52px sans-serif';
  // Fixed character wrapping is deterministic in browser and resource tests.
  const lines=[];let line='';for(const word of story.body.split(' ')){if((line+' '+word).trim().length>31){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);
  lines.forEach((line,i)=>ctx.fillText(line,62,265+i*65));
  ctx.fillStyle='#a24834';ctx.font='26px sans-serif';ctx.fillText(`${String(page+1).padStart(2,'0')} / ${String(workstationPages.length).padStart(2,'0')}`,62,717);ctx.fillStyle='#6f7167';ctx.fillText('MOBILE  →  ARCHITECTURE  →  PEOPLE',250,717);texture.needsUpdate=true;
 }
 paint();
 return {object:laptop,
  updateView(camera,height){
   laptop.getWorldPosition(viewPosition);
   const pixels=1.24*height/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*Math.max(.01,camera.position.distanceTo(viewPosition)));
   // Hysteresis prevents LOD oscillation during a slow camera move. The shell,
   // screen and keyboard silhouette remain identical at both detail levels.
   if(pixels>140)keysClose.visible=true;else if(pixels<112)keysClose.visible=false;
   keysFar.visible=!keysClose.visible;
  },paint,get page(){return page;},setReading(value){reading=value;},
  view(){return {position:new THREE.Vector3(x+.42,2.08,1.0),target:new THREE.Vector3(x+.42,1.75,-1.98),span:1.35};},
  update(dt,{calm=false,near=false}={}){clock+=calm?0:dt;halo.visible=!reading;glowMat.opacity=near?.95:calm?.45:.45+Math.sin(clock*2)*.12;lid.rotation.x=THREE.MathUtils.damp(lid.rotation.x,reading?-.20:-.12,5,dt);},
 };
}
