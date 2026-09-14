import {createWorldAudio} from './audio.js';
import {loadCartoonImages,dressExplorer} from './cartoon-surfaces.js';
import {loadIslandImages} from './island-atmosphere.js';
import {createDoorReach} from './reach.js';
import {workstationPages} from './workstation.js';
import {createProfiler} from './profiling.js';
import {createJoystickState,createLookGesture,stepVelocity,canTapWalk} from './controls.js';
import {createAnimationClock} from './animation.js';
import {createCameraRig} from './camera.js';
import {createRendering} from './rendering.js';
import * as THREE from 'three';
import {loadModels,buildWorld} from './scene.js';
import {places,stories} from './content.js';
import {damp,turn,distance,walkable,findPath,move} from './motion.js';
const $=s=>document.querySelector(s),canvas=$('#world-canvas'),stage=$('#stage'),status=$('#world-status');
let rig,pipeline,renderer,scene,camera,world,models,character,mixer,actions={},action,actionName='',path=[],velocity={x:0,z:0},position={x:0,z:0},current='paper',ready=false,switching=false,seated=false,tourIndex=-1,near=null;
let machineTime=0,profiler,readingDesk=false,doorAction=null,doorReach=null,readingDisplay=null;
let calm=matchMedia('(prefers-reduced-motion: reduce)').matches,lampOn=true,processingUntil=0,lastTime=0,elapsed=0,toastTimer,frame=0;
const keys=new Set(),tourStops=['build','ai','lead','source'],raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
const animationClock=createAnimationClock(),stick=createJoystickState(),lookGesture=createLookGesture();
let sensitivity=1;
try{sensitivity=Math.min(1.8,Math.max(.6,Number(localStorage.getItem('world-look-sensitivity'))||1));}catch{}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function syncMotion(){document.body.classList.toggle('calm',calm);$('#motion').setAttribute('aria-pressed',String(calm));}
syncMotion();reduced.addEventListener('change',e=>{calm=e.matches;syncMotion();});
let introTimer;
function showWorldIntro(){clearTimeout(introTimer);document.body.classList.remove('world-intro');requestAnimationFrame(()=>{document.body.classList.add('world-intro');introTimer=setTimeout(()=>document.body.classList.remove('world-intro'),calm?2300:4300);});}
function dismissWorldIntro(){clearTimeout(introTimer);document.body.classList.remove('world-intro');}
$('#panel-camera').addEventListener('click',()=>{$('#explore-panel').close();openDialog('#camera-dialog');});
function toast(message,duration=4500){clearTimeout(toastTimer);status.textContent=message;if(duration)toastTimer=setTimeout(()=>{status.textContent='';},duration);}
function modalOpen(){return !!document.querySelector('dialog[open]');}
function stop(){keys.clear();stick.reset();lookGesture.reset();paintStick();velocity={x:0,z:0};path=[];world?.effects.cancelDestination();}
function openDialog(id){if(doorAction&&id!=='#world-picker')leaveDoor();stop();if(id!=='#explore-panel'&&$('#explore-panel').open)$('#explore-panel').close();const dialog=$(id);if(!dialog.open){dialog.returnValue='';dialog.showModal();}if(id==='#explore-panel')$('#explore-menu').setAttribute('aria-expanded','true');}
$('#explore-menu').addEventListener('click',()=>openDialog('#explore-panel'));
$('#explore-panel').addEventListener('close',()=>$('#explore-menu').setAttribute('aria-expanded','false'));
const objectIcons={build:'build',ai:'ai',reports:'reports',lead:'lead',source:'source',sit:'chair',lamp:'lamp',door:'door'};
const icon=name=>`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
function tourLabel(active){$('#tour [data-label]').textContent=active?'End tour':'Guided tour';$('#tour').setAttribute('aria-pressed',String(active));}

document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>{const dialog=button.closest('dialog');if(dialog.id==='story-dialog')cancelTour();dialog.close();}));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.addEventListener('cancel',()=>{if(dialog.id==='story-dialog')cancelTour();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){if(dialog.id==='story-dialog')cancelTour();dialog.close();}}});
 dialog.addEventListener('close',()=>{if(ready&&!modalOpen())(dialog.id==='explore-panel'&&dialog.returnValue!=='walk'?$('#explore-menu'):canvas).focus({preventScroll:true});});
});
const cameraNames={diorama:'Diorama',third:'Third person',first:'First person',top:'Top view'};
function selectCamera(mode){
 if(!ready||!cameraNames[mode])return;
 rig.setMode(mode,{calm});canvas.dataset.camera=mode;document.body.dataset.camera=mode;
 $('#camera-menu').setAttribute('aria-label',`Camera: ${cameraNames[mode]}`);$('#camera-tooltip').textContent=`${cameraNames[mode]} · Change view`;
 document.querySelectorAll('[data-camera-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cameraMode===mode)));
 $('#camera-dialog').close();canvas.focus({preventScroll:true});
 $('.keyboard-hint').textContent=mode==='first'||mode==='third'?'W A S D / arrows to walk · Drag to look · I J K L to look · C to change camera':'W A S D / arrows to walk · Click the floor to move · C to change camera';
}
$('#look-sensitivity').value=sensitivity;$('#sensitivity-value').textContent=`${sensitivity.toFixed(1)}×`;
$('#look-sensitivity').addEventListener('input',e=>{sensitivity=Number(e.target.value);$('#sensitivity-value').textContent=`${sensitivity.toFixed(1)}×`;try{localStorage.setItem('world-look-sensitivity',sensitivity);}catch{}});
$('#camera-menu').addEventListener('click',()=>openDialog('#camera-dialog'));
document.querySelectorAll('[data-camera-mode]').forEach(b=>b.addEventListener('click',()=>selectCamera(b.dataset.cameraMode)));
$('#choose-world').addEventListener('click',()=>openDialog('#world-picker'));
$('#show-places').addEventListener('click',()=>openDialog('#places-dialog'));
$('#help').addEventListener('click',()=>openDialog('#help-dialog'));
$('#motion').addEventListener('click',()=>{calm=!calm;syncMotion();toast(calm?'Calm motion enabled. Decorative animation is paused.':'Full motion enabled.');});
$('#interact').addEventListener('click',()=>near&&interact(near.id));
function animate(name,once=false){
 if(!actions[name]||actionName===name)return;
 animationClock.transition();
 const next=actions[name];action?.fadeOut(calm?.1:.24);next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(calm?.1:.24).play();
 next.setLoop(once?THREE.LoopOnce:THREE.LoopRepeat,once?1:Infinity);next.clampWhenFinished=once;action=next;actionName=name;
}
function emote(name){
 if(!ready||switching||readingDesk||readingDisplay||doorAction||seated)return;
 $('#explore-panel').close();cancelTour();stop();character.rotation.y=Math.atan2(camera.position.x-character.position.x,camera.position.z-character.position.z);animate(name,true);canvas.focus();
}
$('#kuri-wave').addEventListener('click',()=>emote('Wave'));
$('#kuri-pose').addEventListener('click',()=>emote('Pose'));
function seatMove(to){seatTransition={from:character.position.clone(),to:new THREE.Vector3(to.x,to.y||0,to.z),time:0};}
function stand(){if(seated){seated=false;position={...world.targets.find(t=>t.id==='sit').approach};seatMove(position);animate('Standing',true);}}
function syncFieldTour(){document.querySelectorAll('[data-field-next]').forEach(b=>{b.hidden=tourIndex<0;b.textContent=tourIndex===tourStops.length-1?'Finish tour ✓':'Next stop →';});}
function cancelTour(){tourIndex=-1;tourLabel(false);$('#story-tour').hidden=true;syncFieldTour();}
function updateJournal(index){
 world.workstation.paint(index);const page=world.workstation.page,entry=workstationPages[page];
 $('#workstation-page').textContent=`${String(page+1).padStart(2,'0')} / ${String(workstationPages.length).padStart(2,'0')}`;
 $('#workstation-prev').disabled=page===0;$('#workstation-next').disabled=page===workstationPages.length-1;
 const transcript=$('#workstation-transcript');transcript.replaceChildren();
 const heading=document.createElement('h2'),body=document.createElement('p');heading.textContent=entry.title;body.textContent=entry.body;transcript.append(heading,body);
}
function leaveWorkstation(){
 if(!readingDesk)return;readingDesk=false;rig.releaseFocus();world.workstation?.setReading(false);
 document.body.classList.remove('reading-workstation');$('#workstation-controls').hidden=true;
 $('#hotspots').inert=false;$('.world-dock').inert=false;canvas.focus({preventScroll:true});
}
function readWorkstation(){
 syncFieldTour();stop();onArrival=null;readingDesk=true;status.textContent='';world.workstation.setReading(true);world.effects.trigger('build');updateJournal(0);
 rig.focusOn(world.workstation.view());document.body.classList.add('reading-workstation');
 $('#hotspots').inert=true;$('.world-dock').inert=true;$('#workstation-controls').hidden=false;$('#workstation-back').focus({preventScroll:true});tone();
}
$('#workstation-back').addEventListener('click',()=>{cancelTour();leaveWorkstation();});
$('#workstation-prev').addEventListener('click',()=>{updateJournal(world.workstation.page-1);tone('paper');});
$('#workstation-next').addEventListener('click',()=>{updateJournal(world.workstation.page+1);tone('paper');});
$('#workstation-text').addEventListener('click',()=>{const button=$('#workstation-text'),visible=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(visible));$('#workstation-transcript').classList.toggle('sr-only',!visible);});
function leaveDisplay(){
 if(!readingDisplay)return;world.animated.forEach(a=>a.object.visible=true);readingDisplay=null;world.displays.close();rig.releaseFocus();$('#display-controls').hidden=true;
 document.body.classList.remove('reading-workstation');$('#hotspots').inert=false;$('.world-dock').inert=false;canvas.focus({preventScroll:true});
}
function readDisplay(id){
 syncFieldTour();stop();onArrival=null;readingDisplay=id;if(id==='ai')world.animated.forEach(a=>a.object.visible=false);const view=world.displays.open(id,stage.clientWidth/stage.clientHeight);rig.focusOn(view);if(id==='ai')processingUntil=world.displays.printing?elapsed+4:0;world.effects.trigger(id);
 $('#display-caption').textContent=stories[id].title;$('#display-controls').hidden=false;document.body.classList.add('reading-workstation');$('#hotspots').inert=true;$('.world-dock').inert=true;$('#display-back').focus({preventScroll:true});if(id!=='ai'||world.displays.printing)tone(id==='ai'?'machine':id==='source'?'book':'paper');
}
$('#display-back').addEventListener('click',()=>{cancelTour();leaveDisplay();});
$('#display-full').addEventListener('click',()=>showStory(readingDisplay));
function showStory(id){
 // The guided tour still uses its existing next-stop controls; the desk is the manual exploration pilot.
 if(id==='build'&&world.workstation&&tourIndex<0){readWorkstation();return;}

 const story=stories[id];if(!story)return;
 const host=$('#story-content');host.replaceChildren();
 function add(tag,text,cls,parent=host){const node=document.createElement(tag);node.textContent=text;if(cls)node.className=cls;parent.append(node);return node;}
 add('p',story.eyebrow,'eyebrow');add('h2',story.title).id='story-title';add('p',story.subtitle,'story-subtitle');add('p',story.body);
 if(story.image){const figure=add('figure',''),img=document.createElement('img');img.src=story.image;img.alt='Conceptual illustration of automated reporting';img.width=1024;img.height=768;figure.append(img);add('figcaption','Conceptual illustration · not a product screenshot.',null,figure);}
 if(story.facts){const facts=add('div','','story-facts');for(const [title,body] of story.facts){const item=add('section','',null,facts);add('h3',title,null,item);add('p',body,null,item);}}
 if(story.repositories){const links=add('div','','story-links');for(const [name,desc,repo] of story.repositories){const a=add('a',`${name} ↗`,null,links);a.href=`https://github.com/ariefwijaya/${repo}`;add('span',desc,null,a);}}
 if(story.demo){const demo=add('div','','world-demo');add('p','SYNTHETIC INVOICE · SAMPLE-001 · TOTAL 120.00',null,demo);const output=add('pre','{ "invoice_id": null, "total": null }',null,demo);output.setAttribute('role','status');const run=add('button','Run the document machine →','button',demo);run.addEventListener('click',()=>{processingUntil=elapsed+4;output.textContent='{\n  "invoice_id": "SAMPLE-001",\n  "total": 120.00\n}';run.textContent='Run again ↻';tone('machine');});}
 if(story.link){const link=add('a',`${story.linkText} ↗`,'text-link accent');link.href=story.link;}
 $('#story-tour').hidden=tourIndex<0;
 if(tourIndex>=0){$('#tour-progress').textContent=`Stop ${tourIndex+1} of ${tourStops.length}`;$('#tour-next').textContent=tourIndex===tourStops.length-1?'Finish tour ✓':'Next stop →';}
 openDialog('#story-dialog');tone();
}
function leaveDoor(){
 if(!doorAction)return;doorReach?.update(null,0);doorAction=null;world?.doorway?.setOpen(false);rig.releaseFocus();
 $('#door-back').hidden=true;$('#hotspots').inert=false;$('.world-dock').inert=false;
 canvas.focus({preventScroll:true});
}
function approachDoor(){
 cancelTour();stop();const target=world.targets.find(t=>t.id==='door');
 goTo(target.approach,()=>{
  doorAction={time:0,opened:false,picker:false,from:{...position},to:{...target.approach}};doorReach??=createDoorReach(character);rig.focusOn(world.doorway.view());
  $('#door-back').hidden=false;$('#hotspots').inert=true;$('.world-dock').inert=true;
  $('#door-back').focus({preventScroll:true});toast('Opening the doorway…',1800);
 });
}
$('#door-back').addEventListener('click',leaveDoor);
$('#world-picker').addEventListener('close',leaveDoor);
function interact(id){
 dismissWorldIntro();
 if(!ready||switching||readingDesk||readingDisplay||doorAction)return;
 if(id==='build'&&world.workstation){cancelTour();stop();goTo(world.targets.find(t=>t.id==='build').approach,readWorkstation);return;}
 world.effects.trigger(id);
 if(stories[id]&&id!=='build'){cancelTour();stop();goTo(world.targets.find(t=>t.id===id).approach,()=>readDisplay(id));return;}
 if(id==='door'){if(world.doorway)approachDoor();else openDialog('#world-picker');return;}
 if(id==='lamp'){lampOn=!lampOn;world.lampLight.intensity=lampOn?(current==='night'?9:2):0;world.bulb.material.emissiveIntensity=lampOn?2:0;toast(lampOn?'Lamp on.':'Lamp off.');tone('lamp');return;}
 if(id==='sit'){
  cancelTour();stand();stop();
  // Approach the chair first; the seated pose uses its own fixed anchor.
  goTo(world.targets.find(t=>t.id==='sit').approach,()=>{seated=true;seatMove({...world.seat,y:.03});animate('Sitting',true);tone('chair');toast('Take your time. Move when you’re ready to stand.');});return;
 }
 showStory(id);
}
let onArrival=null,seatTransition=null;
function goTo(goal,callback=null){
 dismissWorldIntro();
 stand();const valid=p=>walkable(p,world.bounds,world.obstacles);path=findPath(position,goal,valid);onArrival=callback;world.effects.setDestination(goal,path.length>0);
 if(!path.length){toast('That spot is out of reach. Choose an open part of the floor.');onArrival=null;return false;}
 return true;
}
function tourStep(){
 if(tourIndex>=tourStops.length){cancelTour();toast('That’s the tour. Stay and explore, or head back to the portfolio.');return;}
 const id=tourStops[tourIndex],target=world.targets.find(t=>t.id===id);tourLabel(true);toast(`Walking to ${target.label}…`,0);
 const read=()=>{status.textContent='';id==='build'?readWorkstation():readDisplay(id);};
 if(!goTo(target.approach,read))read();
}
$('#tour').addEventListener('click',()=>{$('#explore-panel').close('walk');canvas.focus({preventScroll:true});if(tourIndex>=0){cancelTour();stop();toast('Tour ended. Explore at your own pace.');}else{tourIndex=0;tourStep();}});
document.querySelectorAll('[data-field-next]').forEach(button=>button.addEventListener('click',()=>{leaveDisplay();leaveWorkstation();tourIndex++;tourStep();}));
$('#tour-next').addEventListener('click',()=>{$('#story-dialog').close();leaveDisplay();leaveWorkstation();tourIndex++;tourStep();});
const worldAudio=createWorldAudio();
let soundOn=false,footstepDistance=0,birdCycle=-1,audioLoading=false;
function syncAmbience(){worldAudio.setWorld(current);}
async function toggleSound(){
 if(audioLoading)return;audioLoading=true;$('#sound').disabled=true;
 try{await worldAudio.enable(!soundOn);soundOn=!soundOn;$('#sound [data-label]').textContent=soundOn?'Sound on':'Sound off';$('#sound').setAttribute('aria-pressed',String(soundOn));}
 catch(error){console.error(error);toast('The sound files could not be loaded. Please try again.');}
 finally{audioLoading=false;$('#sound').disabled=false;}
}
function tone(kind='note'){worldAudio.cue(kind,position);}
$('#sound').addEventListener('click',toggleSound);
function resize(){
 if(!renderer||!rig)return;const w=stage.clientWidth,h=stage.clientHeight;
 rig.resize(w,h,current);if(readingDisplay)rig.focusOn(world.displays.view(w/h));renderer.setPixelRatio(Math.min(devicePixelRatio,w<800?1.35:1.75));renderer.setSize(w,h,false);pipeline?.resize(w,h);
}
window.addEventListener('resize',()=>{stick.reset();lookGesture.reset();paintStick();resize();});
function rebuildHotspots(){
 const host=$('#hotspots'),list=$('#places-list');host.replaceChildren();list.replaceChildren();
 for(const target of world.targets){
  const button=document.createElement('button');button.className='hotspot';button.dataset.id=target.id;button.setAttribute('aria-label',target.label);button.innerHTML=`<span class="dot" aria-hidden="true">${icon(objectIcons[target.id])}</span><span class="hotspot-label" aria-hidden="true"></span>`;button.lastChild.textContent=target.label;button.addEventListener('click',()=>{cancelTour();interact(target.id);});host.append(button);target.button=button;
  const item=document.createElement('button');const span=document.createElement('span');span.textContent=target.label;item.append(span,document.createTextNode('↗'));item.addEventListener('click',()=>{$('#places-dialog').close();cancelTour();interact(target.id);});list.append(item);
 }
}
async function changeWorld(kind,initial=false){
 if(!places[kind]||switching)return;leaveDoor();leaveWorkstation();leaveDisplay();switching=true;stop();onArrival=null;seatTransition=null;cancelTour();seated=false;
 if(!initial){stage.classList.add('switching');await new Promise(r=>setTimeout(r,calm?0:280));}
 const [islandImages,cartoonImages]=await Promise.all([kind==='islands'?loadIslandImages():undefined,loadCartoonImages(kind)]);
 if(world){scene.remove(world.group);world.dispose();}
 current=kind;birdCycle=-1;world=buildWorld(kind,models,paperTexture,islandImages,cartoonImages);scene.add(world.group);dressExplorer(character,world.surfaces);scene.background=new THREE.Color(world.palette.background);scene.fog=new THREE.Fog(kind==='islands'?0xb7dce5:world.palette.background,160,300);
 sun.intensity=kind==='night'?1.6:2.65;sun.color.set(kind==='night'?0xc4d9e2:0xffe1b3);ambient.intensity=kind==='night'?2.15:1.65;ambient.color.set(kind==='night'?0xa1b3b7:0xf6eedb);ambient.groundColor.set(kind==='night'?0x293937:0xb5a88d);
 document.body.dataset.theme=places[kind].theme;$('#world-name').textContent=places[kind].name;$('#world-number').textContent=`${places[kind].number} / My World`;$('#world-subtitle').textContent=places[kind].subtitle;
 canvas.dataset.world=kind;position={...world.start};velocity={x:0,z:0};character.position.set(position.x,0,position.z);character.rotation.y=Math.PI;animate('Idle');lampOn=true;rebuildHotspots();resize();
 rig.update(0,{position,heading:character.rotation.y,calm,colliders:world.cameraColliders,snap:true});
 syncAmbience();
 history.replaceState(null,'',`/world/${location.search}#${kind}`);stage.classList.remove('switching');switching=false;if(!initial)showWorldIntro();
}
document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{$('#world-picker').close();changeWorld(button.dataset.world);}));
const mapping={w:'up',ArrowUp:'up',s:'down',ArrowDown:'down',a:'left',ArrowLeft:'left',d:'right',ArrowRight:'right'};
window.addEventListener('keydown',e=>{
 if(!ready||switching||modalOpen()||e.ctrlKey||e.metaKey||e.altKey||['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;
 if(readingDisplay){if(e.key==='Escape'){e.preventDefault();cancelTour();leaveDisplay();}return;}
 if(doorAction){if(e.key==='Escape'){e.preventDefault();leaveDoor();}return;}
 const letter=e.key.toLowerCase();
 if(readingDesk){if(e.key==='Escape'){e.preventDefault();cancelTour();leaveWorkstation();}else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();updateJournal(world.workstation.page+(e.key==='ArrowRight'?1:-1));}else if(['w','a','s','d'].includes(letter)){leaveWorkstation();}else return;}
 if(letter==='1'||letter==='2'){e.preventDefault();emote(letter==='1'?'Wave':'Pose');return;}
 if(letter==='m'){e.preventDefault();openDialog('#explore-panel');return;}
 if(letter==='c'){e.preventDefault();const modes=Object.keys(cameraNames);selectCamera(modes[(modes.indexOf(rig.mode)+1)%modes.length]);return;}
 if(['BUTTON','A'].includes(e.target.tagName)&&!e.target.closest('.world-dock'))return;
 if(['i','j','k','l'].includes(letter)){e.preventDefault();keys.add(letter);return;}
 const key=mapping[e.key]||mapping[letter];
 if(key){dismissWorldIntro();e.preventDefault();stand();cancelTour();path=[];onArrival=null;world.effects.cancelDestination();keys.add(key);}else if(e.key.toLowerCase()==='e'&&near){e.preventDefault();interact(near.id);}
});
window.addEventListener('keyup',e=>keys.delete(mapping[e.key]||mapping[e.key.toLowerCase()]||e.key.toLowerCase()));
window.addEventListener('blur',()=>{stick.reset();lookGesture.reset();paintStick();keys.clear();velocity={x:0,z:0};worldAudio.context?.suspend();});
window.addEventListener('focus',()=>{lastTime=0;if(soundOn)worldAudio.context?.resume();});
document.addEventListener('visibilitychange',()=>{stick.reset();lookGesture.reset();paintStick();keys.clear();velocity={x:0,z:0};lastTime=0;if(document.hidden)worldAudio.context?.suspend();else if(soundOn)worldAudio.context?.resume();});
const joystickPad=$('#joystick-pad');
function paintStick(){
 const pad=$('#joystick-pad');if(!pad)return;const thumb=stick.thumb;
 pad.style.setProperty('--stick-x',`${thumb.x}px`);pad.style.setProperty('--stick-y',`${thumb.y}px`);pad.classList.toggle('is-active',stick.active);
}
function manualWalk(){dismissWorldIntro();stand();cancelTour();path=[];onArrival=null;world.effects.cancelDestination();}
joystickPad.addEventListener('pointerdown',e=>{
 if(!ready||switching||modalOpen())return;e.preventDefault();
 const rect=joystickPad.getBoundingClientRect();if(!stick.begin(e.pointerId,rect.left+rect.width/2,rect.top+rect.height/2))return;
 joystickPad.setPointerCapture(e.pointerId);stick.move(e.pointerId,e.clientX,e.clientY);manualWalk();paintStick();
});
joystickPad.addEventListener('pointermove',e=>{if(stick.pointerId!==e.pointerId)return;stick.move(e.pointerId,e.clientX,e.clientY);paintStick();});
for(const event of ['pointerup','pointercancel','lostpointercapture'])joystickPad.addEventListener(event,e=>{stick.end(e.pointerId);paintStick();});
// The joystick remains operable when focused with assistive keyboard navigation.
joystickPad.addEventListener('keydown',e=>{const key=mapping[e.key];if(key&&ready&&!modalOpen()){e.preventDefault();manualWalk();keys.add(key);}});
joystickPad.addEventListener('keyup',e=>keys.delete(mapping[e.key]));
joystickPad.addEventListener('blur',()=>{keys.clear();});
function bindLookSurface(surface,tapToMove){
 surface.addEventListener('pointerdown',e=>{
  if(!ready||switching||modalOpen()||readingDesk||readingDisplay||doorAction||e.button>0)return;
  if(!lookGesture.begin(e.pointerId,e.clientX,e.clientY))return;
  e.preventDefault();surface.setPointerCapture(e.pointerId);if(e.pointerType!=='touch')canvas.focus({preventScroll:true});
 });
 surface.addEventListener('pointermove',e=>{
  const delta=lookGesture.move(e.pointerId,e.clientX,e.clientY);if(!delta||modalOpen()||readingDesk||readingDisplay||doorAction)return;
  const factor=sensitivity*(e.pointerType==='touch'?1.9:1);rig.look(delta.x*factor,delta.y*factor);
 });
 surface.addEventListener('pointerup',e=>{
  const gesture=lookGesture.end(e.pointerId);if(!gesture||!gesture.tap||!tapToMove||!ready||switching||modalOpen()||readingDesk||readingDisplay||doorAction)return;
  const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
  const intersect=raycaster.intersectObjects(world.props,false)[0];cancelTour();
  if(intersect){interact(intersect.object.userData.target);return;}
  if(canTapWalk(rig.mode)&&raycaster.ray.intersectPlane(ground,hit))goTo({x:hit.x,z:hit.z});
 });
 for(const event of ['pointercancel','lostpointercapture'])surface.addEventListener(event,e=>lookGesture.end(e.pointerId));
}
bindLookSurface(canvas,true);bindLookSurface($('#look-pad'),false);
$('#look-pad').addEventListener('keydown',e=>{const letter=e.key.toLowerCase();if(['i','j','k','l'].includes(letter)&&ready&&!modalOpen()){e.preventDefault();keys.add(letter);}});
$('#look-pad').addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
$('#look-pad').addEventListener('blur',()=>{for(const k of ['i','j','k','l'])keys.delete(k);});
function render(time){
 requestAnimationFrame(render);if(!ready||document.hidden)return;
 const frameStart=profiler?.begin();
 const dt=lastTime?Math.min((time-lastTime)/1000,.04):0;lastTime=time;elapsed+=dt;
 const blocked=modalOpen()||switching||readingDesk||!!readingDisplay||!!doorAction||location.hash==='#world-stories';let dx=0,dz=0;
 if(!blocked&&!seated&&!seatTransition){
  if(stick.active){const analog=stick.value;({x:dx,z:dz}=rig.movement(analog.x,analog.z));}
  else if(['up','down','left','right'].some(k=>keys.has(k))){const horizontal=Number(keys.has('right'))-Number(keys.has('left')),vertical=Number(keys.has('down'))-Number(keys.has('up'));({x:dx,z:dz}=rig.movement(horizontal,vertical));}
  else if(path.length){const target=path[0],dist=distance(position,target);if(dist<.13){path.shift();if(!path.length){velocity={x:0,z:0};const callback=onArrival;onArrival=null;callback?.();}}else{dx=(target.x-position.x)/dist;dz=(target.z-position.z)/dist;}}
 }
 const length=Math.hypot(dx,dz),speed=2.55;if(length>1){dx/=length;dz/=length;}
 velocity=stepVelocity(velocity,{x:dx*speed,z:dz*speed},dt);
 if(!blocked&&!seated&&!seatTransition){const old={...position};position=move(position,velocity,dt,p=>walkable(p,world.bounds,world.obstacles));character.position.set(position.x,0,position.z);
  footstepDistance+=distance(old,position);if(footstepDistance>.64){footstepDistance%=.64;tone('step');}
  const actual=distance(old,position)/Math.max(dt,.001);if(actual>.055){character.rotation.y=turn(character.rotation.y,Math.atan2(velocity.x,velocity.z),12,dt);animate('Walking');action.timeScale=damp(action.timeScale,Math.max(.10,Math.min(2.6,actual/.95)),12,dt);}else if(actionName==='Walking')animate('Idle');
 }else if(!seated&&actionName==='Walking')animate('Idle');
 if(seatTransition){
  seatTransition.time=Math.min(1,seatTransition.time+dt);const t=seatTransition.time,ease=t*t*(3-2*t);
  character.position.lerpVectors(seatTransition.from,seatTransition.to,ease);character.rotation.y=turn(character.rotation.y,0,9,dt);
  if(t===1)seatTransition=null;
 }
 if(doorAction){
  doorAction.time+=dt;const settle=calm?1:THREE.MathUtils.smoothstep(doorAction.time,0,.25);
  position.x=THREE.MathUtils.lerp(doorAction.from.x,doorAction.to.x,settle);position.z=THREE.MathUtils.lerp(doorAction.from.z,doorAction.to.z,settle);character.position.set(position.x,0,position.z);
  const t=world.targets.find(t=>t.id==='door');
  character.rotation.y=turn(character.rotation.y,Math.atan2(t.position.x-position.x,t.position.z-position.z),8,dt);
  if(!doorAction.opened&&(calm||doorAction.time>.85)){doorAction.opened=true;world.doorway.setOpen(true);world.effects.trigger('door');tone('door');}
  if(!doorAction.picker&&(calm||doorAction.time>2.05)){doorAction.picker=true;$('#door-back').hidden=true;openDialog('#world-picker');}
 }
 world.doorway?.update(dt,calm);
 mixer.update(animationClock.step(dt,{calm,idle:actionName==='Idle'}));
 if(doorReach){
  const t=doorAction?.time??0;
  const reachIn=THREE.MathUtils.smoothstep(t,.25,.75),reachOut=1-THREE.MathUtils.smoothstep(t,1.0,1.35);
  doorReach.update(doorAction&&!calm?world.doorway.handlePosition():null,calm?0:reachIn*reachOut);
 }
 if(!blocked)rig.look((Number(keys.has('l'))-Number(keys.has('j')))*dt*260*sensitivity,(Number(keys.has('k'))-Number(keys.has('i')))*dt*180*sensitivity);
 rig.update(dt,{position:{x:character.position.x,y:seated?-.28:0,z:character.position.z},heading:character.rotation.y,calm,colliders:world.cameraColliders});
 character.visible=!rig.isFirstPerson&&!readingDesk&&!readingDisplay;
 const closeView=rig.mode==='first'||rig.mode==='third';
 scene.fog.near=damp(scene.fog.near,closeView?18:160,5,dt);scene.fog.far=damp(scene.fog.far,closeView?85:300,5,dt);
  world.workstation?.updateView(camera,stage.clientHeight);
  world.workstation?.update(dt,{calm,near:near?.id==='build'});
  world.updateEnvironment?.(dt,{calm,active:!blocked});
  if(current==='islands'&&!blocked&&!calm){const cycle=Math.floor(world.ambientTime()/38);if(cycle!==birdCycle){birdCycle=cycle;tone('bird');}}
 const processing=elapsed<processingUntil;
 if(processing&&!calm)machineTime+=dt;
 // The demo is deliberately user-controlled, so its sheets can move while its story is open.
 for(const a of world.animated){if(a.type==='paper'&&!calm){if(processing)a.object.position.x=-1.05+((machineTime*.55+a.phase)%1)*2.1;else if(!blocked)a.object.position.x=-.8+a.phase*1.8;}}
 canvas.dataset.motion=calm?'calm':'full';canvas.dataset.input=stick.active?'joystick':lookGesture.active?'look':'idle';canvas.dataset.movement=actionName.toLowerCase();
 near=null;let nearest=1.35;for(const target of world.targets){const d=distance(position,target.approach);if(d<nearest){near=target;nearest=d;}}
 if(frame++%2===0){
  for(const target of world.targets){const projected=target.position.clone().project(camera),x=(projected.x*.5+.5)*stage.clientWidth,y=(-projected.y*.5+.5)*stage.clientHeight;const visible=!readingDesk&&!readingDisplay&&projected.z>=-1&&projected.z<=1&&x>25&&x<stage.clientWidth-25&&y>190&&y<stage.clientHeight-120;target.button.hidden=!visible;target.button.style.display=visible?'flex':'none';target.button.style.left=`${x}px`;target.button.style.top=`${y}px`;target.button.classList.toggle('is-near',target===near);}
  const prompt=$('#interact');prompt.hidden=!near||blocked||seated||!!seatTransition;
  if(near&&prompt.dataset.target!==near.id){prompt.dataset.target=near.id;prompt.setAttribute('aria-label',near.label);prompt.setAttribute('aria-keyshortcuts','E');prompt.innerHTML=`${icon(objectIcons[near.id])}<span>${near.label}</span><kbd aria-hidden="true">E</kbd>`;}
 }
 world.displays.update(dt,calm);world.effects.update(dt,{near:near?.id,calm,hidden:blocked,walking:path.length>0,position});
 pipeline.render(dt);profiler?.end(frameStart,time,world,current);
}
let sun,ambient,paperTexture;
async function boot(){
 try{
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;document.body.classList.add('failed');$('#loading').hidden=false;$('#loading h2').textContent='The 3D view was interrupted';$('#load-message').textContent='Reload this page to reopen it, or use the portfolio links below.';$('#load-progress').hidden=true;stop();worldAudio.context?.suspend();});
  scene=new THREE.Scene();rig=createCameraRig();camera=rig.camera;canvas.dataset.camera='diorama';document.body.dataset.camera='diorama';pipeline=createRendering(renderer,scene,camera);profiler=createProfiler(renderer);
  ambient=new THREE.HemisphereLight(0xf6eedb,0xb5a88d,2.3);scene.add(ambient);sun=new THREE.DirectionalLight(0xffe1b3,3);sun.position.set(-9,15,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;sun.shadow.camera.near=.5;sun.shadow.camera.far=55;sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=4;scene.add(sun);
  const data=await loadModels(progress=>{$('#load-progress').value=progress*.65;$('#load-message').textContent='Preparing your surroundings…';});models=data.models;$('#load-progress').value=.7;$('#load-message').textContent='Adding the finishing touches…';
  paperTexture=await new THREE.TextureLoader().loadAsync('/assets/paper-texture.webp');paperTexture.colorSpace=THREE.SRGBColorSpace;paperTexture.wrapS=paperTexture.wrapT=THREE.RepeatWrapping;paperTexture.repeat.set(2,2);
  character=data.explorer.scene;const size=new THREE.Box3().setFromObject(character).getSize(new THREE.Vector3());character.scale.setScalar(1.62/size.y);
  character.traverse(node=>{if(node.isMesh){node.castShadow=true;if(node.material.name==='Main')node.material.color.set(0xb6543a);if(node.material.name==='Grey')node.material.color.set(0xd8cdb5);}});
  mixer=new THREE.AnimationMixer(character);for(const clip of data.explorer.animations)actions[clip.name]=mixer.clipAction(clip);
  mixer.addEventListener('finished',event=>{if(!seated&&event.action===action)animate('Idle');});scene.add(character);
  await changeWorld(places[location.hash.slice(1)]?location.hash.slice(1):'paper',true);$('#load-progress').value=1;$('#load-message').textContent='Your world is ready.';ready=true;requestAnimationFrame(render);
  if(document.documentElement.classList.contains('portal-entry')){
   // Give the renderer its first frame before revealing the world underneath.
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   const loading=$('#loading');
   if(!calm&&loading.animate){
    await loading.animate([{opacity:1},{opacity:0}],{duration:650,easing:'ease-in-out'}).finished.catch(()=>{});
   }
   document.documentElement.classList.remove('portal-entry');
  }
  $('#loading').hidden=true;showWorldIntro();
 }catch(error){console.error('My World could not start:',error);document.body.classList.add('failed');$('#loading h2').textContent='The 3D world couldn’t open';$('#load-message').textContent='You can still explore every role and project in the portfolio below.';$('#load-progress').hidden=true;pipeline?.dispose();renderer?.dispose();}
}
boot();
