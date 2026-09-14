import * as THREE from 'three';

// Two-segment arm solver. Target is a world-space hand-centre position.
export function createDoorReach(root){
 const arm=root.getObjectByName('ArmR'),elbow=root.getObjectByName('ElbowR');
 const handOffset=new THREE.Vector3(0,-.24,.01),upper=.24,lower=handOffset.length();
 const down=new THREE.Vector3(0,-1,0),shoulder=new THREE.Vector3(),aim=new THREE.Vector3(),bend=new THREE.Vector3(),joint=new THREE.Vector3(),direction=new THREE.Vector3();
 const parentQ=new THREE.Quaternion(),worldQ=new THREE.Quaternion(),localQ=new THREE.Quaternion(),baseArm=new THREE.Quaternion(),baseElbow=new THREE.Quaternion();
 return {update(target,weight=0){
  if(!arm||!elbow)return;
  // Mixer owns the x rotations. Clear solver-owned axes every frame, including release.
  arm.rotation.set(arm.rotation.x,0,0);elbow.rotation.set(elbow.rotation.x,0,0);
  if(!target||weight<=0)return;
  baseArm.copy(arm.quaternion);baseElbow.copy(elbow.quaternion);root.updateWorldMatrix(true,true);
  arm.getWorldPosition(shoulder);aim.copy(target).sub(shoulder);
  const scale=arm.getWorldScale(new THREE.Vector3()).x,u=upper*scale,l=lower*scale;
  const distance=THREE.MathUtils.clamp(aim.length(),.005,u+l-.0001);aim.normalize();
  arm.parent.getWorldQuaternion(parentQ);
  bend.set(1,0,0).applyQuaternion(parentQ).addScaledVector(aim,-new THREE.Vector3(1,0,0).applyQuaternion(parentQ).dot(aim));
  if(bend.lengthSq()<.001)bend.set(0,0,1).addScaledVector(aim,-aim.z);
  bend.normalize();
  const along=(u*u+distance*distance-l*l)/(2*distance),height=Math.sqrt(Math.max(0,u*u-along*along));
  joint.copy(shoulder).addScaledVector(aim,along).addScaledVector(bend,height);
  direction.copy(joint).sub(shoulder).normalize().applyQuaternion(parentQ.clone().invert());
  localQ.setFromUnitVectors(down,direction);arm.quaternion.copy(baseArm).slerp(localQ,weight);
  arm.updateWorldMatrix(true,true);arm.getWorldQuaternion(worldQ);
  elbow.getWorldPosition(joint);direction.copy(target).sub(joint).normalize().applyQuaternion(worldQ.invert());
  localQ.setFromUnitVectors(handOffset.clone().normalize(),direction);elbow.quaternion.copy(baseElbow).slerp(localQ,weight);
 },handPosition(){root.updateWorldMatrix(true,true);return elbow?elbow.localToWorld(handOffset.clone()):null;}};
}
