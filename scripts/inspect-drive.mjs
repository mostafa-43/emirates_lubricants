import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRIVE = path.join(ROOT, 'drive');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function isImage(name){
  return IMAGE_EXT.has(path.extname(name).toLowerCase());
}

function hasImageRecursive(dir){
  if(!fs.existsSync(dir)) return false;
  for(const entry of fs.readdirSync(dir, {withFileTypes:true})){
    const full = path.join(dir, entry.name);
    if(entry.isFile() && isImage(entry.name)) return true;
    if(entry.isDirectory() && hasImageRecursive(full)) return true;
  }
  return false;
}

if(!fs.existsSync(DRIVE)){
  console.error('drive/ folder not found');
  process.exit(1);
}

const categories = fs.readdirSync(DRIVE, {withFileTypes:true}).filter(d => d.isDirectory());
for(const cat of categories){
  const catPath = path.join(DRIVE, cat.name);
  const products = fs.readdirSync(catPath, {withFileTypes:true}).filter(d => d.isDirectory());
  let withImages = 0;
  for(const p of products){
    const pPath = path.join(catPath, p.name);
    if(hasImageRecursive(pPath)) withImages++;
  }
  console.log(`${cat.name}: ${withImages}/${products.length} product folders have images`);
}
