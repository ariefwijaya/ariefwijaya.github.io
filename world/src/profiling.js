// Local-only, opt-in measurements. Resource byte counts describe retained CPU
// arrays, not total browser/GPU process memory. No telemetry leaves the page.
export function resourceStats(geometries,textures){
 const buffers=new Set();
 for(const g of geometries){for(const a of [...Object.values(g.attributes),g.index].filter(Boolean))buffers.add((a.isInterleavedBufferAttribute?a.data.array:a.array).buffer);}
 return {geometries:geometries.size,geometryBytes:[...buffers].reduce((n,b)=>n+b.byteLength,0),textures:textures.size,textureBytes:[...textures].reduce((n,t)=>n+(t.image?.data?.byteLength||0),0)};
}
export function createProfiler(renderer){
 if(!['127.0.0.1','localhost'].includes(location.hostname)||new URLSearchParams(location.search).get('profile')!=='1')return null;
 const output=document.createElement('pre');output.id='world-profile';output.setAttribute('aria-label','Local rendering measurements');
 output.style.cssText='position:fixed;z-index:8;right:16px;bottom:92px;background:#f7f1e9ed;color:#222;padding:10px;font:11px/1.35 monospace;pointer-events:none;max-width:90vw;white-space:pre-wrap';document.body.append(output);
 renderer.info.autoReset=false;let previous=0,last=0,contextId='',samples=[],costs=[],resources;
 const percentile=(values,p)=>[...values].sort((a,b)=>a-b)[Math.floor((values.length-1)*p)]||0;
 return {
  begin(){renderer.info.reset();return performance.now();},
  end(start,time,world,kind){
   const context=`${kind}:${innerWidth}x${innerHeight}:${renderer.domElement.dataset.renderQuality}`;
   if(contextId!==context){contextId=context;samples=[];costs=[];previous=0;last=time;resources=world.resourceStats();}
   if(previous&&time-previous<500)samples.push(time-previous);previous=time;costs.push(performance.now()-start);
   if(time-last<2000)return;last=time;
   output.textContent=JSON.stringify({world:kind,viewport:[innerWidth,innerHeight],quality:renderer.domElement.dataset.renderQuality,frames:samples.length,frameMedianMs:+percentile(samples,.5).toFixed(2),frameP95Ms:+percentile(samples,.95).toFixed(2),cpuMedianMs:+percentile(costs,.5).toFixed(2),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,gpuGeometries:renderer.info.memory.geometries,gpuTextures:renderer.info.memory.textures,programs:renderer.info.programs.length,owned:resources},null,1);
   samples=[];costs=[];
  }
 };
}
