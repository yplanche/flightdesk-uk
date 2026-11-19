#!/usr/bin/env python3
"""Generate stable app identity, legal downloads and exact source offer."""
from pathlib import Path
import datetime, hashlib, json, re, subprocess, sys, zipfile
root = Path(__file__).resolve().parents[1]
generated = {'dist/version.js','dist/version.json','dist/sw.js','FILES.sha256','BUILD-VERIFICATION.txt','RELEASE-IDENTITIES.json'}
def source_files():
    for p in sorted(root.rglob('*')):
        rel = p.relative_to(root).as_posix()
        if not p.is_file() or p.is_symlink() or any(x in p.parts for x in ('.git','.openai','.wrangler','node_modules','__pycache__')): continue
        # Source archives must never sweep up local credentials, browser backups or runtime data.
        parts=Path(rel).parts
        if any(x.startswith('.') for x in parts) and rel not in ('.gitignore','.dockerignore'): continue
        top=parts[0]
        if len(parts)==1:
            allowed=rel.endswith('.md') or rel.startswith('test-') and rel.endswith('.cjs') or rel in ('package.json','wrangler.toml','Dockerfile','LICENSE','RELEASE.json','SOURCE-INFO.json','IMPLEMENTATION-SPECIFICATION.txt','start-linux.sh','start-macos.command','start-windows.bat','.gitignore','.dockerignore')
        elif top=='dist':
            allowed=p.suffix in ('.js','.css','.html','.webmanifest','.png')
        elif top=='scripts': allowed=p.suffix in ('.py','.mjs')
        elif top=='worker': allowed=rel in ('worker/index.mjs','worker/fflate.mjs','worker/FFLATE-LICENSE.txt')
        elif top=='third-party': allowed=p.suffix=='.txt'
        else: allowed=False
        if not allowed: continue
        if rel in generated or rel.startswith(('dist/server/','dist/releases/','dist/legal/')) or rel.endswith('.pyc'): continue
        yield p, rel
def metadata():
    package = json.loads((root/'package.json').read_text()); version = package['version']
    if not re.fullmatch(r'(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?',version): raise SystemExit('Invalid semantic version')
    h = hashlib.sha256()
    for p, rel in source_files(): h.update(rel.encode()+b'\0'+p.read_bytes()+b'\0')
    digest=h.hexdigest(); commit=None
    if (root/'.git').exists():
        try: commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,stderr=subprocess.DEVNULL,text=True).strip()
        except subprocess.CalledProcessError: pass
    release=json.loads((root/'RELEASE.json').read_text())
    locks=root/'RELEASE-IDENTITIES.json'
    if locks.exists():
        prior=json.loads(locks.read_text()).get(version)
        if prior and prior!=digest: raise SystemExit('Released version reused with changed source: increment package.json version before building.')
    return {'appVersion':version,'sourceRevision':commit,'sourceFingerprint':digest,'buildId':version+'-'+digest[:16], 'buildDate':release['releasedAt'], 'sourceArchive':'releases/flightdesk-uk-'+version+'-'+digest[:16]+'.zip','licence':'AGPL-3.0-only'}
if len(sys.argv)>1 and sys.argv[1]=='archive':
    meta=json.loads((root/'dist/version.json').read_text()); dest=root/'dist'/meta['sourceArchive'];dest.parent.mkdir(exist_ok=True)
    # Source plus generated identity/SW: omit bundled Worker and archives to avoid recursion.
    files=list(source_files())+[(root/'dist'/n,'dist/'+n) for n in ('version.js','version.json','sw.js')]
    with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
        for p,rel in sorted(files,key=lambda x:x[1]):
            info=zipfile.ZipInfo(rel,(2026,11,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,p.read_bytes())
    print('Corresponding source:',dest.name)
else:
    meta=metadata(); (root/'dist/version.json').write_text(json.dumps(meta,indent=2)+'\n')
    (root/'dist/version.js').write_text('/* SPDX-License-Identifier: AGPL-3.0-only */\nwindow.FLIGHTDESK_BUILD=Object.freeze('+json.dumps(meta,separators=(',',':'))+');\n')
    legal=root/'dist/legal';legal.mkdir(exist_ok=True)
    for name in ('LICENSE','COPYRIGHT.md','NAME-AND-LOGO-POLICY.md','THIRD-PARTY-NOTICES.md','CHANGELOG.md'):(legal/name).write_bytes((root/name).read_bytes())
    print('App version:',meta['buildId'])
