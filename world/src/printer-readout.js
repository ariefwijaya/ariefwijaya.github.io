import * as THREE from 'three';
import {stories} from './content.js';
export function createPrinterReadout({group,target,ownedMaterials,ownedGeometries,ownedTextures,props=[],cameraColliders=[]}){
 const own=(geometry,material,parent)=>{ownedGeometries.add(geometry);ownedMaterials.add(material);const mesh=new THREE.Mesh(geometry,material);parent.add(mesh);return mesh;};
 const root=new THREE.Group();root.name='printer-output-tray';root.position.set(target.position.x,1.47,-.15);group.add(root);
 const tray=own(new THREE.BoxGeometry(1.25,.07,1.85),new THREE.MeshStandardMaterial({color:0x58625b,roughness:.8}),root);tray.position.y=-.04;tray.userData.target='ai';props.push(tray);cameraColliders.push(tray);
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=1024;const ctx=canvas.getContext('2d');ctx.fillStyle='#f4ecd8';ctx.fillRect(0,0,768,1024);ctx.fillStyle='#b15235';ctx.fillRect(50,62,80,6);ctx.font='23px sans-serif';ctx.fillText('FINTELITE / DOCUMENT LAB',50,110);ctx.fillStyle='#293a37';ctx.font='48px Georgia';ctx.fillText('Documents into data',50,190);ctx.font='25px sans-serif';ctx.fillText('Arief Wijaya · Machine Learning Engineer',50,244);ctx.fillText('2024',50,283);
 let line='',row=0;ctx.font='34px sans-serif';for(const word of stories.ai.body.split(' ')){if((line+' '+word).length>31){ctx.fillText(line,50,365+row++*46);line=word;}else line+=(line?' ':'')+word;}if(line)ctx.fillText(line,50,365+row*46);
 ctx.font='21px sans-serif';ctx.fillStyle='#68716a';ctx.fillText('FIELD NOTES · PRINTED IN THE WORKSHOP',50,970);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;ownedTextures.add(texture);
 const paper=own(new THREE.PlaneGeometry(1.05,1.4),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide,toneMapped:false}),root);paper.name='printed-field-notes';paper.rotation.x=-Math.PI/2;paper.position.y=.08;paper.visible=false;
 let elapsed=0,active=false;
 function pose(t){const p=Math.max(0,Math.min(1,t));paper.position.z=-1.75+1.75*p;paper.visible=p>0;}
 return {open(){if(elapsed===0){active=true;pose(0);}return this.view();},get printing(){return active;},view(){const point=new THREE.Vector3(target.position.x,1.55,-.15);return {target:point,position:point.clone().add(new THREE.Vector3(0,2.8,1.7)),span:1.35,height:1.9};},close(){/* A printed page remains on the output tray. */},update(dt,calm){if(!active)return;elapsed=calm?2.4:Math.min(2.4,elapsed+dt);pose(Math.max(0,elapsed-.35)/2.05);if(elapsed===2.4)active=false;}};
}
