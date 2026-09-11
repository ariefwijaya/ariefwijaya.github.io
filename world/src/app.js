import * as THREE from 'three';
import {loadModels,buildWorld} from './scene.js';
import {places,stories} from './content.js';
import {damp,turn,distance,walkable,findPath,move} from './motion.js';
const $=s=>document.querySelector(s),canvas=$('#world-canvas'),stage=$('#stage'),status=$('#world-status');
let renderer,scene,camera,world,models,character,mixer,actions={},action,actionName='',path=[],velocity={x:0,z:0},position={x:0,z:0},current='paper',ready=false,switching=false,seated=false,tourIndex=-1,near=null;
let calm=matchMedia('(prefers-reduced-motion: reduce)').matches,lampOn=true,processingUntil=0,lastTime=0,elapsed=0,toastTimer,frame=0;
const keys=new Set(),tourStops=['build','ai','lead','source'],focusPoint=new THREE.Vector3(),cameraOffset=new THREE.Vector3(11,15,21),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion(){document.body.classList.toggle('calm',calm);$('#motion').setAttribute('aria-pressed',String(calm));}
syncMotion();reduced.addEventListener('change',e=>{calm=e.matches;syncMotion();});
function toast(message,duration=4500){clearTimeout(toastTimer);status.textContent=message;if(duration)toastTimer=setTimeout(()=>{status.textContent='';},duration);}
function modalOpen(){return !!document.querySelector('dialog[open]');}
function stop(){keys.clear();velocity={x:0,z:0};path=[];}
function openDialog(id){stop();const dialog=$(id);if(!dialog.open)dialog.showModal();}
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>{const dialog=button.closest('dialog');if(dialog.id==='story-dialog')cancelTour();dialog.close();}));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.addEventListener('cancel',()=>{if(dialog.id==='story-dialog')cancelTour();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){if(dialog.id==='story-dialog')cancelTour();dialog.close();}}});
 dialog.addEventListener('close',()=>{if(ready&&!modalOpen())canvas.focus({preventScroll:true});});
});
$('#choose-world').addEventListener('click',()=>openDialog('#world-picker'));
$('#show-places').addEventListener('click',()=>openDialog('#places-dialog'));
$('#help').addEventListener('click',()=>openDialog('#help-dialog'));
$('#motion').addEventListener('click',()=>{calm=!calm;syncMotion();toast(calm?'Calm motion enabled. Decorative animation is paused.':'Full motion enabled.');});
$('#interact').addEventListener('click',()=>near&&interact(near.id));
function animate(name,once=false){
 if(!actions[name]||actionName===name)return;
 const next=actions[name];action?.fadeOut(calm?.1:.24);next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(calm?.1:.24).play();
 next.setLoop(once?THREE.LoopOnce:THREE.LoopRepeat,once?1:Infinity);next.clampWhenFinished=once;action=next;actionName=name;
}
function stand(){if(seated){seated=false;character.position.y=0;position={...world.targets.find(t=>t.id==='sit').approach};character.position.set(position.x,0,position.z);animate('Standing',true);}}
function cancelTour(){tourIndex=-1;$('#tour').textContent='Guided tour';$('#story-tour').hidden=true;}
function showStory(id){
 const story=stories[id];if(!story)return;
 const host=$('#story-content');host.replaceChildren();
 function add(tag,text,cls,parent=host){const node=document.createElement(tag);node.textContent=text;if(cls)node.className=cls;parent.append(node);return node;}
 add('p',story.eyebrow,'eyebrow');add('h2',story.title).id='story-title';add('p',story.subtitle,'story-subtitle');add('p',story.body);
 if(story.image){const figure=add('figure',''),img=document.createElement('img');img.src=story.image;img.alt='Conceptual illustration of automated reporting';img.width=1024;img.height=768;figure.append(img);add('figcaption','Conceptual illustration · not a product screenshot.',null,figure);}
 if(story.facts){const facts=add('div','','story-facts');for(const [title,body] of story.facts){const item=add('section','',null,facts);add('h3',title,null,item);add('p',body,null,item);}}
 if(story.repositories){const links=add('div','','story-links');for(const [name,desc,repo] of story.repositories){const a=add('a',`${name} ↗`,null,links);a.href=`https://github.com/ariefwijaya/${repo}`;add('span',desc,null,a);}}
 if(story.demo){const demo=add('div','','world-demo');add('p','SYNTHETIC INVOICE · SAMPLE-001 · TOTAL 120.00',null,demo);const output=add('pre','{ "invoice_id": null, "total": null }',null,demo);output.setAttribute('role','status');const run=add('button','Run the document machine →','button',demo);run.addEventListener('click',()=>{processingUntil=elapsed+4;output.textContent='{\n  "invoice_id": "SAMPLE-001",\n  "total": 120.00\n}';run.textContent='Run again ↻';tone();});}
 if(story.link){const link=add('a',`${story.linkText} ↗`,'text-link accent');link.href=story.link;}
 $('#story-tour').hidden=tourIndex<0;
 if(tourIndex>=0){$('#tour-progress').textContent=`Stop ${tourIndex+1} of ${tourStops.length}`;$('#tour-next').textContent=tourIndex===tourStops.length-1?'Finish tour ✓':'Next stop →';}
 openDialog('#story-dialog');tone();
}
function interact(id){
 if(!ready||switching)return;
 if(id==='door'){openDialog('#world-picker');return;}
 if(id==='lamp'){lampOn=!lampOn;world.lampLight.intensity=lampOn?(current==='night'?9:2):0;world.bulb.material.emissiveIntensity=lampOn?2:0;toast(lampOn?'Lamp on.':'Lamp off.');tone();return;}
 if(id==='sit'){
  cancelTour();stand();stop();
  // Approach the chair first; the seated pose uses its own fixed anchor.
  goTo(world.targets.find(t=>t.id==='sit').approach,()=>{seated=true;character.position.set(world.seat.x,.25,world.seat.z);character.rotation.y=0;animate('Sitting',true);toast('Take your time. Move when you’re ready to stand.');});return;
 }
 showStory(id);
}
let onArrival=null;
function goTo(goal,callback=null){
 stand();const valid=p=>walkable(p,world.bounds,world.obstacles);path=findPath(position,goal,valid);onArrival=callback;
 if(!path.length){toast('That spot is out of reach. Choose an open part of the floor.');onArrival=null;return false;}
 return true;
}
function tourStep(){
 if(tourIndex>=tourStops.length){cancelTour();toast('That’s the tour. Stay and explore, or head back to the portfolio.');return;}
 const id=tourStops[tourIndex],target=world.targets.find(t=>t.id===id);$('#tour').textContent='End tour';toast(`Walking to ${target.label}…`,0);
 if(!goTo(target.approach,()=>{status.textContent='';showStory(id);}))showStory(id);
}
$('#tour').addEventListener('click',()=>{if(tourIndex>=0){cancelTour();stop();toast('Tour ended. Explore at your own pace.');}else{tourIndex=0;tourStep();}});
$('#tour-next').addEventListener('click',()=>{$('#story-dialog').close();tourIndex++;tourStep();});
let audioContext,masterGain,soundOn=false;
async function toggleSound(){
 if(!soundOn){
  try{if(!audioContext){audioContext=new (window.AudioContext||window.webkitAudioContext)();masterGain=audioContext.createGain();masterGain.gain.value=0;masterGain.connect(audioContext.destination);for(const frequency of [130.81,196,261.63]){const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;gain.gain.value=.027;oscillator.connect(gain);gain.connect(masterGain);oscillator.start();}}
   await audioContext.resume();masterGain.gain.setTargetAtTime(.24,audioContext.currentTime,.6);soundOn=true;
  }catch{toast('Audio is unavailable in this browser.');return;}
 }else{masterGain.gain.setTargetAtTime(0,audioContext.currentTime,.15);soundOn=false;}
 $('#sound').textContent=soundOn?'Sound on':'Sound off';$('#sound').setAttribute('aria-pressed',String(soundOn));
}
function tone(){if(!soundOn||!audioContext)return;const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.frequency.value=523.25;gain.gain.setValueAtTime(0,audioContext.currentTime);gain.gain.linearRampToValueAtTime(.028,audioContext.currentTime+.025);gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.35);osc.connect(gain);gain.connect(masterGain);osc.start();osc.stop(audioContext.currentTime+.4);}
$('#sound').addEventListener('click',toggleSound);
function resize(){
 if(!renderer)return;const w=stage.clientWidth,h=stage.clientHeight,aspect=w/h;
 const viewWidth=w<800?12.5:(current==='islands'?28:23),viewHeight=viewWidth/aspect;
 // Portrait uses a closer view that follows the character; menus keep every story reachable.
 const height=w<800?Math.min(viewHeight,20):viewHeight;
 camera.left=-height*aspect/2;camera.right=height*aspect/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();renderer.setSize(w,h,false);renderer.setPixelRatio(Math.min(devicePixelRatio,w<800?1.35:1.75));
}
window.addEventListener('resize',resize);
function rebuildHotspots(){
 const host=$('#hotspots'),list=$('#places-list');host.replaceChildren();list.replaceChildren();
 for(const target of world.targets){
  const button=document.createElement('button');button.className='hotspot';button.dataset.id=target.id;button.setAttribute('aria-label',target.label);button.innerHTML='<span class="dot" aria-hidden="true"></span><span class="hotspot-label"></span>';button.lastChild.textContent=target.label;button.addEventListener('click',()=>{cancelTour();interact(target.id);});host.append(button);target.button=button;
  const item=document.createElement('button');const span=document.createElement('span');span.textContent=target.label;item.append(span,document.createTextNode('↗'));item.addEventListener('click',()=>{$('#places-dialog').close();cancelTour();interact(target.id);});list.append(item);
 }
}
async function changeWorld(kind,initial=false){
 if(!places[kind]||switching)return;switching=true;stop();onArrival=null;cancelTour();seated=false;
 if(!initial){stage.classList.add('switching');await new Promise(r=>setTimeout(r,calm?0:280));}
 if(world){scene.remove(world.group);world.dispose();}
 current=kind;world=buildWorld(kind,models,paperTexture);scene.add(world.group);scene.background=new THREE.Color(world.palette.background);scene.fog=new THREE.Fog(world.palette.background,42,90);
 sun.intensity=kind==='night'?1.6:3.0;sun.color.set(kind==='night'?0xc4d9e2:0xffe1b3);ambient.intensity=kind==='night'?1.8:2.3;ambient.color.set(kind==='night'?0xa1b3b7:0xf6eedb);ambient.groundColor.set(kind==='night'?0x293937:0xb5a88d);
 document.body.dataset.theme=places[kind].theme;$('#world-name').textContent=places[kind].name;$('#world-number').textContent=`${places[kind].number} / My World`;$('#world-subtitle').textContent=places[kind].subtitle;
 canvas.dataset.world=kind;position={...world.start};velocity={x:0,z:0};character.position.set(position.x,0,position.z);character.rotation.y=.3;animate('Idle');lampOn=true;rebuildHotspots();resize();
 const mobile=stage.clientWidth<800;focusPoint.set(mobile?position.x:0,0,mobile?position.z:0);camera.position.copy(focusPoint).add(cameraOffset);camera.lookAt(focusPoint);
 history.replaceState(null,'',`/world/#${kind}`);stage.classList.remove('switching');switching=false;toast(places[kind].intro,6500);
}
document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{$('#world-picker').close();changeWorld(button.dataset.world);}));
const mapping={w:'up',ArrowUp:'up',s:'down',ArrowDown:'down',a:'left',ArrowLeft:'left',d:'right',ArrowRight:'right'};
window.addEventListener('keydown',e=>{
 if(!ready||switching||modalOpen()||['INPUT','TEXTAREA','SELECT','BUTTON','A'].includes(e.target.tagName))return;
 const key=mapping[e.key]||mapping[e.key.toLowerCase()];
 if(key){e.preventDefault();stand();cancelTour();path=[];onArrival=null;keys.add(key);}else if(e.key.toLowerCase()==='e'&&near){e.preventDefault();interact(near.id);}
});
window.addEventListener('keyup',e=>keys.delete(mapping[e.key]||mapping[e.key.toLowerCase()]));
window.addEventListener('blur',()=>{keys.clear();velocity={x:0,z:0};if(audioContext)audioContext.suspend();});
window.addEventListener('focus',()=>{lastTime=0;if(soundOn)audioContext?.resume();});
document.addEventListener('visibilitychange',()=>{keys.clear();velocity={x:0,z:0};lastTime=0;if(document.hidden)audioContext?.suspend();else if(soundOn)audioContext?.resume();});
for(const button of document.querySelectorAll('[data-move]')){
 button.addEventListener('pointerdown',e=>{if(!ready||modalOpen())return;e.preventDefault();button.setPointerCapture(e.pointerId);stand();cancelTour();path=[];onArrival=null;keys.add(button.dataset.move);});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>keys.delete(button.dataset.move));
}
let pointerDown=null;
canvas.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};});
canvas.addEventListener('pointerup',e=>{
 if(!ready||switching||modalOpen()||!pointerDown||Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)>10)return;
 const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
 const intersect=raycaster.intersectObjects(world.props,false)[0];cancelTour();
 if(intersect){interact(intersect.object.userData.target);return;}
 if(raycaster.ray.intersectPlane(ground,hit))goTo({x:hit.x,z:hit.z});
});
function render(time){
 requestAnimationFrame(render);if(!ready||document.hidden)return;
 const dt=lastTime?Math.min((time-lastTime)/1000,.04):0;lastTime=time;elapsed+=dt;
 const blocked=modalOpen()||switching||location.hash==='#world-stories';let dx=0,dz=0;
 if(!blocked&&!seated){
  if(keys.size){const horizontal=Number(keys.has('right'))-Number(keys.has('left')),vertical=Number(keys.has('down'))-Number(keys.has('up'));dx=horizontal*.886+vertical*.464;dz=-horizontal*.464+vertical*.886;}
  else if(path.length){const target=path[0],dist=distance(position,target);if(dist<.13){path.shift();if(!path.length){velocity={x:0,z:0};const callback=onArrival;onArrival=null;callback?.();}}else{dx=(target.x-position.x)/dist;dz=(target.z-position.z)/dist;}}
 }
 const length=Math.hypot(dx,dz),speed=2.55;if(length>1){dx/=length;dz/=length;}
 velocity.x=damp(velocity.x,dx*speed,length?9:15,dt);velocity.z=damp(velocity.z,dz*speed,length?9:15,dt);
 if(!blocked&&!seated){const old={...position};position=move(position,velocity,dt,p=>walkable(p,world.bounds,world.obstacles));character.position.set(position.x,0,position.z);
  const actual=distance(old,position)/Math.max(dt,.001);if(actual>.12){character.rotation.y=turn(character.rotation.y,Math.atan2(velocity.x,velocity.z),12,dt);animate('Walking');action.timeScale=Math.max(.5,actual/2.2);}else if(actionName==='Walking')animate('Idle');
 }else if(!seated&&actionName==='Walking')animate('Idle');
 mixer.update(dt);
 const mobile=stage.clientWidth<800,follow=mobile?1:.13;
 const tx=calm&&!mobile?0:position.x*follow,tz=calm&&!mobile?0:position.z*follow;
 focusPoint.x=damp(focusPoint.x,tx,calm?2:3.2,dt);focusPoint.z=damp(focusPoint.z,tz,calm?2:3.2,dt);
 camera.position.copy(focusPoint).add(cameraOffset);camera.lookAt(focusPoint);
 for(const a of world.animated){if(a.type==='paper'){const running=elapsed<processingUntil;a.object.position.x=running&&!calm?-1.05+((elapsed*.55+a.phase)%1)*2.1:-.8+a.phase*1.8;}else if(a.type==='ripple'&&!calm){a.object.material.opacity=.12+Math.sin(elapsed*.5+a.phase)*.04;}}
 near=null;let nearest=1.9;for(const target of world.targets){const d=distance(position,target.approach);if(d<nearest){near=target;nearest=d;}}
 if(frame++%2===0){
  for(const target of world.targets){const projected=target.position.clone().project(camera),x=(projected.x*.5+.5)*stage.clientWidth,y=(-projected.y*.5+.5)*stage.clientHeight;const visible=x>25&&x<stage.clientWidth-25&&y>190&&y<stage.clientHeight-120;target.button.hidden=!visible;target.button.style.display=visible?'flex':'none';target.button.style.left=`${x}px`;target.button.style.top=`${y}px`;target.button.classList.toggle('is-near',target===near);}
  $('#interact').hidden=!near||blocked;$('#interact').textContent=near?`${near.label} · E`:'';
 }
 renderer.render(scene,camera);
}
let sun,ambient,paperTexture;
async function boot(){
 try{
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;document.body.classList.add('failed');$('#loading').hidden=false;$('#loading h2').textContent='The 3D view was interrupted';$('#load-message').textContent='Reload this page to reopen it, or use the portfolio links below.';$('#load-progress').hidden=true;stop();audioContext?.suspend();});
  scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-12,12,8,-8,.1,140);
  ambient=new THREE.HemisphereLight(0xf6eedb,0xb5a88d,2.3);scene.add(ambient);sun=new THREE.DirectionalLight(0xffe1b3,3);sun.position.set(-9,15,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;sun.shadow.camera.near=.5;sun.shadow.camera.far=55;sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=3;scene.add(sun);
  const data=await loadModels(progress=>{$('#load-progress').value=progress;$('#load-message').textContent=`Arranging the desks and books… ${Math.round(progress*100)}%`;});models=data.models;
  paperTexture=await new THREE.TextureLoader().loadAsync('/assets/paper-texture.webp');paperTexture.colorSpace=THREE.SRGBColorSpace;paperTexture.wrapS=paperTexture.wrapT=THREE.RepeatWrapping;paperTexture.repeat.set(2,2);
  character=data.explorer.scene;const size=new THREE.Box3().setFromObject(character).getSize(new THREE.Vector3());character.scale.setScalar(1.35/size.y);
  character.traverse(node=>{if(node.isMesh){node.castShadow=true;node.material=node.material.clone();if(node.material.name==='Main')node.material.color.set(0xb6543a);if(node.material.name==='Grey')node.material.color.set(0xd8cdb5);}});
  mixer=new THREE.AnimationMixer(character);for(const clip of data.explorer.animations)actions[clip.name]=mixer.clipAction(clip);
  mixer.addEventListener('finished',()=>{if(!seated)animate('Idle');});scene.add(character);
  await changeWorld(places[location.hash.slice(1)]?location.hash.slice(1):'paper',true);ready=true;$('#loading').hidden=true;requestAnimationFrame(render);
 }catch(error){console.error('My World could not start:',error);document.body.classList.add('failed');$('#loading h2').textContent='The 3D world couldn’t open';$('#load-message').textContent='You can still explore every role and project in the portfolio below.';$('#load-progress').hidden=true;renderer?.dispose();}
}
boot();
