import * as THREE from 'three';

// Each world owns its animation phase. Pausing does not consume wall-clock time.
export function createEnvironment({kind,group,ownedMaterials,ownedGeometries,ownedTextures}){
 const clock={value:0},updates=[];
 const ownMaterial=m=>{ownedMaterials.add(m);return m;};
 const ownGeometry=g=>{ownedGeometries.add(g);return g;};
 const mesh=(geometry,material,name,parent=group)=>{
  const o=new THREE.Mesh(ownGeometry(geometry),material);o.name=`ambient-${name}`;parent.add(o);return o;
 };
 function swayMaterial(material,amplitude=.018){
  material.userData.foliage=true;
  material.onBeforeCompile=shader=>{
   shader.uniforms.uAmbientTime=clock;
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float uAmbientTime;');
   shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
    float sway = sin(uAmbientTime * 1.05 + position.x * 2.1 + position.z * 1.7);
    transformed.x += sway * ${amplitude.toFixed(4)} * clamp(uv.y * 2.8, 0.0, 1.0);
    transformed.z += cos(uAmbientTime * 0.73 + position.x) * ${(amplitude*.4).toFixed(4)} * clamp(uv.y * 2.8, 0.0, 1.0);`);
  };
  material.customProgramCacheKey=()=>`foliage-${amplitude}`;
  return material;
 }
 function water(material){
  material.onBeforeCompile=shader=>{
   shader.uniforms.uAmbientTime=clock;
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float uAmbientTime;\nvarying vec2 vWaterLocal;');
   shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`#include <beginnormal_vertex>
    objectNormal = normalize(vec3(-0.065 * cos(position.x * 0.9 + uAmbientTime * 0.7), -0.045 * cos(position.y * 1.3 - uAmbientTime * 0.53), 1.0));`);
   shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
    vWaterLocal = position.xy;
    transformed.z += sin(position.x * 0.9 + uAmbientTime * 0.7) * 0.072 + sin(position.y * 1.3 - uAmbientTime * 0.53) * 0.035;`);
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform float uAmbientTime;\nvarying vec2 vWaterLocal;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
    vec2 p = vWaterLocal;
    float shore = 100.0;
    for(int i=0;i<3;i++){
     vec2 q=(p-vec2(float(i-1)*7.6,0.0))/vec2(3.3,4.2);
     shore=min(shore,(length(q)-1.0)*3.3);
    }
    float swell=sin(p.x*1.3+p.y*.7+uAmbientTime*.9)*.12+sin(p.y*2.1-uAmbientTime*.65)*.07;
    float shallows=1.0-smoothstep(-.3,3.0,shore);
    vec3 sea=mix(vec3(.025,.24,.36),vec3(.12,.60,.57),shallows);
    float ripple=sin(p.x*3.2+p.y*2.5+sin(p.y*1.7-uAmbientTime*.6)+uAmbientTime*.8);
    float aa=max(fwidth(ripple),.035);
    float crossWave=sin(p.x*2.1-p.y*3.6-uAmbientTime*.52);
    float glint=smoothstep(.89-aa,.99+aa,ripple)*smoothstep(.65,.98,crossWave)*.018;
    float edge=shore+swell;
    float foam=(1.0-smoothstep(.02,.22,abs(edge-.18)))*smoothstep(-.2,.02,edge);
    float breakers=(1.0-smoothstep(.025,.10,abs(sin(shore*3.5-uAmbientTime*1.1))))*(1.0-smoothstep(.5,2.4,shore))*.16;
    float distant=1.0-smoothstep(12.0,80.0,length(p));
    diffuseColor.rgb=mix(sea+glint*distant,vec3(.83,.94,.85),clamp((foam*.38+breakers*.4)*distant,0.0,.8));
`);
  };
  material.customProgramCacheKey=()=> 'living-water-v2';
  const o=mesh(new THREE.PlaneGeometry(400,400,96,96),material,'water');o.rotation.x=-Math.PI/2;o.position.y=-1.6;o.receiveShadow=true;
  return o;
 }
 function floatCanoe(canoe){
  canoe.name='ambient-canoe';const base=canoe.position.clone(),rotation=canoe.rotation.clone();
  updates.push(t=>{canoe.position.y=base.y+Math.sin(t*.7)*.024;canoe.rotation.x=rotation.x+Math.sin(t*.61)*.022;canoe.rotation.z=rotation.z+Math.sin(t*.83+.4)*.016;});
 }
 function birds(){
  const ink=ownMaterial(new THREE.MeshBasicMaterial({color:0x505b50,side:THREE.DoubleSide}));
  for(let i=0;i<3;i++){
   const bird=new THREE.Group();bird.name=`ambient-bird-${i}`;group.add(bird);
   const body=mesh(new THREE.SphereGeometry(.035,6,4),ink,`bird-body-${i}`,bird);body.scale.set(2.2,.8,1);
   const wings=[];
   for(const side of [-1,1]){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([.035,0,0,-.09,0,side*.31,.12,0,side*.16],3));geometry.computeVertexNormals();
    wings.push(mesh(geometry,ink,`bird-wing-${i}-${side}`,bird));
   }
   updates.push(t=>{
    const phase=(t+i*.7)%38,progress=phase/15;bird.visible=phase<15;
    bird.position.set(-14+progress*29,5.2+i*.24+Math.sin(t*.35+i)*.1,1.8+i*.42+Math.sin(progress*Math.PI)*1.4);
    const flap=Math.sin(t*6.2-i*.7)*.48;wings[0].rotation.x=flap;wings[1].rotation.x=-flap;
   });
  }
 }
 function steam(x,y,z){
  const size=32,data=new Uint8Array(size*size*4);
  for(let iy=0;iy<size;iy++)for(let ix=0;ix<size;ix++){
   const r=Math.hypot((ix+.5)/size*2-1,(iy+.5)/size*2-1),j=(iy*size+ix)*4;
   data[j]=data[j+1]=data[j+2]=255;data[j+3]=Math.round(Math.pow(Math.max(0,1-r),2)*255);
  }
  const texture=new THREE.DataTexture(data,size,size);texture.needsUpdate=true;texture.magFilter=THREE.LinearFilter;ownedTextures.add(texture);
  for(let i=0;i<5;i++){
   const material=ownMaterial(new THREE.SpriteMaterial({map:texture,color:0xf4eedc,transparent:true,opacity:0,depthWrite:false}));
   const puff=new THREE.Sprite(material);puff.name=`ambient-steam-${x}-${i}`;puff.renderOrder=1;group.add(puff);
   updates.push(t=>{const age=(t*.24+i/5)%1;puff.position.set(x+Math.sin(t*.7+i*.6)*age*.035,y+age*.43,z+Math.sin(t*.45+i)*age*.025);puff.scale.set(.075+age*.11,.13+age*.13,1);material.opacity=Math.sin(age*Math.PI)*.19;});
  }
 }
 function rain(x){
  const count=26,geometry=new THREE.BufferGeometry(),positions=new Float32Array(count*6);
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const material=ownMaterial(new THREE.LineBasicMaterial({color:0xbad6d5,transparent:true,opacity:.33,depthWrite:false}));
  const lines=new THREE.LineSegments(ownGeometry(geometry),material);lines.name=`ambient-rain-${x}`;lines.frustumCulled=false;group.add(lines);
  updates.push(t=>{
   // Confine strokes to the visible glass, in front of its opaque back wall.
   for(let i=0;i<count;i++){
    const phase=(i*.61803398875+t*(.31+(i%3)*.035))%1,px=x-.42+((i*.754877666)%1)*.84,py=2.65-phase*1.24,j=i*6;
    positions[j]=px;positions[j+1]=py;positions[j+2]=-4.044;
    positions[j+3]=px-.012;positions[j+4]=Math.max(1.34,py-.065-(i%3)*.015);positions[j+5]=-4.044;
   }
   geometry.attributes.position.needsUpdate=true;
  });
 }
 function populate(centers){
  if(kind==='islands')birds();
  else {steam(centers[0]-1.1,1.35,-1.47);steam(centers[2]-.66,1.26,-1.68);}
  if(kind==='night')for(const x of [-6.8,6.8])rain(x);
  updates.forEach(update=>update(0));
 }
 return {swayMaterial,water,floatCanoe,populate,time:()=>clock.value,update(dt,{calm=false,active=true}={}){
  if(calm||!active||!Number.isFinite(dt)||dt<=0)return;
  clock.value+=dt;updates.forEach(update=>update(clock.value));
 }};
}
