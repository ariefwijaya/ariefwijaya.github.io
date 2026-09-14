import * as THREE from 'three';

// Tileable material structure: growth rings, thread crossings, mineral veins and
// directional brushing. Each world owns one small atlas of shared PBR channels.
export function createMaterialDetails(ownedTextures,kind='paper'){
 const size=256,tau=Math.PI*2;
 const noise=(x,y)=>{let n=Math.imul(x+17,374761393)^Math.imul(y+41,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;};
 // Three r180 samples height from R and roughness from G. Share one RG8
 // texture for each pair, preserving the original bytes and mip filtering.
 const pairs=new Map();
 const texture=(name,sample,color=false)=>{
  const pair=name.replace(/-(bump|roughness)$/,''),channel=name.endsWith('roughness')?1:0,stride=color?4:2;
  let t=color?null:pairs.get(pair);
  if(!t){
   t=new THREE.DataTexture(new Uint8Array(size*size*stride),size,size,color?THREE.RGBAFormat:THREE.RGFormat);
   t.name=`surface-${color?name:pair+'-detail'}`;t.colorSpace=color?THREE.SRGBColorSpace:THREE.NoColorSpace;
   t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.LinearFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;
   ownedTextures.add(t);if(!color)pairs.set(pair,t);
  }
  const data=t.image.data,byte=value=>Math.max(0,Math.min(255,Math.round(value)));
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   const value=sample(x,y),i=(y*size+x)*stride;
   if(color){for(let c=0;c<3;c++)data[i+c]=byte(value[c]);data[i+3]=255;}
   else data[i+channel]=byte(value);
  }
  t.needsUpdate=true;return t;
 };
 const grain=(x,y)=>{
  const u=x/size*tau,v=y/size*tau,warp=Math.sin(v)*.8+Math.sin(v*3)*.22;
  return Math.sin(u*19+warp)*.62+Math.sin(u*41+warp*2)*.24+Math.sin(u*7+Math.sin(v)*1.7)*.14;
 };
 const weave=(x,y)=>{const u=x/size*tau*32,v=y/size*tau*32;return Math.cos(u)*.38+Math.cos(v)*.38+Math.cos(u/2)*Math.cos(v/2)*.24;};
 const mineral=(x,y)=>{const u=x/size*tau,v=y/size*tau;return Math.sin(u*3+Math.sin(v*2))* .42+Math.cos(v*5+Math.sin(u*2))*.32+Math.sin(u*11+v*7)*.16;};
 const ceramic=(x,y)=>Math.sin(y/size*tau*27)*7+(noise(x,y)-.5)*15;
 const weathered=kind==='islands',woodTone=weathered?[222,218,202]:kind==='night'?[224,213,202]:[242,226,200];
 return {
  woodColor:texture('wood-color',(x,y)=>woodTone.map((c,i)=>c+grain(x,y)*(weathered?22:17)-(weathered?Math.pow(Math.max(0,Math.sin(x/size*tau*31+Math.sin(y/size*tau))),14)*22:0)+(noise(x,y)-.5)*4-i),true),
  woodBump:texture('wood-bump',(x,y)=>137+grain(x,y)*38+(noise(x,y)-.5)*6),
  woodRoughness:texture('wood-roughness',(x,y)=>208+grain(x,y)*19+(weathered?18:0)+(noise(x,y)-.5)*6),
  paperBump:texture('paper-bump',(x,y)=>144+(noise(x,y)-.5)*37+(noise(x>>2,y)-.5)*11),
  paperRoughness:texture('paper-roughness',(x,y)=>244+(noise(x,y)-.5)*16),
  linenColor:texture('linen-color',(x,y)=>[242,236,222].map(c=>c+weave(x,y)*12),true),
  linenBump:texture('linen-bump',(x,y)=>135+weave(x,y)*56+(noise(x,y)-.5)*8),
  linenRoughness:texture('linen-roughness',(x,y)=>232+weave(x,y)*20),
  ceramicBump:texture('ceramic-bump',(x,y)=>140+ceramic(x,y)),
  ceramicRoughness:texture('ceramic-roughness',(x,y)=>177+ceramic(x,y)*1.5),
  stoneColor:texture('stone-color',(x,y)=>[222,221,209].map(c=>c+mineral(x,y)*23+(noise(x,y)-.5)*7),true),
  stoneBump:texture('stone-bump',(x,y)=>140+mineral(x,y)*48+(noise(x,y)-.5)*20),
  stoneRoughness:texture('stone-roughness',(x,y)=>228+mineral(x,y)*24),
  metalBump:texture('metal-bump',(x,y)=>135+Math.sin(x/size*tau*103)*17+(noise(x,y)-.5)*4),
  metalRoughness:texture('metal-roughness',(x,y)=>157+Math.sin(x/size*tau*103)*25+(noise(x,y)-.5)*6),
 };
}
