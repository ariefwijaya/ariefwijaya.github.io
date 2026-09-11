import {worldBounds,DIVIDERS} from './layout.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const loader=new GLTFLoader();
const files=['desk','laptop','computerScreen','computerKeyboard','chairDesk','chair','tableRound','bookcaseOpen','books','pottedPlant','plantSmall1','lampRoundFloor','lampRoundTable','loungeChair','cardboardBoxClosed','doorwayOpen','tree_oak','tree_small','rock_largeA','grass_large','flower_redA','canoe'];
export async function loadModels(progress) {
 const models={};let done=0;
 await Promise.all(files.map(async name=>{models[name]=(await loader.loadAsync(`/world/models/${name}.glb`)).scene;progress(++done/(files.length+1));}));
 const explorer=await loader.loadAsync('/world/models/explorer.glb');progress(1);
 return {models,explorer};
}
const palettes={paper:{paper:0xe8dfc9,wall:0xede5d3,wood:0xb58a5b,red:0xa94431,green:0x7e8962,dark:0x4b4b43,background:0xe7e0d1},night:{paper:0xcfb991,wall:0x233f44,wood:0x705040,red:0xb5563e,green:0x58765e,dark:0x2a3439,background:0x142d33},islands:{paper:0xe2d3b4,wall:0xeadcbf,wood:0xab7b52,red:0xae4a32,green:0x78885a,dark:0x55564b,background:0x9dbbb3}};
export function buildWorld(kind, models, paperTexture) {
 const group=new THREE.Group(),p=palettes[kind],night=kind==='night',islands=kind==='islands';
 const obstacles=[],targets=[],props=[],animated=[],ownedMaterials=new Set(),ownedGeometries=new Set(),ownedTextures=new Set();
 const mat=(color,options={})=>{const m=new THREE.MeshStandardMaterial({color,roughness:.9,...options});ownedMaterials.add(m);return m;};
 const paper=mat(p.paper,{map:paperTexture}),wall=mat(p.wall,{map:night?null:paperTexture}),wood=mat(p.wood),red=mat(p.red),dark=mat(p.dark),white=mat(0xf4eedc);
 const mesh=(geometry,material,x,y,z,parent=group)=>{ownedGeometries.add(geometry);const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
 const box=(x,y,z,w,h,d,material=paper,parent=group)=>mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(.07,w/5,h/5,d/5)),material,x,y,z,parent);
 const cylinder=(x,y,z,r,h,material=wood,parent=group)=>mesh(new THREE.CylinderGeometry(r,r,h,20),material,x,y,z,parent);
 const block=(x,z,w,d)=>obstacles.push([x-w/2,z-d/2,x+w/2,z+d/2]);
 function model(name,x,y,z,height,rotation=0,parent=group){
  const obj=models[name].clone(true),bound=new THREE.Box3().setFromObject(obj),size=bound.getSize(new THREE.Vector3()),center=bound.getCenter(new THREE.Vector3());
  const normal=new THREE.Group();normal.add(obj);obj.position.sub(new THREE.Vector3(center.x,bound.min.y,center.z));normal.scale.setScalar(height/size.y);normal.position.set(x,y,z);normal.rotation.y=rotation;
  obj.traverse(c=>{if(!c.isMesh)return;c.castShadow=true;c.receiveShadow=true;const original=c.material;const m=original.clone();ownedMaterials.add(m);m.roughness=.92;m.metalness=0;
   const name=m.name.toLowerCase();
   if(/wood|bark/.test(name))m.color.set(p.wood);else if(/leaf|green|plant/.test(name))m.color.set(p.green);else if(/carpet|red|orange/.test(name))m.color.set(p.red);else if(/metal|black/.test(name))m.color.set(p.dark);else if(/white|plastic|wall/.test(name))m.color.set(p.paper);
   c.material=m;
  });parent.add(normal);return normal;
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
  for(const x of centers){
   const cliff=mesh(new THREE.CylinderGeometry(4.55,3.6,2.1,7),mat(0x9a9980),x,-1.14,0);cliff.scale.set(.79,1,1.06);
   box(x,-.18,.1,6.55,.36,8,paper);
   for(let i=0;i<7;i++){const a=i/7*Math.PI*2;model('rock_largeA',x+Math.cos(a)*3.1,-.75,Math.sin(a)*3.65,.7,a);}
  }
  for(const x of [-3.9,3.9]){box(x,-.08,1,2.2,.18,1.5,wood);for(let z of [.3,1.7])for(let dx of [-.8,.8]){cylinder(x+dx,.35,z,.045,.8,wood);}for(const z of [.3,1.7])box(x,.72,z,2.2,.05,.045,wood);for(let i=0;i<10;i++)box(x-.99+i*.22,.03,1,.015,.012,1.5,dark);}
  const water=mesh(new THREE.PlaneGeometry(200,200),mat(0x8faea7,{roughness:.45,metalness:.18}),0,-1.6,0);water.rotation.x=-Math.PI/2;water.receiveShadow=true;
  for(let i=0;i<12;i++){const ripple=mesh(new THREE.RingGeometry(.6+i*.65,.607+i*.65,64),mat(0xb6cbc3,{transparent:true,opacity:.15,side:THREE.DoubleSide}),-1,-1.58,4);ripple.rotation.x=-Math.PI/2;animated.push({type:'ripple',object:ripple,phase:i*.4});}
  model('canoe',-5,-1.48,4.8,.35,.5);
 }else{
  box(0,-.38,.2,17.3,.75,9.2,paper);box(0,-.04,.2,17,.08,9,night?wood:paper);
  for(let x=-8;x<8;x+=1){box(x,.01,.2,.012,.012,9,night?dark:mat(0xd4c8af));}
  box(0,1.3,-4.3,17,.3+2.5,.22,wall);box(-8.55,1.05,-1.8,.22,2.1,5,wall);
  // Raised wall sections mark the three work areas without obstructing the path.
  for(const b of DIVIDERS){box((b[0]+b[2])/2,1,(b[1]+b[3])/2,b[2]-b[0],2,b[3]-b[1],wall);obstacles.push(b);}
  for(let x of [-5.2,0,5.2])box(x,.03,-.7,4.1,.035,3.1,night?mat(0x304b4b):mat(0xd7c5a7));
 }
 function canopy(x,title){
  if(islands){for(const dx of [-2.45,2.45])box(x+dx,1.8,-2.6,.15,3.6,.15,wood);box(x,3.65,-2.6,5.2,.16,1.4,red);box(x,1.55,-3.7,5.2,3.1,.15,wall);}
  label(title,x,2.4,-3.52,3.7,65,night?'#efe3c8':'#35352b',night?'#233f44':'#e9dfca');
 }
 centers.forEach((x,i)=>canopy(x,['01  Build\nMobile & web','02  Explore\nDocument AI','03  Lead\nEngineering'][i]));
 const [left,middle,right]=centers;
 // Workbench: sourced furniture with separately modelled screens and accessories.
 const desk=model('desk',left,0,-1.75,1.18,Math.PI);block(left,-1.75,3.3,1.8);
 model('computerScreen',left-.55,1.18,-1.95,.72);model('computerKeyboard',left-.55,1.19,-1.45,.065);model('laptop',left+.65,1.18,-1.62,.42);model('books',left-1.35,1.18,-1.6,.23);model('plantSmall1',left+1.35,1.18,-2.2,.4);
 const chair=model('chairDesk',left,0,-.05,1.08,Math.PI);block(left,-.05,.65,.65);
 target('build','Mobile & web',left,1.9,-1.55,{x:left+.9,z:.6},desk);
 // Conveyor and scanner are genuine meshes: stacked sheets physically pass through.
 const machine=new THREE.Group();machine.position.set(middle,0,-1.6);group.add(machine);
 box(0,.65,0,2.7,1.3,1.45,paper,machine);box(0,1.38,.15,2.6,.1,1.25,dark,machine);
 box(0,1.85,-.15,2.5,1,.6,wall,machine);box(0,1.73,.18,1.7,.16,.025,dark,machine);
 for(let i=0;i<9;i++){const roller=cylinder(-1.16+i*.29,1.44,.3,.065,1,dark,machine);roller.rotation.x=Math.PI/2;}
 for(let i=0;i<3;i++){const sheet=box(-.8+i*.6,1.53,.3,.49,.025,.77,white,machine);animated.push({type:'paper',object:sheet,phase:i/3});}
 const light=mesh(new THREE.SphereGeometry(.09,16,12),mat(0xba5038,{emissive:0xa63124,emissiveIntensity:.4}),.96,1.93,.19,machine);
 label('DOCUMENT LAB',middle,1.0,-.86,1.5,42);block(middle,-1.6,2.9,1.75);target('ai','Document AI',middle,2.6,-1.6,{x:middle,z:.4},machine);
 const reportBox=model('cardboardBoxClosed',middle+1.8,0,-1.55,.65);block(middle+1.8,-1.55,.6,.6);target('reports','SCM Tools',middle+1.8,.9,-1.4,{x:middle+1.6,z:.15},reportBox);
 // Team table and board.
 const table=model('tableRound',right,0,-1.3,1.05);block(right,-1.3,2.1,2.1);
 model('laptop',right,1.05,-1.3,.4);model('books',right+.55,1.05,-1.1,.2);
 for(let x of [-1.3,1.3]){model('chair',right+x,0,-1.35,1,Math.sign(x)*Math.PI/2);block(right+x,-1.35,.5,.5);}
 box(right,1.5,-3.28,3.6,1.5,.1,wood);box(right,1.5,-3.20,3.42,1.32,.025,paper);
 for(let i=0;i<6;i++){const note=box(right-1.1+(i%3)*1.05,1.82-Math.floor(i/3)*.57,-3.17,.69,.4,.025,i%2?white:mat(0xd5bb86));note.rotation.z=(i%3-1)*.08;}
 target('lead','Engineering',right,1.8,-1.3,{x:right,z:.65},table);
 // The shared bookshelf and two small optional actions.
 const shelfX=islands?right+2.5:7.35, shelfZ=islands?1.4:1.25;
 const shelf=model('bookcaseOpen',shelfX,0,shelfZ,1.8,-Math.PI/2);block(shelfX,shelfZ,.7,1.2);
 for(let y of [.45,.95,1.45])model('books',shelfX-.07,y,shelfZ,.21,Math.PI/2);
 target('source','Open source',shelfX,2,shelfZ,{x:shelfX-.9,z:shelfZ+.65},shelf);
 const sitX=islands?left-1.8:-6.4,sitZ=2.15;
 const seat=model('loungeChair',sitX,0,sitZ,.85,0);block(sitX,sitZ,.85,.75);
 target('sit','Take a seat',sitX,1.2,sitZ,{x:sitX,z:sitZ+.85},seat);
 const lampX=islands?right-2.3:6.5, lampZ=islands?2.5:2.9;
 const lamp=model('lampRoundFloor',lampX,0,lampZ,2.1);block(lampX,lampZ,.4,.4);
 const lampLight=new THREE.PointLight(0xffca83,night?9:2,7,2);lampLight.position.set(lampX,1.85,lampZ);group.add(lampLight);
 const bulb=mesh(new THREE.SphereGeometry(.12,16,12),mat(0xffe6aa,{emissive:0xffc378,emissiveIntensity:2}),lampX,1.85,lampZ);
 target('lamp','Lamp',lampX,2.6,lampZ,{x:lampX-.7,z:lampZ+.25},lamp);
 const doorX=islands?0:0,doorZ=islands?3.15:3.65;
 const door=model('doorwayOpen',doorX,0,doorZ,1.65,Math.PI);const doorLeaf=box(doorX-.25,.77,doorZ+.24,.62,1.5,.06,red);doorLeaf.rotation.y=-.85;cylinder(doorX-.3,.77,doorZ+.53,.035,.07,wood).rotation.x=Math.PI/2;target('door','Choose a world',doorX,1.9,doorZ,{x:.9,z:2.8},door);block(doorX,doorZ,.7,.3);
 // Vegetation and small workshop details, kept outside walk paths.
 for(let x of centers){
  model('pottedPlant',x-2.1,0,-2.9,1.25);block(x-2.1,-2.9,.55,.55);
  model('plantSmall1',x+2.1,0,-2.9,.75);block(x+2.1,-2.9,.5,.5);
  if(islands){model('tree_oak',x+2.5,0,3.1,2.4,.5);block(x+2.5,3.1,.8,.8);model('grass_large',x-2.6,0,3.2,.35);model('flower_redA',x-2.3,0,3.4,.3);}
 }
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
 return {group,bounds,obstacles,targets,props,animated,palette:p,start:{x:islands?-7: -3,z:2.7},lampLight,bulb,seat:{x:sitX,z:sitZ},dispose(){ownedMaterials.forEach(m=>m.dispose());ownedGeometries.forEach(g=>g.dispose());ownedTextures.forEach(t=>t.dispose());}};
}
