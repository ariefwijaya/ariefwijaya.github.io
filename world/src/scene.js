import {createPaperHome} from './paper-home.js';
import {createNightCity} from './night-city.js';
import {createStoryDisplays} from './displays.js';
import {createInteractionEffects} from './interaction-effects.js';
import {roomAtmosphere} from './room-atmosphere.js';
import {applyCartoonSurfaces} from './cartoon-surfaces.js';
import {islandAtmosphere} from './island-atmosphere.js';
import {createWorkstation} from './workstation.js';
import {resourceStats} from './profiling.js';
import {craftKit} from './craft.js';
import {createEnvironment} from './environment.js';
import {createMaterialDetails} from './materials.js';
import {createExplorer} from './explorer.js';
import {worldBounds,DIVIDERS} from './layout.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const loader=new GLTFLoader();
const files=['laptop','chairDesk','chair','books','lampRoundFloor','loungeChair','cardboardBoxClosed','tree_oak','rock_largeA','grass_large','flower_redA','canoe'];
export async function loadModels(progress) {
 const models={};let done=0;
 await Promise.all(files.map(async name=>{models[name]=(await loader.loadAsync(`/world/models/${name}.glb`)).scene;progress(++done/(files.length+1));}));
 const explorer=createExplorer();progress(1);
 return {models,explorer};
}
const palettes={paper:{paper:0xe8dfc9,wall:0xede5d3,wood:0xb58a5b,red:0xa94431,green:0x7e8962,dark:0x4b4b43,background:0xe7e0d1},night:{paper:0xcfb991,wall:0x233f44,wood:0x705040,red:0xb5563e,green:0x58765e,dark:0x2a3439,background:0x142d33},islands:{paper:0xe2d3b4,wall:0xeadcbf,wood:0xab7b52,red:0xae4a32,green:0x78885a,dark:0x55564b,background:0x9dbbb3}};
export function buildWorld(kind, models, paperTexture, islandImages, cartoonImages) {
 const group=new THREE.Group(),p=palettes[kind],night=kind==='night',islands=kind==='islands';
 const obstacles=[],targets=[],props=[],animated=[],cameraColliders=[],ownedMaterials=new Set(),ownedGeometries=new Set(),ownedTextures=new Set();
 const detail=applyCartoonSurfaces(createMaterialDetails(ownedTextures,kind),cartoonImages,ownedTextures),environment=createEnvironment({kind,group,ownedMaterials,ownedGeometries,ownedTextures});
 const atmosphere=islands?islandAtmosphere({group,images:islandImages,stoneMap:detail.stoneColor,ownedTextures,ownedMaterials,ownedGeometries}):roomAtmosphere({kind,group,image:cartoonImages?.['cartoon-night'],ownedTextures,ownedMaterials,ownedGeometries});
 paperTexture=detail.paperColor||paperTexture;
 const solid=object=>{object.traverse(o=>{if(o.isMesh&&!o.material.userData.foliage&&!o.material.userData.cameraPassThrough){cameraColliders.push(o);}});return object;};
 const mat=(color,options={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.9,...options});ownedMaterials.add(m);return m;};
 const paper=mat(p.paper,{map:atmosphere?.stone||paperTexture,bumpMap:detail.paperBump,roughnessMap:detail.paperRoughness,bumpScale:.012}),wall=mat(p.wall,{map:paperTexture,bumpMap:detail.paperBump,roughnessMap:detail.paperRoughness,bumpScale:.012}),wood=mat(p.wood,{map:detail.woodColor,bumpMap:detail.woodBump,roughnessMap:detail.woodRoughness,bumpScale:.025,roughness:.87}),red=mat(p.red,{map:detail.woodColor,bumpMap:detail.paperBump,bumpScale:.02}),dark=mat(p.dark,{map:paperTexture}),white=mat(0xf4eedc,{map:paperTexture,bumpMap:detail.paperBump,roughnessMap:detail.paperRoughness,bumpScale:.009});
 const mesh=(geometry,material,x,y,z,parent=group)=>{ownedGeometries.add(geometry);const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
 const box=(x,y,z,w,h,d,material=paper,parent=group)=>mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(.07,w/5,h/5,d/5)),material,x,y,z,parent);
 const cylinder=(x,y,z,r,h,material=wood,parent=group)=>mesh(new THREE.CylinderGeometry(r,r,h,20),material,x,y,z,parent);
 const craft=craftKit({group,mat,mesh,box,cylinder,paper,wood,red,dark,white,paperTexture,detail,kind,ownedGeometries,swayMaterial:environment.swayMaterial});
 const block=(x,z,w,d)=>obstacles.push([x-w/2,z-d/2,x+w/2,z+d/2]);
 function model(name,x,y,z,height,rotation=0,parent=group){
  const vegetation=['tree_oak','grass_large','flower_redA'].includes(name);
  const obj=models[name].clone(true),bound=new THREE.Box3().setFromObject(obj),size=bound.getSize(new THREE.Vector3()),center=bound.getCenter(new THREE.Vector3());
  const normal=new THREE.Group();normal.add(obj);obj.position.sub(new THREE.Vector3(center.x,bound.min.y,center.z));normal.scale.setScalar(height/size.y);normal.position.set(x,y,z);normal.rotation.y=rotation;
  obj.traverse(c=>{if(!c.isMesh)return;c.castShadow=true;c.receiveShadow=true;const original=c.material;const m=original.clone();ownedMaterials.add(m);m.roughness=.92;m.metalness=0;
   const name=m.name.toLowerCase();
   if(/wood|bark/.test(name)){m.color.set(p.wood);m.map=detail.woodColor;m.bumpMap=detail.woodBump;m.bumpScale=.018;m.roughnessMap=detail.woodRoughness;}else if(/leaf|green|plant|grass/.test(name)){m.color.set(p.green);m.map=detail.stoneColor;m.bumpMap=detail.paperBump;m.bumpScale=.006;if(vegetation)environment.swayMaterial(m,.012);}else if(/carpet|red|orange/.test(name)){m.color.set(p.red);m.map=detail.linenColor;m.bumpMap=detail.linenBump;m.bumpScale=.012;m.roughnessMap=detail.linenRoughness;}else if(/metal|black/.test(name)){m.color.set(p.dark);if(night){m.metalness=.55;m.roughness=.7;m.bumpMap=detail.metalBump;m.bumpScale=.003;m.roughnessMap=detail.metalRoughness;}}else if(/white|plastic|wall/.test(name)){m.color.set(p.paper);m.map=paperTexture;}else if(/rock|stone/.test(name)||name===''){m.map=detail.stoneColor;}else if(!m.map)m.map=paperTexture;
   c.material=m;c.userData.foliage=!!m.userData.foliage;
  });parent.add(normal);if(['chairDesk','chair','loungeChair','cardboardBoxClosed','lampRoundFloor'].includes(name))solid(normal);return normal;
 }
 function label(text,x,y,z,width=2.6,size=64,color='#292c28',bg='#e9dfca',rotation=0){
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,768,256);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${size}px Georgia`;text.split('\n').forEach((line,i,a)=>ctx.fillText(line,384,128+(i-(a.length-1)/2)*size*1.2,710));
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;ownedTextures.add(tex);const material=mat(0xffffff,{map:tex,side:THREE.DoubleSide});const o=mesh(new THREE.PlaneGeometry(width,width/3),material,x,y,z);o.rotation.y=rotation;return o;
 }
 function target(id,label,x,y,z,approach,object){targets.push({id,label,position:new THREE.Vector3(x,y,z),approach});if(object)object.traverse(c=>{if(c.isMesh){c.userData.target=id;props.push(c);}});}
 const bounds=worldBounds(kind);
 const centers=islands?[-7.6,0,7.6]:[-5.2,0,5.2];
 // Physical set: layered paper plinths or stone islands with timber bridges.
 if(islands){
  const cliffMaterial=mat(0xe0c9a1,{map:atmosphere?.stone||detail.stoneColor,bumpMap:detail.stoneBump,roughnessMap:detail.stoneRoughness,bumpScale:.08});
  for(const x of centers){
   const cliff=mesh(new THREE.CylinderGeometry(4.55,3.6,2.1,7),cliffMaterial,x,-1.14,0);cliff.scale.set(.79,1,1.06);
   box(x,-.18,.1,6.55,.36,8,paper);
   for(let i=0;i<7;i++){const a=i/7*Math.PI*2;model('rock_largeA',x+Math.cos(a)*3.1,-.75,Math.sin(a)*3.65,.7,a);}
  }
  for(const x of [-3.9,3.9]){box(x,-.08,1,2.2,.18,1.5,wood);for(let z of [.3,1.7])for(let dx of [-.8,.8]){cylinder(x+dx,.35,z,.045,.8,wood);}for(const z of [.3,1.7])box(x,.72,z,2.2,.05,.045,wood);for(let i=0;i<10;i++)box(x-.99+i*.22,.03,1,.015,.012,1.5,dark);}
  environment.water(mat(0xffffff,{roughness:.32,metalness:.08}));
  environment.floatCanoe(model('canoe',-5,-1.48,4.8,.35,.5));
 }else{
  const tableMap=detail.woodColor?.clone();if(tableMap){tableMap.repeat.set(8,6);tableMap.needsUpdate=true;ownedTextures.add(tableMap);}
  const tabletop=mesh(new THREE.PlaneGeometry(34,22),mat(night?0x34464a:p.background,{map:tableMap||null,roughness:1,bumpMap:detail.paperBump,bumpScale:.004}),0,-.79,0);
  tabletop.name='tabletop';tabletop.visible=!night;tabletop.rotation.x=-Math.PI/2;tabletop.castShadow=false;
  box(0,-.38,.2,17.3,.75,9.2,paper);box(0,-.04,.2,17,.08,9,night?wood:paper);
  const tiles=new THREE.Group();group.add(tiles);const tileColors=[0xe7ddc6,0xe1d5bc,0xeee4cf,0xdcd0b9].map(c=>mat(night?p.wood:c,{map:night?detail.woodColor:paperTexture,bumpMap:night?detail.woodBump:detail.paperBump,roughnessMap:night?detail.woodRoughness:detail.paperRoughness,bumpScale:.015}));
  for(let ix=0;ix<17;ix++)for(let iz=0;iz<9;iz++)box(-8+ix,.002,-3.8+iz,.977,.025,.977,tileColors[(ix*7+iz*3)%4],tiles);
  craft.batch(tiles);
  for(let i=0;i<3;i++){solid(box(centers[i],1.65+(i===1?.25:0),-4.3,5.4,3.3+(i===1?.5:0),.28,wall));solid(box(centers[i]-.08,1.62,-4.49,5.5,3.25,.09,paper));}
  solid(box(-8.55,night?.36:1.05,-1.8,.22,night?.72:2.1,5,wall));
  // Raised wall sections mark the three work areas without obstructing the path.
  for(const b of DIVIDERS){solid(box((b[0]+b[2])/2,1,(b[1]+b[3])/2,b[2]-b[0],2,b[3]-b[1],wall));obstacles.push(b);}
  for(let x of [-5.2,0,5.2]){const rug=new THREE.Group();group.add(rug);const rugMat=mat(night?0x304b4b:0xcfbd97,{map:detail.linenColor,bumpMap:detail.linenBump,roughnessMap:detail.linenRoughness,bumpScale:.025});box(x,.03,-.7,3.7,.028,2.7,rugMat,rug);for(let i=0;i<32;i++){box(x-1.8+i*.114,.05,-2.09,.028,.01,.13,rugMat,rug);box(x-1.8+i*.114,.05,.69,.028,.01,.13,rugMat,rug);}craft.batch(rug);}
 }
 function canopy(x,title){
  if(islands){for(const dx of [-2.45,2.45])solid(box(x+dx,1.8,-2.6,.15,3.6,.15,wood));solid(box(x,3.65,-2.6,5.2,.16,1.4,red));solid(box(x,1.55,-3.7,5.2,3.1,.15,wall));}
  label(title,x,2.9,-3.52,3.7,65,night?'#efe3c8':'#35352b',night?'#233f44':'#e9dfca');
 }
 centers.forEach((x,i)=>canopy(x,['01  Build\nMobile & web','02  Explore\nDocument AI','03  Lead\nEngineering'][i]));
 const [left,middle,right]=centers;
 // Bespoke workbench with schematic device studies and a small laptop.
 const desk=solid(craft.bench(left,-1.75));block(left,-1.75,3.3,1.8);
 const workstation=createWorkstation({group,mesh,box,mat,detail,ownedTextures,ownedMaterials,batch:craft.batch,x:left});
 if(!workstation)model('laptop',left+.45,1.2,-1.5,.38);
 const chair=model('chairDesk',left,0,-.05,1.08,Math.PI);block(left,-.05,.65,.65);
 target('build','Mobile & web',left,1.9,-1.55,{x:left+.9,z:.6},desk);
 if(workstation)workstation.object.traverse(o=>{if(o.isMesh){o.userData.target='build';props.push(o);}});
 // Conveyor and scanner are genuine meshes: stacked sheets physically pass through.
 const machine=new THREE.Group();machine.position.set(middle,0,-1.6);group.add(machine);
 box(0,.65,0,2.7,1.3,1.45,paper,machine);box(0,1.38,.15,2.6,.1,1.25,dark,machine);
 box(0,1.85,-.15,2.5,1,.6,wall,machine);box(0,1.73,.18,1.7,.16,.025,dark,machine);
 for(let i=0;i<9;i++){const roller=cylinder(-1.16+i*.29,1.44,.3,.065,1,dark,machine);roller.rotation.x=Math.PI/2;}
 for(let i=0;i<3;i++){const sheet=box(-.8+i*.6,1.53,.3,.49,.025,.77,white,machine);animated.push({type:'paper',object:sheet,phase:i/3});}
 const light=mesh(new THREE.SphereGeometry(.09,16,12),mat(0xba5038,{emissive:0xa63124,emissiveIntensity:.4}),.96,1.93,.19,machine);
 label('DOCUMENT LAB',middle,1.0,-.86,1.5,42);block(middle,-1.6,2.9,1.75);target('ai','Document AI',middle,2.6,-1.6,{x:middle,z:1.3},machine);
 solid(machine);block(middle,-.15,1.25,1.85);
 // Reading surfaces remain part of the furniture, including while covers open.
 const readingStations={};
 function readingTable(id,x,z){
  const table=new THREE.Group();table.name=`reading-table-${id}`;table.position.set(x,0,z);group.add(table);
  box(0,.96,0,1.76,.10,.92,wood,table);
  for(const dx of [-.74,.74])for(const dz of [-.34,.34])box(dx,.455,dz,.095,.91,.095,wood,table);
  box(0,.63,-.34,1.53,.10,.07,wood,table);
  solid(table);block(x,z,1.76,.92);readingStations[id]={x,y:1.045,z};return table;
 }
 const reportTable=readingTable('reports',middle+1.92,.55);
 // Enclosed archive cabinet gives the report drawer a physical housing.
 for(const dx of [-.81,.81])solid(box(dx,.45,0,.12,.83,.84,wood,reportTable));
 solid(box(0,.45,-.39,1.55,.83,.08,wood,reportTable));
 solid(box(0,.18,0,1.55,.08,.84,wood,reportTable));
 // Archive drawer and its report travel together on rails underneath the worktop.
 const archiveDrawer=new THREE.Group();archiveDrawer.name='scm-archive-drawer';reportTable.add(archiveDrawer);
 box(0,.75,0,1.5,.06,.90,wood,archiveDrawer);
 box(0,.83,.46,1.56,.22,.07,wood,archiveDrawer);
 box(0,.83,.515,.32,.04,.05,dark,archiveDrawer);
 for(const dx of [-.76,.76])box(dx,.82,0,.05,.17,.90,wood,archiveDrawer);
 readingStations.reports.drawer=archiveDrawer;
 target('reports','SCM Tools',middle+1.92,.88,1.05,{x:middle+1.92,z:2.15},reportTable);
 // Team table and board.
 const table=solid(craft.meeting(right,-1.3));block(right,-1.3,2.1,2.1);
 model('laptop',right,1.05,-1.3,.4);model('books',right+.55,1.05,-1.1,.2);
 for(let x of [-1.3,1.3]){model('chair',right+x,0,-1.35,1,Math.sign(x)*Math.PI/2);block(right+x,-1.35,.5,.5);}
 solid(box(right,1.5,-3.28,3.6,1.5,.1,wood));box(right,1.5,-3.20,3.42,1.32,.025,paper);
 // The engineering notes are permanently printed on this board by story displays.
 target('lead','Engineering',right,1.8,-1.3,{x:right,z:.65},table);
 // The shared bookshelf and two small optional actions.
 const shelfX=islands?right+2.5:7.35, shelfZ=islands?1.4:1.25;
 const shelf=solid(craft.bookshelf(shelfX,shelfZ));shelf.rotation.y=-Math.PI/2;block(shelfX,shelfZ,.7,1.2);
 label('Open source',shelfX-.29,2.15,shelfZ,1.0,54,'#38392f','#eee5d1',-Math.PI/2);
 const sourceTable=readingTable('source',shelfX-1.3,shelfZ+.3);
 target('source','Open source',shelfX-1.3,1.18,shelfZ+.3,{x:shelfX-1.45,z:shelfZ+1.65},sourceTable);
 shelf.traverse(o=>{if(o.isMesh){o.userData.target='source';props.push(o);}});
 const sitX=islands?left-1.8:-6.4,sitZ=2.15;
 const seat=model('loungeChair',sitX,0,sitZ,.85,0);block(sitX,sitZ,.85,.75);
 target('sit','Take a seat',sitX,1.2,sitZ,{x:sitX,z:sitZ+.85},seat);
 const lampX=islands?right-2.3:7.55, lampZ=islands?2.5:2.9;
 const lamp=model('lampRoundFloor',lampX,0,lampZ,2.1);block(lampX,lampZ,.4,.4);
 const lampLight=new THREE.PointLight(0xffca83,night?9:2,7,2);lampLight.position.set(lampX,1.85,lampZ);group.add(lampLight);
 const bulb=mesh(new THREE.SphereGeometry(.12,16,12),mat(0xffe6aa,{emissive:0xffc378,emissiveIntensity:2}),lampX,1.85,lampZ);
 target('lamp','Lamp',lampX,2.6,lampZ,{x:lampX+(islands?.7:-.7),z:lampZ+.25},lamp);
 const doorX=islands?0:0,doorZ=islands?3.15:4.35;
 const door=solid(craft.doorway(doorX,doorZ));target('door','Choose a world',doorX,2.3,doorZ,{x:.045,z:doorZ-.415},door);block(doorX,doorZ,1.5,.3);
 // Vegetation and small workshop details, kept outside walk paths.
 for(let x of centers){
  block(x-2.1,-2.9,.55,.55);block(x+2.1,-2.9,.5,.5);
  if(islands){const treeX=x===right?x:x+2.5;model('tree_oak',treeX,0,3.1,2.4,.5);block(treeX,3.1,.8,.8);model('grass_large',x-2.6,0,3.2,.35);model('flower_redA',x-2.3,0,3.4,.3);}
 }
 solid(craft.roomDetails(centers,night,islands));craft.scannerDetail(middle,-1.6);
 if(!islands){for(const side of [-1,1])block(side*4.5,4.35,7.3,.23);}
 if(night){
  // Window panes and warm hanging fixtures give the studio its own lighting.
  for(let x of [-6.8,6.8]){box(x,2,-4.14,1.1,1.6,.08,wood);box(x,2,-4.08,.92,1.38,.05,mat(0x607e83,{emissive:0x28434b,emissiveIntensity:.6}));box(x,2,-4.01,.035,1.38,.025,wood);box(x,2,-4.01,.92,.035,.025,wood);}
 }
 for(let x of centers){
  const cone=mesh(new THREE.ConeGeometry(.37,.3,24,1,true),red,x,3.2,-1.5);cone.rotation.x=0;
  cylinder(x,3.7,-1.5,.014,.8,dark);
  const b=mesh(new THREE.SphereGeometry(.115,16,12),mat(0xffe4af,{emissive:0xffbc6b,emissiveIntensity:night?3:.7}),x,3.15,-1.5);
  if(night){const l=new THREE.PointLight(0xffc781,11,7,2);l.position.set(x,2.95,-1.5);group.add(l);}
 }
 if(night)createNightCity({group,ownedMaterials,ownedGeometries,stoneMap:detail.stoneColor});
 // Surrounding tabletop is part of the composition in overview/top cameras.
 if(!islands&&!night){
  const surroundings=new THREE.Group();surroundings.name='tabletop-props';group.add(surroundings);
  const pen=new THREE.Group();pen.position.set(-6.8,-.64,6.9);pen.rotation.y=-.4;surroundings.add(pen);
  const shaft=mesh(new THREE.CylinderGeometry(.095,.095,3.7,12),dark,0,0,0,pen);shaft.rotation.z=Math.PI/2;
  const trim=mat(0xb99b66,{metalness:.5,roughness:.45});
  for(const x of [-1.65,.9,1.7]){const band=mesh(new THREE.CylinderGeometry(.101,.101,.08,12),trim,x,0,0,pen);band.rotation.z=Math.PI/2;}
  const tip=mesh(new THREE.ConeGeometry(.095,.5,12),trim,2.1,0,0,pen);tip.rotation.z=-Math.PI/2;
  const cupGroup=new THREE.Group();cupGroup.position.set(10.1,-.75,4.7);cupGroup.scale.setScalar(7);surroundings.add(cupGroup);craft.cup(cupGroup,0,0,0);
  const stationery=new THREE.Group();stationery.position.set(-10.4,-.76,3.4);stationery.rotation.y=.15;stationery.scale.setScalar(3.3);surroundings.add(stationery);craft.pages(stationery,0,0,0,3,1);
  craft.planter(-10.2,-.75,-3.7,2.1,surroundings,1);
  craft.batch(surroundings);
 }
 if(kind==='paper')createPaperHome({group,surfaces:detail,ownedMaterials,ownedGeometries,batch:craft.batch});
 environment.populate(centers);
 const displays=createStoryDisplays({group,targets,readingStations,ownedMaterials,ownedGeometries,ownedTextures,props,cameraColliders}),effects=createInteractionEffects({group,targets,ownedMaterials,ownedGeometries,ownedTextures});
 let disposed=false;
 return {ambientTime:environment.time,displays,effects,surfaces:detail,doorway:door.doorway,workstation,resourceStats:()=>resourceStats(ownedGeometries,ownedTextures),group,cameraColliders,updateEnvironment(dt,options){environment.update(dt,options);if(atmosphere)atmosphere.update(environment.time(),options);},bounds,obstacles,targets,props,animated,palette:p,start:{x:islands?-7:-4.7,z:2.7},lampLight,bulb,seat:{x:sitX,z:sitZ},dispose(){if(disposed)return;disposed=true;group.traverse(o=>{if(o.isInstancedMesh)o.dispose();});ownedMaterials.forEach(m=>m.dispose());ownedGeometries.forEach(g=>g.dispose());ownedTextures.forEach(t=>t.dispose());}};
}
