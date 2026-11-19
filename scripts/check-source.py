#!/usr/bin/env python3
"""Fail clearly on incomplete or mixed-version uploads before generating a Worker."""
from pathlib import Path
import json, shutil, subprocess, sys

root = Path(__file__).resolve().parents[1]
def fail(detail):
    sys.exit('Incomplete or mixed Flightdesk source upload: '+detail+
             '\nReplace the complete dist/, scripts/ and worker/ folders and matching root files '
             'from one release package. Keep browser-record backups outside the repository. '
             'Do not remove tests to bypass this check.')

try:
    manifest = json.loads((root/'SOURCE-MANIFEST.json').read_text())
except (OSError, ValueError):
    fail('SOURCE-MANIFEST.json is missing or invalid.')
version = json.loads((root/'package.json').read_text()).get('version')
if manifest.get('appVersion') != version:
    fail('package.json and SOURCE-MANIFEST.json have different app versions.')
missing = [name for name in manifest['requiredFiles'] if not (root/name).is_file()]
if missing:
    fail('missing files: '+', '.join(missing))
node = shutil.which('node')
if not node:
    sys.exit('Install Node.js 22 or newer to validate and run this app.')
probe = """const A=require('./dist/airspace-core.js');
const names=JSON.parse(process.argv[1]);
const missing=names.filter(name=>typeof A[name]!=='function');
if(missing.length){console.error('dist/airspace-core.js lacks required exports: '+missing.join(', '));process.exit(1);}
"""
result = subprocess.run([node,'-e',probe,json.dumps(manifest['airspaceExports'])],
                        cwd=root, capture_output=True, text=True)
if result.returncode:
    fail(result.stderr.strip() or 'airspace module could not be loaded.')
print('Source consistency checked: required files present and airspace API compatible.')
