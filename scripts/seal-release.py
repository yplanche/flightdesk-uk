#!/usr/bin/env python3
"""Bind a verified release version to source identity; no Git mutation/deploy."""
from pathlib import Path
import json,subprocess,sys,zipfile
root=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(root/'scripts/release-metadata.py'), '--strict-release'],check=True)
meta=json.loads((root/'dist/version.json').read_text());archive=root/'dist'/meta['sourceArchive']
if not archive.exists():sys.exit('Build before sealing: source archive is missing.')
with zipfile.ZipFile(archive) as z:
    archived=json.loads(z.read('dist/version.json'))
    if archived!=meta:sys.exit('Source archive does not match current build metadata. Rebuild before sealing.')
lock=root/'RELEASE-IDENTITIES.json';identities=json.loads(lock.read_text()) if lock.exists() else {}
if identities.get(meta['appVersion'],meta['sourceFingerprint'])!=meta['sourceFingerprint']:sys.exit('Version identity conflict')
identities[meta['appVersion']]=meta['sourceFingerprint'];lock.write_text(json.dumps(identities,indent=2)+'\n');print('Sealed '+meta['buildId'])
