const assert=require('node:assert/strict'),cp=require('node:child_process');
const result=cp.spawnSync('python3',['-c',String.raw`
from pathlib import Path
import json, shutil, subprocess, sys, tempfile
root=Path.cwd()
with tempfile.TemporaryDirectory(prefix='flightdesk-cloudflare-') as folder:
 fixture=Path(folder)/'app'
 shutil.copytree(root,fixture,ignore=shutil.ignore_patterns('.git','.wrangler','node_modules','__pycache__','releases','server'))
 meta=json.loads((root/'dist/version.json').read_text())
 (fixture/'RELEASE-IDENTITIES.json').write_text(json.dumps({meta['appVersion']:meta['sourceFingerprint']}))
 # Reproduce a web upload that omits optional dotfiles and normalises text differently.
 for name in ('.gitignore','.dockerignore'):
  (fixture/name).unlink(missing_ok=True)
 readme=fixture/'README.md'
 readme.write_bytes(readme.read_bytes().replace(b'\r\n',b'\n').replace(b'\n',b'\r\n'))
 built=subprocess.run([sys.executable,'scripts/manage.py','build'],cwd=fixture,capture_output=True,text=True)
 assert built.returncode==0,(built.stdout,built.stderr)
 assert 'Version notice:' in built.stderr
 actual=json.loads((fixture/'dist/version.json').read_text())
 assert actual['appVersion']==meta['appVersion']
 assert actual['sourceFingerprint']!=meta['sourceFingerprint']
 assert actual['sourceArchive']!=meta['sourceArchive']
 assert (fixture/'dist'/actual['sourceArchive']).is_file()
 # A deliberate release seal still prevents silently rebinding an already sealed version.
 sealed=subprocess.run([sys.executable,'scripts/seal-release.py'],cwd=fixture,capture_output=True,text=True)
 assert sealed.returncode!=0
 assert 'Version identity conflict:' in sealed.stderr
 assert json.loads((fixture/'RELEASE-IDENTITIES.json').read_text())[meta['appVersion']]==meta['sourceFingerprint']
 print('Cloudflare regression: missing optional files / changed text bytes build successfully with exact source identity; explicit sealing stays strict.')
`],{encoding:'utf8'});
assert.equal(result.status,0,result.stdout+result.stderr);process.stdout.write(result.stdout);
