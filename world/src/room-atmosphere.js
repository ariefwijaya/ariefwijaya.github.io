import {configurePanorama,softParticleTexture} from './texture-sampling.js';
import * as THREE from 'three';
export function roomAtmosphere({kind,group,image,ownedMaterials,ownedGeometries,ownedTextures}){
 const night=kind==='night';
 const material=m=>{ownedMaterials.add(m);return m;},geometry=g=>{ownedGeometries.add(g);return g;};
 let sky;
 if(night){
  let map=null;if(image){map=new THREE.Texture(image);map.colorSpace=THREE.SRGBColorSpace;map.needsUpdate=true;ownedTextures.add(map);configurePanorama(map);map.repeat.set(6,1);}
  sky=new THREE.Mesh(geometry(new THREE.SphereGeometry(225,32,20)),material(new THREE.MeshBasicMaterial({map,color:map?0x9ba8b9:0x16334c,side:THREE.BackSide,depthWrite:false,fog:false})));sky.material.onBeforeCompile=shader=>{
   shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>', `
    #ifdef USE_MAP
     vec2 uv = vMapUv; float elevation = uv.y;
     uv.y = clamp((elevation - .34) * 3.2, 0.0, 1.0);
     vec4 clouds = texture2D(map, uv);
     float band = smoothstep(.32,.43,elevation)*(1.0-smoothstep(.56,.72,elevation));
     vec3 clearSky = mix(vec3(.035,.065,.14),vec3(.085,.14,.23),1.0-elevation);
     diffuseColor.rgb *= mix(clearSky, clouds.rgb, band*.65);
    #endif
   `);
  };sky.material.customProgramCacheKey=()=> 'night-cloud-band-v1';sky.name='ambient-night-sky';sky.renderOrder=-2;group.add(sky);
  const moon=new THREE.Mesh(geometry(new THREE.SphereGeometry(.8,24,16)),material(new THREE.MeshBasicMaterial({color:0xffe4ac})));moon.name='ambient-moon';moon.position.set(70,60,-110);moon.scale.setScalar(8);group.add(moon);
  const halo=new THREE.Sprite(material(new THREE.SpriteMaterial({color:0xffe5b8,transparent:true,opacity:.09,depthWrite:false})));
  // Soft radial alpha avoids a rectangular halo.
  const size=32,data=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=(y*size+x)*4,r=Math.hypot(x/31*2-1,y/31*2-1);data[i]=data[i+1]=data[i+2]=255;data[i+3]=Math.max(0,1-r)**2*255;}
  const texture=new THREE.DataTexture(data,size,size);texture.needsUpdate=true;texture.magFilter=THREE.LinearFilter;ownedTextures.add(texture);halo.material.map=texture;halo.position.copy(moon.position);halo.scale.set(32,32,1);group.add(halo);
  for(const x of [-5.2,0,5.2]){const glow=new THREE.Sprite(material(new THREE.SpriteMaterial({map:texture,color:0xffc078,transparent:true,opacity:.24,depthWrite:false})));glow.name='ambient-lamp-glow';glow.position.set(x,2.95,-1.5);glow.scale.set(2.2,2.2,1);group.add(glow);}
 }
 const count=night?0:16,positions=new Float32Array(count*3),base=[];
 for(let i=0;i<count;i++){const p=[Math.sin(i*17.3)*(night?15:8),night?2+(i%9)*.6:.5+(i%7)*.44,Math.cos(i*7.1)*(night?10:4)];base.push(p);positions.set(p,i*3);}
 const g=geometry(new THREE.BufferGeometry());g.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const moteTexture=softParticleTexture();ownedTextures.add(moteTexture);
 const m=material(new THREE.PointsMaterial({map:moteTexture,alphaTest:.03,color:night?0xffe2a1:0xffedcf,size:.035,transparent:true,opacity:night?.7:.42,depthWrite:false}));
 const motes=new THREE.Points(g,m);motes.name=night?'ambient-fireflies':'ambient-paper-dust';group.add(motes);
 let previous=-1;return {update(t,{calm=false,active=true}={}){motes.visible=!calm&&active;if(t===previous)return;previous=t;if(sky)sky.rotation.y=t*.0007;
  for(let i=0;i<count;i++){const p=base[i];positions[i*3]=p[0]+Math.sin(t*.18+i)*.18;positions[i*3+1]=p[1]+Math.sin(t*.23+i*1.7)*.16;positions[i*3+2]=p[2]+Math.cos(t*.15+i)*.1;}g.attributes.position.needsUpdate=true;
  m.opacity=.22+Math.sin(t*.7)*.04;
 }};
}
