const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const before=JSON.parse(fs.readFileSync('dist/version.json')),fake='.env.release-safety-test';
assert(!fs.existsSync(fake));try{fs.writeFileSync(fake,'FAKE_TEST_ONLY=never_include_local_secrets\n');cp.execFileSync('python3',['scripts/release-metadata.py'],{stdio:'pipe'});assert.equal(JSON.parse(fs.readFileSync('dist/version.json')).sourceFingerprint,before.sourceFingerprint,'Local environment files must not change or enter release source');}finally{fs.unlinkSync(fake);}
cp.execFileSync('python3',['-c',`import json,zipfile,pathlib
r=pathlib.Path('.')
m=json.loads((r/'dist/version.json').read_text())
with zipfile.ZipFile(r/'dist'/m['sourceArchive']) as z:
 names=z.namelist()
 assert not any('.env' in n or '.dev.vars' in n or n.startswith(('node_modules/','.wrangler/')) for n in names)
 assert all(n in names for n in ['LICENSE','package.json','scripts/manage.py','worker/index.mjs','dist/lifecycle.js','dist/index.html'])
 assert json.loads(z.read('dist/version.json'))==m
`],{stdio:'pipe'});
console.log('Release safety: local environment files excluded, necessary source/build materials included and archive version identity matched.');
