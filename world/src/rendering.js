import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {FXAAShader} from 'three/addons/shaders/FXAAShader.js';

// Transparent steam belongs in the color pass, not the opaque normal/depth pass.
// SSAOPass in pinned Three r180 already excludes lines/points but not sprites.
export class WorldSSAOPass extends SSAOPass {
 constructor(...args){
  super(...args);
  // These two fullscreen stages only sample textures; no scene depth is used.
  this.ssaoRenderTarget.depthBuffer=false;this.blurRenderTarget.depthBuffer=false;
 }
 dispose(){
  // Pinned r180 does not release these two resources in SSAOPass.dispose().
  this.ssaoMaterial.dispose();this.noiseTexture.dispose();super.dispose();
 }
 _overrideVisibility(){
  super._overrideVisibility();
  this.scene.traverse(object=>{if(object.isSprite&&object.visible){object.visible=false;this._visibilityCache.push(object);}});
 }
}

export function createRendering(renderer,scene,camera){
 const composer=new EffectComposer(renderer),ao=new WorldSSAOPass(scene,camera,512,512,16),antialias=new ShaderPass(FXAAShader);
 ao.ssaoMaterial.defines.PERSPECTIVE_CAMERA=1;ao.depthRenderMaterial.defines.PERSPECTIVE_CAMERA=1;
 ao.kernelRadius=.6;ao.minDistance=.002;ao.maxDistance=.10;
 composer.addPass(new RenderPass(scene,camera));composer.addPass(ao);composer.addPass(new OutputPass());composer.addPass(antialias);
 let enabled=false;
 return {
  resize(w,h){enabled=w>=800;const ratio=Math.min(devicePixelRatio,1.4);composer.setPixelRatio(enabled?ratio:1);composer.setSize(enabled?w:1,enabled?h:1);antialias.uniforms.resolution.value.set(1/(w*ratio),1/(h*ratio));renderer.domElement.dataset.renderQuality=enabled?'ambient-occlusion':'mobile';},
  render(dt){if(enabled){
   ao.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(camera.projectionMatrix);
   ao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(camera.projectionMatrixInverse);
   ao.ssaoMaterial.uniforms.cameraNear.value=camera.near;ao.ssaoMaterial.uniforms.cameraFar.value=camera.far;
   composer.render(dt);
  }else renderer.render(scene,camera);},
  dispose(){composer.passes.forEach(p=>p.dispose?.());composer.dispose();}
 };
}
