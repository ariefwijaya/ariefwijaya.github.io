import {softParticleTexture} from './texture-sampling.js';
import * as THREE from 'three';
export function createInteractionEffects({group,targets,ownedMaterials,ownedGeometries,ownedTextures=new Set()}){
 const geometry=new THREE.RingGeometry(.24,.275,32);ownedGeometries.add(geometry);
 const markers=targets.map(target=>{
  const material=new THREE.MeshBasicMaterial({color:0xe8bb70,transparent:true,opacity:.45,depthWrite:false,side:THREE.DoubleSide});ownedMaterials.add(material);
  const marker=new THREE.Mesh(geometry,material);marker.position.set(target.approach.x,.075,target.approach.z);marker.rotation.x=-Math.PI/2;marker.name=`interaction-ring-${target.id}`;group.add(marker);return {target,marker};
 });
 const count=24,positions=new Float32Array(count*3),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(positions,3));ownedGeometries.add(g);
 const map=softParticleTexture();ownedTextures.add(map);
 const material=new THREE.PointsMaterial({map,alphaTest:.02,color:0xffd79d,size:.045,transparent:true,opacity:0,depthWrite:false});ownedMaterials.add(material);const sparks=new THREE.Points(g,material);sparks.frustumCulled=false;sparks.name='interaction-sparks';group.add(sparks);
 const destinationMaterial=new THREE.MeshBasicMaterial({color:0xffd992,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide});ownedMaterials.add(destinationMaterial);
 const destinationGeometry=new THREE.RingGeometry(.30,.365,40);ownedGeometries.add(destinationGeometry);const destination=new THREE.Mesh(destinationGeometry,destinationMaterial);destination.name='walk-destination';destination.rotation.x=-Math.PI/2;destination.visible=false;destination.renderOrder=2;group.add(destination);
 const borderGeometry=new THREE.RingGeometry(.365,.405,40);ownedGeometries.add(borderGeometry);const borderMaterial=new THREE.MeshBasicMaterial({color:0x563b2b,transparent:true,opacity:.7,depthWrite:false,side:THREE.DoubleSide});ownedMaterials.add(borderMaterial);const border=new THREE.Mesh(borderGeometry,borderMaterial);destination.add(border);

 // Destination feedback deliberately avoids a straight route through furniture.
 let destinationAge=0,destinationActive=false,destinationValid=true,wasWalking=false;
 let age=2,clock=0,origin=new THREE.Vector3();
 return {setDestination(goal,valid=true){destination.position.set(goal.x,.08,goal.z);destinationActive=true;destinationValid=valid;destinationAge=0;wasWalking=valid;destinationMaterial.color.set(valid?0xf0a052:0xd34f43);},cancelDestination(){destinationActive=false;destination.visible=false;},trigger(id){const target=targets.find(t=>t.id===id);if(target){origin.copy(target.position);age=0;}},update(dt,{near,calm=false,hidden=false,walking=false}={}){
  clock+=calm?0:dt;age+=dt;destinationAge+=dt;
  if(wasWalking&&!walking){wasWalking=false;destinationAge=0;}
  const finishing=!walking||!destinationValid;
  if(finishing&&destinationAge>.65)destinationActive=false;
  destination.visible=destinationActive&&!hidden;
  const pulse=calm?1:finishing?1+destinationAge*1.4:1+Math.sin(clock*5)*.12;
  destination.scale.setScalar(pulse);destinationMaterial.opacity=finishing?Math.max(0,1-destinationAge/.65):.95;borderMaterial.opacity=destinationMaterial.opacity*.7;
  for(const {target,marker} of markers){marker.visible=!hidden&&near===target.id;marker.material.opacity=calm?.55:.5+Math.sin(clock*2)*.1;}
  sparks.visible=!calm&&age<1.1;
  if(sparks.visible){material.opacity=(1-age/1.1)*.8;for(let i=0;i<count;i++){const a=i*2.399,spread=age*(.2+(i%5)*.07);positions[i*3]=origin.x+Math.cos(a)*spread;positions[i*3+1]=origin.y+age*.4-age*age*.3+(i%3)*.03;positions[i*3+2]=origin.z+Math.sin(a)*spread;}g.attributes.position.needsUpdate=true;}
 }};
}
