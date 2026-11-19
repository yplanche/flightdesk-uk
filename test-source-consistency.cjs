const assert=require('node:assert/strict'),cp=require('node:child_process');
const result=cp.spawnSync('python3',['-c',String.raw`
from pathlib import Path
import shutil, subprocess, sys, tempfile
root=Path.cwd()
with tempfile.TemporaryDirectory(prefix='flightdesk-source-check-') as folder:
 fixture=Path(folder)/'app'
 shutil.copytree(root,fixture,ignore=shutil.ignore_patterns('.git','.wrangler','node_modules','__pycache__','releases','server'))
 def check():
  return subprocess.run([sys.executable,'scripts/check-source.py'],cwd=fixture,capture_output=True,text=True)
 assert check().returncode==0
 # Reproduce exactly the missing exported function seen in the Cloudflare log.
 module=fixture/'dist/airspace-core.js'
 original=module.read_bytes()
 module.write_bytes(original+b'\nmodule.exports.londonDateTime=undefined;\n')
 failed=check()
 assert failed.returncode!=0
 assert 'dist/airspace-core.js lacks required exports: londonDateTime' in failed.stderr
 assert 'Incomplete or mixed Flightdesk source upload:' in failed.stderr
 module.write_bytes(original)
 (fixture/'dist/lifecycle.js').unlink()
 failed=check()
 assert failed.returncode!=0
 assert 'missing files: dist/lifecycle.js' in failed.stderr
 print('Source consistency: complete upload passes; missing airspace export and missing runtime module fail with actionable upload instructions.')
`],{encoding:'utf8'});
assert.equal(result.status,0,result.stdout+result.stderr);process.stdout.write(result.stdout);
