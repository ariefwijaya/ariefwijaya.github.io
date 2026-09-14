import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
for(const [path,assets] of [
 ['world/index.html',['world/world.bundle.js','world/world.css']],
 ['index.html',['assets/site.js','assets/styles.css']],
]){
 const page=new URL(path,root);let html=await readFile(page,'utf8');
 for(const asset of assets){
  const hash=createHash('sha256').update(await readFile(new URL(asset,root))).digest('hex').slice(0,12);
  const pattern=new RegExp(`"/${asset.replaceAll('.','\\.')}(?:\\?[^"\\s]*)?"`,'g');
  html=html.replace(pattern,`"/${asset}?v=${hash}"`);
 }
 await writeFile(page,html);
}
