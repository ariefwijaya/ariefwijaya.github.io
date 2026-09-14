import {damp} from './motion.js';
const safe=n=>Number.isFinite(n)?n:0;

// Own one pointer without stealing the second finger used to look around.
export function createJoystickState({radius=44,deadZone=.08}={}){
 let owner=null,origin={x:0,y:0},value={x:0,z:0},thumb={x:0,y:0};
 return {
  get active(){return owner!==null;},get pointerId(){return owner;},get value(){return {...value};},get thumb(){return {...thumb};},
  begin(id,x,y){if(owner!==null)return false;owner=id;origin={x:safe(x),y:safe(y)};return true;},
  move(id,x,y){
   if(id!==owner)return {...value};
   const dx=safe(x)-origin.x,dy=safe(y)-origin.y,distance=Math.hypot(dx,dy),amount=Math.min(1,distance/radius);
   const magnitude=amount<=deadZone?0:Math.pow((amount-deadZone)/(1-deadZone),1.15);
   const nx=distance?dx/distance:0,ny=distance?dy/distance:0;
   value={x:nx*magnitude,z:ny*magnitude};thumb={x:nx*amount*radius,y:ny*amount*radius};return {...value};
  },
  end(id){if(id!==owner)return false;this.reset();return true;},
  reset(){owner=null;value={x:0,z:0};thumb={x:0,y:0};}
 };
}

export function createLookGesture({threshold=6}={}){
 let pointer=null;
 return {
  get active(){return pointer!==null;},get pointerId(){return pointer?.id??null;},
  begin(id,x,y){if(pointer)return false;pointer={id,x,y,startX:x,startY:y,drag:false};return true;},
  move(id,x,y){
   if(!pointer||pointer.id!==id)return null;
   const dx=x-pointer.x,dy=y-pointer.y;
   if(Math.hypot(x-pointer.startX,y-pointer.startY)>threshold)pointer.drag=true;
   pointer.x=x;pointer.y=y;return pointer.drag?{x:dx,y:dy}:null;
  },
  end(id){if(!pointer||pointer.id!==id)return null;const result={tap:!pointer.drag,x:pointer.x,y:pointer.y};pointer=null;return result;},
  reset(){pointer=null;}
 };
}

export function stepVelocity(current,target,dt){
 const x=safe(target.x),z=safe(target.z),moving=Math.hypot(x,z)>.001;
 const reversing=current.x*x+current.z*z<0;
 const response=!moving?26:reversing?22:14,seconds=Math.max(0,safe(dt));
 const next={x:damp(current.x,x,response,seconds),z:damp(current.z,z,response,seconds)};
 if(!moving&&Math.hypot(next.x,next.z)<.008)return {x:0,z:0};return next;
}

// Ground destinations are intentional in overview cameras only.
export const canTapWalk=mode=>mode==='diorama'||mode==='top';
