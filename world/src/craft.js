import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Bespoke meshes for the paper diorama. All decorations are static and batched
// per material, so the extra detail does not become hundreds of draw calls.
export function craftKit({group,mat,mesh,box,cylinder,paper,wood,red,dark,white,paperTexture,detail={},kind='paper',ownedGeometries,swayMaterial=material=>material}){
 const studio=kind==='night',islands=kind==='islands';
 const cloth={map:detail.linenColor||paperTexture,bumpMap:detail.linenBump,roughnessMap:detail.linenRoughness,bumpScale:.016};
 const glaze={map:detail.paperColor||null,bumpMap:detail.ceramicBump,roughnessMap:detail.ceramicRoughness,bumpScale:.008,roughness:.72};
 const ink=mat(0x676659,{map:detail.paperColor||null}),linen=mat(studio?0x586765:0xd1bc92,cloth),leaf=swayMaterial(mat(0x79875a,{map:detail.stoneColor,side:THREE.DoubleSide})),leafLight=swayMaterial(mat(0xa5aa75,{map:detail.stoneColor,side:THREE.DoubleSide})),clay=mat(islands?0xbd7955:0xb68b66,glaze),brass=mat(0x92754a,{map:detail.paperColor||null,metalness:.55,roughness:.68,bumpMap:detail.metalBump,roughnessMap:detail.metalRoughness,bumpScale:.003});
 const ceramic=mat(studio?0x9daead:0xe8dfc9,glaze),metal=mat(studio?0x829294:0x66645b,{map:detail.paperColor||null,metalness:.72,roughness:.7,bumpMap:detail.metalBump,roughnessMap:detail.metalRoughness,bumpScale:.003});
 const stone=mat(0xa7a68c,{map:detail.stoneColor,bumpMap:detail.stoneBump,roughnessMap:detail.stoneRoughness,bumpScale:.035});
 const plantClay=mat(islands?0xb76f4b:studio?0x9daead:0xe0cfaa,glaze),soil=mat(dark.color),rope=mat(0xbca37b,cloth);
 plantClay.userData.cameraPassThrough=soil.userData.cameraPassThrough=true;
 const node=(x,y,z)=>{const g=new THREE.Group();g.position.set(x,y,z);group.add(g);return g;};
 const beam=(parent,a,b,r,material=wood)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),m=mesh(new THREE.CylinderGeometry(r,r,start.distanceTo(end),8),material,0,0,0,parent);m.position.copy(start).add(end).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.sub(start).normalize());return m;};
 function batch(parent){
  parent.updateWorldMatrix(true,true);const inverse=parent.matrixWorld.clone().invert(),buckets=new Map(),old=[];
  parent.traverse(o=>{if(!o.isMesh)return;const geometry=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(inverse.clone().multiply(o.matrixWorld));const list=buckets.get(o.material)||[];list.push(geometry);buckets.set(o.material,list);old.push(o);});
  // Copies now own the transformed vertices. Release their owned sources;
  // retaining them here otherwise doubles CPU geometry storage for the world.
  old.forEach(o=>{o.removeFromParent();if(ownedGeometries.delete(o.geometry))o.geometry.dispose();});
  for(const [material,geometries] of buckets){const merged=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());mesh(merged,material,0,0,0,parent);}
  return parent;
 }
 function pages(parent,x,y,z,count=5,scale=1,rotation=0){
  const pile=new THREE.Group();pile.position.set(x,y,z);pile.rotation.y=rotation;parent.add(pile);
  for(let i=0;i<count;i++)box((i%3-1)*.009,.012+i*.018,0,.5*scale,.012,.69*scale,white,pile);
  for(let i=0;i<5;i++)box(-.015,count*.018+.002,-.2*scale+i*.079*scale,(i===0?.32:.37)*scale,.004,.007,ink,pile);
 }
 function cup(parent,x,y,z){
  const vessel=mesh(new THREE.CylinderGeometry(.09,.07,.15,12,1,true),ceramic,x,y+.08,z,parent);
  mesh(new THREE.CylinderGeometry(.073,.073,.006,12),dark,x,y+.135,z,parent);
  const handle=mesh(new THREE.TorusGeometry(.055,.013,6,12),ceramic,x+.091,y+.085,z,parent);handle.rotation.y=Math.PI/2;
 }
 function books(parent,x,y,z,n=3){
  for(let i=0;i<n;i++){const color=i%3===0?red:i%3===1?linen:wood;box(x+(i%2)*.012,y+i*.065,z,.44,.06,.31,color,parent);box(x-.007,y+i*.065,z+.008,.40,.034,.30,white,parent);}
 }
 function planter(x,y,z,height=.9,parent=group,variant=0){
  const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);const scale=height/.9;g.scale.setScalar(scale);
  const form=(variant+(studio?1:islands?2:0))%3;
  if(form===1)box(0,.15,0,.34,.3,.34,plantClay,g);
  else mesh(new THREE.CylinderGeometry(form===2?.22:.19,form===2?.19:.13,.3,form===2?8:16),plantClay,0,.15,0,g);
  mesh(new THREE.CylinderGeometry(.158,.158,.015,12),soil,0,.3,0,g);
  if(form===2){
   // Aloe rosettes make the exposed islands feel different from indoor ficus.
   for(let i=0;i<9;i++){
    const a=i*2.4,shape=new THREE.Shape();shape.moveTo(0,0);shape.quadraticCurveTo(.11,.16,0,.47);shape.quadraticCurveTo(-.045,.18,0,0);
    const blade=mesh(new THREE.ShapeGeometry(shape,4),i%2?leaf:leafLight,0,.31,0,g);blade.rotation.set(.55+(i%3)*.25,a,.1);
   }
  }else for(let i=0;i<(form===1?10:7);i++){
   const a=i*2.4,tip=[Math.sin(a)*(.18+(i%2)*.08),.50+(i%3)*.14,Math.cos(a)*.23];beam(g,[0,.3,0],tip,.01,leaf);
   const shape=new THREE.Shape();shape.moveTo(0,0);
   if(form===1){shape.quadraticCurveTo(.06,.10,0,.42);shape.quadraticCurveTo(-.04,.14,0,0);}
   else{shape.quadraticCurveTo(.14,.12,0,.36);shape.quadraticCurveTo(-.13,.13,0,0);}
   const blade=mesh(new THREE.ShapeGeometry(shape,5),i%2?leaf:leafLight,...tip,g);blade.rotation.set(-.5+Math.cos(a)*.65,a,Math.sin(a)*.6);
  }
  return g;
 }
 function stool(parent,x,z){
  // Tucked beneath existing furniture footprints; never occupies a walk lane.
  const seatY=.57;
  cylinder(x,seatY,z,.25,.085,studio?linen:islands?rope:wood,parent);
  for(let i=0;i<3;i++){const a=i*Math.PI*2/3;beam(parent,[x+Math.cos(a)*.20,.05,z+Math.sin(a)*.20],[x+Math.cos(a)*.14,seatY-.03,z+Math.sin(a)*.14],.027,studio?metal:wood);}
  if(islands){for(let i=0;i<4;i++){const ring=mesh(new THREE.TorusGeometry(.07+i*.045,.011,4,20),rope,x,seatY+.045,z,parent);ring.rotation.x=Math.PI/2;}}
 }
 function monitor(parent,x,y,z){
  box(x,y+.05,z,.32,.045,.23,metal,parent);beam(parent,[x,y+.05,z],[x,y+.39,z],.025,metal);
  box(x,y+.53,z,.82,.50,.055,dark,parent);box(x,y+.53,z+.032,.75,.425,.006,linen,parent);
  for(let i=0;i<4;i++)box(x-.05,y+.66-i*.082,z+.038,.40-(i%3)*.065,.018,.004,i===0?ceramic:paper,parent);
  box(x,y+.11,z+.31,.66,.035,.23,metal,parent);
  for(let row=0;row<3;row++)for(let col=0;col<9;col++)box(x-.26+col*.064,y+.131,z+.24+row*.065,.041,.008,.038,dark,parent);
 }
 function bench(x,z){
  const g=node(x,0,z);g.name=`craft-bench-${kind}`;
  if(studio){
   box(0,1.13,0,2.99,.10,1.30,wood,g);box(0,1.074,0,3.01,.025,1.31,metal,g);
   for(const dx of [-1.26,1.26]){box(dx,.53,0,.07,1.04,.92,metal,g);box(dx,.05,0,.55,.06,1.05,metal,g);}
   box(-.91,.81,-.06,.61,.43,.91,wood,g);for(const y of [.72,.9])box(-.91,y,.407,.29,.025,.023,metal,g);
  }else{
   for(let i=0;i<(islands?3:4);i++)box(islands?-1+i:-1.12+i*.75,1.13,0,islands?.985:.745,.12,1.30,wood,g);
   if(islands)for(const dx of [-1.16,1.16]){beam(g,[dx-.19,.05,-.46],[dx+.08,1.07,.38],.07);beam(g,[dx+.19,.05,.46],[dx-.08,1.07,-.38],.07);}
   else for(const dx of [-1.26,1.26])for(const dz of [-.45,.45])box(dx,.54,dz,.105,1.08,.105,wood,g);
   for(const dx of [-1.26,1.26])beam(g,[dx,.27,-.45],[dx,.27,.45],.035);
   box(0,.9,.48,2.6,.22,.08,wood,g);
   for(const dx of [-.87,.87]){box(dx,.93,.535,.60,.15,.03,islands?wood:linen,g);box(dx,.94,.57,.14,.023,.035,brass,g);}
  }
  stool(g,studio?.1:-.75,.22);
  // A pinboard with schematic device studies, deliberately not real app screens.
  box(0,1.78,-.59,2.65,1.15,.065,wood,g);box(0,1.78,-.546,2.53,1.03,.022,paper,g);
  for(const dx of [-.72,0,.72]){
   box(dx,1.8,-.525,.44,.75,.025,dark,g);box(dx,1.8,-.505,.395,.69,.025,white,g);
   box(dx,2.08,-.485,.12,.02,.004,ink,g);
   for(let j=0;j<4;j++)box(dx,1.91-j*.11,-.485,j===0?.26:.29,.043,.005,j===0?linen:paper,g);
   box(dx,1.53,-.484,.19,.037,.006,red,g);
  }
  if(studio){monitor(g,-.48,1.2,-.23);books(g,1.14,1.22,.23,2);cup(g,-1.12,1.19,.29);}
  else if(islands){pages(g,-.55,1.2,.11,1,1.15,.18);cylinder(-1.12,1.22,.23,.18,.045,stone,g);cup(g,1.11,1.19,.30);}
  else{box(-.46,1.199,.1,.86,.015,.65,linen,g);pages(g,-.4,1.22,.09,3,.75,-.1);books(g,1.12,1.22,.2,4);cup(g,-1.1,1.19,.28);}
  cylinder(-1.17,1.33,-.3,.085,.22,clay,g);for(let i=0;i<5;i++)beam(g,[-1.17+(i%2)*.04,1.38,-.3],[-1.20+i*.018,1.65+(i%3)*.035,-.3],.009,i%2?red:dark);
  return batch(g);
 }
 function meeting(x,z){
  const g=node(x,0,z);g.name=`craft-meeting-${kind}`;
  if(studio){
   const top=cylinder(0,1.045,0,1,.1,wood,g);top.scale.z=.72;
   cylinder(0,.52,0,.095,1,metal,g);const foot=cylinder(0,.065,0,.60,.085,metal,g);foot.scale.z=.72;
   box(0,1.104,0,1.32,.018,.61,linen,g);pages(g,-.47,1.13,.12,2,.67,.22);cup(g,.6,1.105,.19);
  }else if(islands){
   for(let i=0;i<3;i++)box(-.67+i*.67,1.045,0,.65,.1,1.45,wood,g);
   for(const dx of [-.67,.67])box(dx,.50,0,.27,.96,.87,stone,g);
   box(0,1.105,0,.43,.015,1.35,linen,g);pages(g,-.49,1.12,.2,2,.65,-.2);cylinder(.59,1.14,-.3,.2,.07,clay,g);cup(g,.55,1.105,.35);
  }else{
   for(let i=0;i<4;i++)box(-.75+i*.5,1.045,0,.49,.1,1.45,wood,g);
   for(const dx of [-.8,.8])for(const dz of [-.5,.5])box(dx,.51,dz,.10,1.02,.10,wood,g);
   pages(g,-.55,1.105,.22,3,.7,-.16);pages(g,.57,1.105,-.2,2,.7,.3);cup(g,-.66,1.105,-.38);books(g,.65,1.14,.4,2);
  }
  return batch(g);
 }
 function bookshelf(x,z){
  const g=node(x,0,z);g.rotation.y=Math.PI/2;g.name=`craft-shelf-${kind}`;
  for(const dx of [-.55,.55])box(dx,1.15,0,studio?.045:.10,2.3,.47,studio?metal:wood,g);
  if(!studio)box(0,1.16,-.215,1.14,2.28,.06,islands?wood:linen,g);
  else{beam(g,[-.53,.15,-.21],[.53,2.3,-.21],.017,metal);beam(g,[.53,.15,-.21],[-.53,2.3,-.21],.017,metal);}
  for(const y of [.15,.68,1.22,1.78,2.3])box(0,y,0,1.2,.065,.5,wood,g);
  for(let row=0;row<4;row++){
   const n=row===1||(row===0&&(studio||islands))?3:row===3?4:5;
   for(let i=0;i<n;i++){
    const book=box(-.44+i*.145,.37+row*.54,0,.105,.29+((i+row)%3)*.045,.30,[red,paper,linen,wood][(i+row+(studio?1:0))%4],g);book.rotation.z=i===n-1?-.13:0;
    box(-.44+i*.145,.43+row*.54,.159,.065,.023,.006,white,g);
   }
   if(row===1)books(g,.31,.745,.015,studio?2:3);
   if(row===3){if(islands)cylinder(.36,1.95,0,.13,.25,clay,g);else cup(g,.36,1.82,.035);}
  }
  if(studio){box(.24,.34,.025,.37,.28,.32,linen,g);box(.24,.35,.19,.16,.04,.008,metal,g);}
  else if(islands){for(const y of [.23,.31,.39]){const loop=mesh(new THREE.TorusGeometry(.15,.026,5,16),rope,.35,y,0,g);loop.rotation.x=Math.PI/2;}}
  planter(.2,2.34,0,.6,g,studio?1:2);
  return batch(g);
 }
 function doorway(x,z){
  const g=node(x,0,z);g.name='crafted-doorway';
  // Separate masonry courses and wedge stones retain their silhouette up close.
  for(const side of [-1,1])for(let row=0;row<5;row++)
   box(side*.607,.145+row*.287,0,.305,.28,.32,paper,g);
  const center=1.435,inner=.452,outer=.765;
  for(let i=0;i<9;i++){
   const a=i*Math.PI/9+.009,b=(i+1)*Math.PI/9-.009,shape=new THREE.Shape();
   shape.moveTo(Math.cos(a)*inner,center+Math.sin(a)*inner);
   shape.absarc(0,center,inner,a,b,false);
   shape.lineTo(Math.cos(b)*outer,center+Math.sin(b)*outer);
   shape.absarc(0,center,outer,b,a,true);shape.closePath();
   mesh(new THREE.ExtrudeGeometry(shape,{depth:.32,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1,curveSegments:4}),paper,0,0,-.16,g);
  }
  for(let i=0;i<3;i++)box(0,-.12-i*.13,.48+i*.25,1.6+i*.2,.2,.40,paper,g);
  box(0,.01,-.34,1.07,.018,.42,red,g);
  batch(g);
  const leaf=new THREE.Group();leaf.name='door-leaf';leaf.position.set(-.43,0,0);g.add(leaf);
  // Each plank follows the same arch; the leaf stays outside the static batch.
  const top=x=>1.435+Math.sqrt(Math.max(0,.43*.43-(x-.43)**2));
  for(let i=0;i<5;i++){
   const left=i*.172+.004,right=(i+1)*.172-.004,shape=new THREE.Shape();
   shape.moveTo(left,.035);shape.lineTo(right,.035);shape.lineTo(right,top(right));
   for(let j=1;j<=4;j++){const x=right+(left-right)*j/4;shape.lineTo(x,top(x));}
   shape.closePath();mesh(new THREE.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:true,bevelSize:.006,bevelThickness:.006,bevelSegments:1,steps:1,curveSegments:4}),red,0,0,-.0275,leaf);
  }
  for(const y of [.38,1.18]){box(.11,y,-.044,.21,.047,.025,brass,leaf);box(.11,y,.044,.21,.047,.025,brass,leaf);}
  for(const side of [-1,1]){box(.70,.86,side*.047,.065,.17,.035,brass,leaf);mesh(new THREE.SphereGeometry(.038,10,8),brass,.70,.88,side*.082,leaf);}
  batch(leaf);let openness=0,goal=0;
  const opening=new THREE.Shape();opening.moveTo(-.43,0);opening.lineTo(.43,0);opening.lineTo(.43,1.435);opening.absarc(0,1.435,.43,0,Math.PI,false);opening.closePath();
  const lightMaterial=mat(0xffdca2,{emissive:0xffc27a,emissiveIntensity:2,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});lightMaterial.userData.cameraPassThrough=true;
  const glow=mesh(new THREE.ShapeGeometry(opening,16),lightMaterial,0,0,.055,g);glow.castShadow=glow.receiveShadow=false;
  const spill=new THREE.PointLight(0xffc883,0,4,2);spill.position.set(0,.7,-.6);g.add(spill);
  g.doorway={leaf,handlePosition(){g.updateWorldMatrix(true,true);return leaf.localToWorld(new THREE.Vector3(.70,.88,-.082));},setOpen(open){goal=open?1:0;},update(dt,calm){openness=calm?goal:goal+(openness-goal)*Math.exp(-Math.max(0,dt)*4.8);leaf.rotation.y=-.08-openness*1.35;lightMaterial.opacity=openness*.85;spill.intensity=openness*3;},
   view(){return {position:new THREE.Vector3(x+1.55,1.8,z-2.65),target:new THREE.Vector3(x,1.05,z),span:2.7};}};
  g.doorway.update(0,true);return g;
 }
 function roomDetails(centers,night,islands){
  const g=node(0,0,0);g.name=`craft-plants-${kind}`;
  for(const [zone,x] of centers.entries()){
   // Paper sheets pinned to wall, folded corners and ruled notes.
   for(let i=0;i<2;i++){
    const dx=x+(i?1.85:-1.85);
    if(studio&&zone===0){box(dx,1.61,-3.5,.49,.69,.035,metal,g);box(dx,1.61,-3.476,.41,.59,.014,linen,g);continue;}
    if(islands&&i===1){for(let slat=0;slat<3;slat++)box(dx,1.4+slat*.2,-3.5,.56,.15,.035,wood,g);continue;}
    box(dx,1.61+(zone===1?.12:0),-3.5,i===zone?.58:.49,.69,.035,white,g);
    for(let j=0;j<5;j++)box(dx,1.80+(zone===1?.12:0)-j*.082,-3.477,.33-(j%2)*.06,.009,.008,ink,g);
    mesh(new THREE.SphereGeometry(.021,6,4),red,dx,1.92+(zone===1?.12:0),-3.47,g);
   }
   planter(x-2.04,0,-2.8,1.2+zone*.09,g,zone);planter(x+2.13,0,-2.9,.85+zone*.09,g,zone+1);
  }
  if(!islands){
   // Layered low walls enclose the diorama without blocking the central path.
   for(const side of [-1,1]){
    const x=side*4.5;box(x,.30,4.35,7.3,.60,.23,paper,g);
    for(let i=0;i<6;i++)box(side*(1.6+i*1.05),.66,4.35,.13,.20,.28,paper,g);
    for(let i=0;i<5;i++)planter(side*(2.1+i*1.1),.60,4.32,.35+(i%2)*.12,g,i);
   }
   // Irregular seams and layered plinth edges, made from actual geometry.
   for(let y of [-.65,-.42,-.19])box(0,y,4.79,17.2,.018,.025,linen,g);
  }
  return batch(g);
 }
 function scannerDetail(x,z){
  const g=node(x,0,z);
  for(let i=0;i<5;i++){const roller=cylinder(-1.03+i*.52,1.39,.72,.09,.05,brass,g);roller.rotation.x=Math.PI/2;}
  for(let i=0;i<3;i++){box(-.72+i*.72,.87,.742,.42,.29,.018,linen,g);box(-.72+i*.72,.87,.76,.28,.045,.009,ink,g);}
  pages(g,-.6,2.38,-.16,6,.72,-.08);
  const sheet=box(.14,2.04,.26,.65,.018,.95,white,g);sheet.rotation.x=-.57;
  for(let i=0;i<6;i++)box(.14,2.11-i*.045,.0+i*.071,.46,.007,.025,ink,g);
  return batch(g);
 }
 return {bench,meeting,bookshelf,doorway,roomDetails,scannerDetail,batch,planter,pages,cup,books};
}
