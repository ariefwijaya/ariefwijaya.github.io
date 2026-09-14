import {createPrinterReadout} from './printer-readout.js';
import * as THREE from 'three';
import {stories} from './content.js';
export function createStoryDisplays({group,targets,readingStations,ownedMaterials,ownedGeometries,ownedTextures,props=[],cameraColliders=[]}){
 const displays={};const printer=createPrinterReadout({group,target:targets.find(t=>t.id==='ai'),ownedMaterials,ownedGeometries,ownedTextures,props,cameraColliders});
 for(const id of ['lead','reports','source']){
  const target=targets.find(t=>t.id===id),story=stories[id],canvas=document.createElement('canvas');canvas.width=1024;canvas.height=id==='lead'?390:640;const ctx=canvas.getContext('2d');
  ctx.fillStyle=id==='ai'?'#233d41':'#efe3c8';ctx.fillRect(0,0,1024,640);ctx.fillStyle='#bc6e48';ctx.fillRect(0,0,1024,12);
  ctx.fillStyle=id==='ai'?'#efe3c8':'#39453c';ctx.font='24px sans-serif';ctx.fillText(story.eyebrow.toUpperCase(),56,id==='lead'?42:65);ctx.font=id==='lead'?'42px Georgia':'52px Georgia';ctx.fillText(story.title,56,id==='lead'?104:145);
  ctx.font='28px sans-serif';ctx.fillText(story.subtitle,56,id==='lead'?147:205);
  const excerpt=story.body.split('. ')[0]+'.';ctx.font=id==='lead'?'30px sans-serif':'39px sans-serif';let line='',lines=[];for(const word of excerpt.split(' ')){if((line+' '+word).length>(id==='lead'?54:40)){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);
  lines.slice(0,id==='lead'?4:6).forEach((line,i)=>ctx.fillText(line,56,id==='lead'?210+i*35:287+i*49));ctx.font='22px sans-serif';ctx.fillText('ARIEF WIJAYA  /  FIELD NOTES',56,id==='lead'?370:608);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.name=`story-${id}`;ownedTextures.add(texture);
  const panel=new THREE.Group();panel.name=`story-display-${id}`;panel.position.set(target.position.x,target.position.y+.05,target.position.z+.5);group.add(panel);
  if(id==='ai')panel.position.z+=.45;
  if(id==='lead')panel.position.set(target.position.x,1.6,-3.10);
  if(id==='source')panel.position.set(target.position.x-.4,1.4,target.position.z+.75);
  const width=id==='lead'?3.25:2.45,height=id==='lead'?1.24:width*.625;
  const ownMesh=(geo,mat,parent=panel)=>{ownedGeometries.add(geo);ownedMaterials.add(mat);const mesh=new THREE.Mesh(geo,mat);parent.add(mesh);return mesh;};
  const card=(w,h,d,color,parent=panel)=>ownMesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color,roughness:.82}),parent);
  const surface=ownMesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));surface.position.z=.08;
  let hinge=null;
  if(id==='source'){
   // A real spine hinge opens the cover; the document stays bound to its object.
   const coverColor=id==='source'?0x8b3e32:0xb69b6c;
   card(width+.15,height+.15,.10,coverColor).position.z=-.04;
   for(let i=0;i<4;i++){const pages=card(width-.02,height-.03,.012,0xe8dcc4);pages.position.z=i*.018;}

   hinge=new THREE.Group();hinge.name=id==='source'?'book-cover-hinge':'folder-cover-hinge';hinge.position.set(-width/2,0,.11);panel.add(hinge);
   const cover=card(width+.07,height+.1,.035,coverColor,hinge);cover.position.x=width/2;
   const band=card(width*.65,.035,.012,0xd8bc7b,hinge);band.position.set(width/2,height*.26,.025);
   const inside=document.createElement('canvas');inside.width=1024;inside.height=640;const ink=inside.getContext('2d');ink.fillStyle='#e8dcc4';ink.fillRect(0,0,1024,640);ink.fillStyle='#39453c';ink.font='42px Georgia';ink.fillText(id==='source'?'From the bookshelf':'Work notes',64,84);
   const entries=id==='source'?story.repositories:story.facts;
   entries.forEach(([name,description],i)=>{ink.font='34px Georgia';ink.fillText(name,64,170+i*106);ink.font='27px sans-serif';ink.fillText(description,64,211+i*106);});
   const insideTexture=new THREE.CanvasTexture(inside);insideTexture.colorSpace=THREE.SRGBColorSpace;ownedTextures.add(insideTexture);
   const insidePage=ownMesh(new THREE.PlaneGeometry(width-.06,height-.04),new THREE.MeshBasicMaterial({map:insideTexture,toneMapped:false}),hinge);insidePage.rotation.y=Math.PI;insidePage.position.set(width/2,0,-.025);

   const station=readingStations[id];
   panel.scale.setScalar(.30);panel.rotation.x=-Math.PI/2;
   panel.position.set(station.x+width*.30/2,station.y,station.z);
  }else if(id==='reports'){
   const station=readingStations.reports;station.drawer.add(panel);
   panel.position.set(0,.788,0);panel.scale.setScalar(.48);panel.rotation.x=-Math.PI/2;
   card(width+.05,height+.05,.018,0xe8dcc4).position.z=.025;
  }else{
   // These are the actual board notes, visible before, during and after reading.
   panel.position.set(target.position.x,1.5,-3.26);
  }
  if(hinge)panel.traverse(o=>{if(o.isMesh){o.userData.target=id;props.push(o);}});
  const rest=panel.position.clone();panel.visible=true;const drawer=id==='reports'?readingStations.reports.drawer:null;
  displays[id]={panel,hinge,drawer,rest,width,height,view(aspect=1.5){
   const spread=hinge&&aspect>=.8,target=rest.clone();
   if(hinge){
    if(spread)target.x-=width*.30/2;
    return {position:target.clone().add(new THREE.Vector3(0,2.4,1.1)),target,span:spread?width*.30*2.3:width*.30*1.2,height:height*.30+.22};
   }
   if(drawer){const station=readingStations.reports;target.set(station.x,.82,station.z+1);return {position:target.clone().add(new THREE.Vector3(0,2.4,1.1)),target,span:width*.48+.2,height:height*.48+.2};}
   return {position:target.clone().add(new THREE.Vector3(0,.05,1.6)),target,span:width+.35,height:height+.7};
  }};

 }
 let active=null,time=0,closing=false;
 const settle=(id,d,progress)=>{
  const p=d.panel,e=progress*progress*(3-2*progress);
  if(d.hinge){
   p.visible=true;d.hinge.rotation.y=-Math.PI*e;
  }else if(d.drawer){d.drawer.position.z=e;} // The board stays unchanged; only the camera approaches it.
 };
 return {
  open(id,aspect){active=id;closing=false;time=0;for(const [key,d]of Object.entries(displays))settle(key,d,0);if(id==='ai')return printer.open();printer.close();return displays[id]?.view(aspect);},
  get printing(){return printer.printing;},
  view(aspect){return active==='ai'?printer.view():displays[active]?.view(aspect);},
  close(){printer.close();if(active){closing=true;time=Math.min(time,1.2);}},
  update(dt,calm){printer.update(dt,calm);if(active==='ai'){if(closing)active=null;return;}if(!active)return;time=closing?Math.max(0,time-dt*1.8):time+dt;settle(active,displays[active],calm?(closing?0:1):Math.min(1,time/1.2));if(closing&&(calm||time===0))active=null;}
 };
}
