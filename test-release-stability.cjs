const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const build=()=>cp.execFileSync('python3',['scripts/manage.py','build'],{stdio:'pipe'});
build();const m=JSON.parse(fs.readFileSync('dist/version.json')),paths=['dist/version.json','dist/sw.js','dist/server/index.js','dist/'+m.sourceArchive],before=paths.map(hash);
build();assert.deepEqual(paths.map(hash),before,'Rebuilding unchanged release must not churn the service worker or corresponding-source archive');
console.log('Release stability: unchanged rebuild preserves metadata, service worker, matching source archive and generated Worker bytes.');
