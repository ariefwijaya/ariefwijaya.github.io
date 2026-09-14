// Calm motion pauses decorative idle only after a user-triggered crossfade settles.
export function createAnimationClock(){
 let settling=0;
 return {
  transition(){settling=.3;},
  step(dt,{calm=false,idle=false}={}){
   if(!Number.isFinite(dt)||dt<=0)return 0;
   const advance=!calm||!idle||settling>0;
   settling=Math.max(0,settling-dt);
   return advance?dt:0;
  }
 };
}
