export function seamlessLoop(context,buffer){
 const overlap=Math.min(Math.floor(buffer.sampleRate*.45),Math.floor(buffer.length/4)),length=buffer.length-overlap;
 const result=context.createBuffer(buffer.numberOfChannels,length,buffer.sampleRate);
 for(let c=0;c<buffer.numberOfChannels;c++){
  const input=buffer.getChannelData(c),output=result.getChannelData(c),plain=buffer.length-2*overlap;
  output.set(input.subarray(overlap,buffer.length-overlap));
  for(let i=0;i<overlap;i++){const t=i/(overlap-1);output[plain+i]=input[buffer.length-overlap+i]*(1-t)+input[i]*t;}
 }
 return result;
}
const files={door:['door.mp3'],book:['book.mp3'],paper:['page-1.mp3','page-2.mp3'],lamp:['switch.mp3'],note:['switch.mp3'],chair:['chair.mp3'],machine:['machine.mp3'],bird:['bird.mp3'],wave:['wave.mp3'],city:['night-city.mp3']};
for(const surface of ['wood','carpet','concrete'])files[surface]=[0,1,2].map(i=>`step-${surface}-${i}.mp3`);
export function createWorldAudio(){
 let context,master,enabled=false,world='paper',ambient=null,loading=null;
 const buffers=new Map(),voices=new Set(),last=new Map(),indices=new Map();
 async function load(){
  await Promise.all(Object.values(files).flat().map(async file=>{const response=await fetch(`/world/audio/${file}`);if(!response.ok)throw new Error(`Audio ${response.status}: ${file}`);let buffer=await context.decodeAudioData(await response.arrayBuffer());if(file==='wave.mp3'||file==='night-city.mp3')buffer=seamlessLoop(context,buffer);buffers.set(file,buffer);}));
 }
 function play(kind,{volume=1,loop=false}={}){
  if(!enabled||context?.state!=='running')return;
  const choices=files[kind];if(!choices)return;
  const now=context.currentTime;if(!loop&&now-(last.get(kind)??-100)<.075)return;last.set(kind,now);
  const index=indices.get(kind)||0;indices.set(kind,index+1);const buffer=buffers.get(choices[index%choices.length]);if(!buffer)return;
  if(voices.size>=8){const old=[...voices].find(v=>v!==ambient);if(old){old.source.stop();voices.delete(old);}}
  const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;source.loop=loop;
  gain.gain.value=volume;source.connect(gain);gain.connect(master);const voice={source,gain};voices.add(voice);
  source.onended=()=>{voices.delete(voice);source.disconnect();gain.disconnect();};source.start();return voice;
 }
 function ambience(){
  if(ambient){const old=ambient;old.gain.gain.setTargetAtTime(0,context.currentTime,.25);old.source.stop(context.currentTime+1);ambient=null;}
  if(enabled&&world==='islands')ambient=play('wave',{volume:.12,loop:true});
  if(enabled&&world==='night')ambient=play('city',{volume:.17,loop:true});
 }
 return {
  get context(){return context;},
  async enable(value){
   if(value){if(!context){context=new(window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=.55;master.connect(context.destination);}
    await context.resume();if(!loading)loading=load().catch(error=>{loading=null;throw error;});await loading;enabled=true;master.gain.setTargetAtTime(.55,context.currentTime,.12);ambience();
   }else{enabled=false;if(context){master.gain.setTargetAtTime(0,context.currentTime,.08);for(const voice of voices)voice.source.stop(context.currentTime+.3);ambient=null;}}
  },
  setWorld(value){world=value;if(context){for(const voice of voices)if(voice!==ambient)voice.source.stop();ambience();}},
  cue(kind='note',position){
   if(kind==='step'){
    const bridge=world==='islands'&&Math.abs(position?.x??0)>2.7&&Math.abs(position?.x??0)<5;
    const rug=world!=='islands'&&(position?.z??10)>-2&&(position?.z??10)<.7;const surface=rug?'carpet':bridge||world==='night'?'wood':'concrete';play(surface,{volume:.20});
   }else play(kind,{volume:kind==='bird'?.18:kind==='machine'?.20:kind==='lamp'||kind==='note'?.22:.36});
  }
 };
}
