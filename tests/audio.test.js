import test from 'node:test';
import assert from 'node:assert/strict';
import {seamlessLoop} from '../world/src/audio.js';
function buffer(channels,length,sampleRate){const data=Array.from({length:channels},()=>new Float32Array(length));return {numberOfChannels:channels,length,sampleRate,getChannelData:i=>data[i]};}
test('sea loop crossfades the source end to its beginning rather than jumping across the loop boundary',()=>{
 const input=buffer(2,400,100);for(let c=0;c<2;c++)for(let i=0;i<400;i++)input.getChannelData(c)[i]=Math.sin(i*.01+c);
 const output=seamlessLoop({createBuffer:buffer},input);assert.equal(output.numberOfChannels,2);assert.equal(output.length,355);
 for(let c=0;c<2;c++){const samples=output.getChannelData(c);assert.ok(Math.abs(samples[0]-samples.at(-1))<.011);assert.ok(samples.every(Number.isFinite));}
});
