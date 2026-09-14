import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// KURI: articulated courier robot. Bone names preserve walking, sitting and door IK.
export function createExplorer(){
 const scene=new THREE.Group();scene.name='KURI';
 const material=(name,color,roughness,metalness=0,extra={})=>{const m=new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});m.name=name;return m;};
 const enamel=material('kuri-enamel',0xf4e9d5,.42,.12),red=material('kuri-red',0xa93f2d,.43,.12),joint=material('kuri-joint',0x303b38,.45,.55),trim=material('kuri-brass',0x9e7750,.36,.62),fabric=material('kuri-canvas',0x923d2c,.92),sole=material('kuri-sole',0xd8c8aa,.85),glass=material('kuri-face',0x142421,.26,.18),light=material('kuri-eye',0xffe9a9,.3,0,{emissive:0xffd080,emissiveIntensity:1.4}),paper=material('kuri-paper',0xf3e7d0,.9);
 const pivot=(name,parent,x,y,z)=>{const g=new THREE.Group();g.name=name;g.position.set(x,y,z);parent.add(g);return g;};
 const form=(parent,geometry,material,x,y,z)=>{
  if(['kuri-enamel','kuri-red'].includes(material.name)){
   const normals=geometry.attributes.normal,colors=new Float32Array(normals.count*3);
   for(let i=0;i<normals.count;i++){
    const edge=geometry.userData.kuriPanel?Math.max(0,1-Math.max(Math.abs(normals.getX(i)),Math.abs(normals.getY(i)),Math.abs(normals.getZ(i)))):0;
    // Curved panel edges gather a little warm patina; the large painted faces stay clean.
    const wear=Math.min(.20,edge*.5);colors.set([1-wear*.32,1-wear*.58,1-wear*.82],i*3);
   }
   geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));material.vertexColors=true;
  }
  const tile={'kuri-enamel':[0,.5],'kuri-red':[.5,.5],'kuri-canvas':[0,0],'kuri-joint':[.5,0]}[material.name];
  if(tile){const uv=geometry.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,tile[0]+.035+uv.getX(i)*.43,tile[1]+.035+uv.getY(i)*.43);}
  const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
 const rounded=(parent,w,h,d,material,x,y,z,r=.035)=>{const geometry=new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2,h/2,d/2));geometry.userData.kuriPanel=true;return form(parent,geometry,material,x,y,z);};
 const ball=(parent,r,material,x,y,z)=>form(parent,new THREE.SphereGeometry(r,12,8),material,x,y,z);
 const axle=(parent,r,d,x,y,z)=>{const m=form(parent,new THREE.CylinderGeometry(r,r,d,12),joint,x,y,z);m.rotation.z=Math.PI/2;return m;};
 const hips=pivot('Hips',scene,0,.60,0);
 rounded(hips,.43,.42,.30,enamel,0,.22,0,.07);
 rounded(hips,.29,.115,.22,joint,0,-.015,0,.025);
 rounded(hips,.31,.26,.018,enamel,0,.22,.153,.028);
 axle(hips,.065,.13,0,.46,0);
 const head=pivot('Head',hips,0,.57,0);
 rounded(head,.57,.43,.36,enamel,0,.08,0,.08);
 rounded(head,.50,.35,.018,trim,0,.08,.181,.045);
 rounded(head,.466,.314,.032,glass,0,.08,.20,.045);
 for(const x of [-.099,.099]){
  const eye=pivot(x<0?'EyeL':'EyeR',head,x,.09,.223);
  const glow=ball(eye,.032,light,0,0,0);glow.scale.set(.72,1.2,.28);
 }
 for(const side of [-1,1]){axle(head,.084,.034,side*.288,.07,0);const cap=form(head,new THREE.CylinderGeometry(.060,.060,.014,12),trim,side*.31,.07,0);cap.rotation.z=Math.PI/2;}
 const antenna=pivot('Antenna',head,.16,.29,-.08);
 const stalk=form(antenna,new THREE.CylinderGeometry(.014,.014,.115,8),joint,0,.048,0);stalk.rotation.z=-.14;
 ball(antenna,.036,red,.008,.113,0);
 const bag=pivot('Mailbag',hips,0,.21,-.24);
 rounded(bag,.35,.34,.17,fabric,0,0,0,.045);
 rounded(bag,.30,.115,.035,fabric,0,.10,-.093,.018);
 rounded(bag,.24,.105,.045,fabric,0,-.095,-.11,.015);
 for(const x of [-.10,.10])rounded(bag,.025,.24,.024,trim,x,-.006,-.107,.006);
 rounded(bag,.055,.043,.018,trim,0,.055,-.127,.005);
 const envelope=rounded(bag,.22,.14,.018,paper,0,.21,.0,.008);envelope.rotation.z=-.13;
 const seal=ball(bag,.022,red,0,.20,-.014);seal.scale.z=.25;
 // One two-region decal atlas gives crisp lettering, trim and stitched bag seams.
 if(typeof document!=='undefined'){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;const ctx=canvas.getContext('2d');
  if(ctx?.strokeRect){
   ctx.fillStyle='#9b4431';ctx.fillRect(30,0,30,512);ctx.fillRect(452,0,30,512);
   ctx.fillStyle='#625039';ctx.fillRect(104,65,120,90);ctx.fillStyle='#f1dfb9';ctx.font='bold 54px Georgia';ctx.fillText('AW',117,129);
   ctx.strokeStyle='#c4ae86';ctx.lineWidth=5;ctx.strokeRect(111,72,106,76);
   ctx.fillStyle='#8d3b29';ctx.fillRect(370,449,64,15);
   ctx.strokeStyle='#d1ab7a';ctx.lineWidth=4;ctx.setLineDash([9,7]);ctx.strokeRect(548,35,438,435);
   const atlas=new THREE.CanvasTexture(canvas);atlas.colorSpace=THREE.SRGBColorSpace;atlas.name='kuri-decals';
   const decal=material('kuri-decal',0xffffff,.85,0,{map:atlas,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
   const patch=(parent,w,h,x,y,z,right=false)=>{const g=new THREE.PlaneGeometry(w,h);const uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setX(i,uv.getX(i)*.5+(right?.5:0));return form(parent,g,decal,x,y,z);};
   patch(hips,.31,.32,0,.235,.166);
   const stitching=patch(bag,.31,.30,0,0,-.145,true);stitching.rotation.y=Math.PI;
  }
 }
 for(const side of [-1,1]){
  const tag=side<0?'L':'R',arm=pivot(`Arm${tag}`,hips,side*.258,.36,0);
  axle(arm,.076,.10,0,0,0);
  rounded(arm,.115,.155,.13,enamel,0,-.115,0,.028);
  const elbow=pivot(`Elbow${tag}`,arm,0,-.24,0);axle(elbow,.052,.13,0,0,0);
  rounded(elbow,.109,.155,.125,enamel,0,-.115,0,.025);
  const hand=pivot(`Hand${tag}`,elbow,0,-.24,.01);
  ball(hand,.052,joint,0,0,0);
  for(const x of [-.029,.029])rounded(hand,.028,.064,.067,joint,x,-.026,.02,.012);
  const leg=pivot(`Leg${tag}`,hips,side*.112,-.06,0);axle(leg,.070,.09,0,0,0);
  rounded(leg,.14,.16,.16,enamel,0,-.135,0,.028);
  const knee=pivot(`Knee${tag}`,leg,0,-.27,0);axle(knee,.060,.15,0,0,0);
  rounded(knee,.13,.13,.145,enamel,0,-.10,0,.023);
  rounded(knee,.23,.14,.33,red,0,-.20,.07,.042);
  rounded(knee,.235,.045,.34,sole,0,-.255,.07,.012);
 }
 const times=Array.from({length:17},(_,i)=>i/16);
 const track=(name,values)=>new THREE.NumberKeyframeTrack(name,times,values);
 const constant=(value)=>times.map(()=>value);
 function clip(name,walking=false,sitting=false,standing=false){
  const tracks=[];
  for(const side of ['L','R']){
   const phase=side==='L'?0:Math.PI;
   const sin=times.map(t=>Math.sin(t*Math.PI*2+phase));
   const ease=times.map(t=>t*t*(3-2*t));
   const pose=ease.map(t=>standing?1-t:t);
   tracks.push(track(`Leg${side}.rotation[x]`,walking?sin.map(v=>v*.40):sitting||standing?pose.map(v=>-v*1.4):constant(0)));
   tracks.push(track(`Knee${side}.rotation[x]`,walking?sin.map(v=>Math.max(0,-v)**2*.48):sitting||standing?pose.map(v=>v*1.5):constant(.02)));
   tracks.push(track(`Arm${side}.rotation[x]`,walking?sin.map(v=>-v*.26):sitting||standing?pose.map(v=>-v*.42):times.map(t=>Math.sin(t*Math.PI*2+phase)*.025)));
   tracks.push(track(`Elbow${side}.rotation[x]`,constant(-.1)));
  }
  tracks.push(track('Hips.position[y]',walking?times.map(t=>.60+(1-Math.cos(t*Math.PI*4))*.009):sitting||standing?times.map(t=>.60-(standing?1-(t*t*(3-2*t)):t*t*(3-2*t))*.3):times.map(t=>.60+Math.sin(t*Math.PI*2)*.004)));
  tracks.push(track('Head.rotation[z]',times.map(t=>Math.sin(t*Math.PI*2)*(walking?.018:.025))));
  tracks.push(track('Mailbag.rotation[x]',times.map(t=>Math.sin(t*Math.PI*2)*(walking?.04:.006))));
  tracks.push(track('Antenna.rotation[z]',times.map(t=>Math.sin(t*Math.PI*4)*(walking?.065:.025))));
  const result=new THREE.AnimationClip(name,1,tracks);
  if(!walking&&!sitting&&!standing){
   result.tracks.forEach(t=>{for(let i=0;i<t.times.length;i++)t.times[i]*=3.8;});result.duration=3.8;
   for(const eye of ['EyeL','EyeR'])result.tracks.push(new THREE.NumberKeyframeTrack(`${eye}.scale[y]`,[0,2.65,2.72,2.83,2.9,3.8],[1,1,.08,.08,1,1]));
  }else for(const eye of ['EyeL','EyeR'])result.tracks.push(track(`${eye}.scale[y]`,constant(1)));
  return result;
 }
 const wave=clip('Wave'),pose=clip('Pose');
 for(const c of [wave,pose]){c.duration=2.4;c.tracks.forEach(t=>{const end=t.times[t.times.length-1];for(let i=0;i<t.times.length;i++)t.times[i]*=2.4/end;});}
 const motion=(c,name,values)=>{c.tracks=c.tracks.filter(t=>t.name!==name);c.tracks.push(new THREE.NumberKeyframeTrack(name,[0,.35,.7,1.05,1.4,1.85,2.4],values));};
 motion(wave,'ArmR.rotation[x]',[0,-1.2,-1.6,-1.6,-1.6,-1.2,0]);
 motion(wave,'ElbowR.rotation[x]',[-.1,-1,-1.5,-.85,-1.5,-1,-.1]);
 motion(wave,'Head.rotation[z]',[0,-.08,-.08,-.04,-.08,-.04,0]);
 motion(pose,'ArmL.rotation[x]',[0,-.4,-.7,-.7,-.7,-.4,0]);
 motion(pose,'ArmR.rotation[x]',[0,-.4,-.7,-.7,-.7,-.4,0]);
 motion(pose,'ElbowL.rotation[x]',[-.1,-.9,-1.3,-1.3,-1.3,-.9,-.1]);
 motion(pose,'ElbowR.rotation[x]',[-.1,-.9,-1.3,-1.3,-1.3,-.9,-.1]);
 motion(pose,'Head.rotation[z]',[0,.06,.10,.10,.10,.06,0]);
 return {scene,animations:[clip('Idle'),clip('Walking',true),clip('Sitting',false,true),clip('Standing',false,false,true),wave,pose]};
}
