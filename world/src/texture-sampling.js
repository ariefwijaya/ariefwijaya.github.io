import * as THREE from 'three';
// A mirrored pair makes the left/right join continuous even when generated
// panorama edges differ. This is an art-directed mirrored sky, not a true HDRI.
export function configurePanorama(texture){
 texture.wrapS=THREE.MirroredRepeatWrapping;texture.wrapT=THREE.ClampToEdgeWrapping;texture.repeat.set(2,1);texture.needsUpdate=true;return texture;
}
export function softParticleTexture(){
 const size=32,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=(y*size+x)*4,r=Math.hypot((x+.5)/size*2-1,(y+.5)/size*2-1);data[i]=data[i+1]=data[i+2]=255;data[i+3]=Math.max(0,1-r)**2*255;}
 const t=new THREE.DataTexture(data,size,size);t.needsUpdate=true;t.magFilter=THREE.LinearFilter;return t;
}
